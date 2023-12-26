import { BaseComponent } from '@components/baseComponent.js';
import { Card } from '@molecules';
import { PieChart, BarChart } from '@atoms';
import { userStore } from '@stores/userStore';

import { USER_STORE } from '@constants/constants';
import { transactionsStore } from '@stores/transactionsStore';
import template from './dashboard.hbs';

const MONTHS = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
];

/**
 * Dashboard class extends BaseComponent.
 * @extends {BaseComponent}
 */
export class DashboardView extends BaseComponent {

    #cardBalance;

    #cardBudget;

    #cardPieTransactions;

    #pieCostsByCategory;

    #pieConsumedBudget;

    #barCostsByMonth;

    constructor(parent) {
        super(USER_STORE.FEED_STATE, template, parent);

        this.#cardBalance = new Card(USER_STORE.FEED_STATE.cardBalance);
        this.#cardBudget = new Card(USER_STORE.FEED_STATE.cardPlannedBudget);
        this.#cardPieTransactions = new Card({ cardSize: 'card_small', cardHeadline: 'Траты по категориям', id: 'pie-cost-by-category-wrapper' });

        this.#pieCostsByCategory = new PieChart({ textAbove: null });
        this.#pieConsumedBudget = new PieChart();
        this.#barCostsByMonth = new BarChart();

        this.#pieConsumedBudget.setState({
            data: [],
            textAbove: 'Использовано',
            textAboveFormatter: () => 'Использовано',
            hasTooltip: false
        });
        this.#pieCostsByCategory.setState({
            data: [],
            textAbove: 'Сумма',
            textCenter: 'за месяц',
            textAboveFormatter: () => 'Сумма',
            textCenterFormatter: () => 'за месяц',
            isPercents: false,
            tooltipFormatter: (value, title) => `${title}: ${value} руб.`,
        });

        this.#barCostsByMonth.setState({
            data: [],
            chartWidth: 800,
            chartHeight: 200,
            chartTopMargin: 50,
            chartBottomMargin: 50,
            chartRightMargin: 50,
            chartLeftMargin: 50,
            levelCount: 3,
            fontSize: 2,
            textAbove: `График расходов за ${MONTHS[new Date().getMonth()]}`,
        });
    }

    /**
     * Renders the Dashboard template and returns the rendered HTML.
     * This method is similar to `renderTemplateToParent` but returns the rendered HTML instead of rendering it to the parent element.
     */
    render = async () => {
        await userStore.feed();

        await this.setupChartsBeforeRender();

        if (userStore.storage.feed) {
            const { accounts } = userStore.storage.feed;
            const { balance } = userStore.storage.feed;
            const { plannedBudget } = userStore.storage.feed;
            const { actualBudget } = userStore.storage.feed;

            // eslint-disable-next-line
            accounts
                ? this.#cardBalance.setState({ cardSubhead: `${parseFloat(balance)} руб.` })
                : this.#cardBalance.setState({ cardSubhead: 'У вас нет счетов, добавьте их, чтобы видеть свой баланс' });
            // eslint-disable-next-line
            plannedBudget
                ? this.#cardBudget.setState({ cardSubhead: `${parseFloat(actualBudget)} / ${parseFloat(plannedBudget)} руб.`, content: this.#pieConsumedBudget.render() })
                : this.#cardBudget.setState({ cardSubhead: 'Ваш бюджет не запланирован, вы можете сделать это в профиле' });
        }

        this.#cardPieTransactions.setState({ content: this.#pieCostsByCategory.render() });

        const templates = [
            template({
                balance: this.#cardBalance.render(),
                budget: this.#cardBudget.render(),
                pieTransactions: this.#cardPieTransactions.render(),
                barCostsByMonth: this.#barCostsByMonth.render()
            }),
        ];

        return super.render(templates);
    };

    setupChartsBeforeRender = async () => {
        // pie chart with consumed budget
        if (userStore.storage.feed) {
            const { plannedBudget, actualBudget } = userStore.storage.feed;
            if (actualBudget && plannedBudget) {
                const relation = (plannedBudget - actualBudget) / plannedBudget;

                this.#pieConsumedBudget.setState({
                    data: [{
                        title: 'Потраченный бюджет',
                        value: relation * 100,
                        color: relation > 1 ? 'red' : 'green',
                    }],
                    totalPercent: Math.max(relation * 100, 100),
                });
            }
        }

        // pie chart with costs by categories
        await transactionsStore.getTransaction();
        if (transactionsStore.storage.states) {
            const costsByCategory = {};
            // eslint-disable-next-line
            for (const trans of transactionsStore.storage.states) {
                if (!costsByCategory[trans.transactionName]) {
                    costsByCategory[trans.transactionName] = 0;
                }
                costsByCategory[trans.transactionName] += parseFloat(trans.value.replace(/\s/g, ''));
            }

            const pieData = [];
            // eslint-disable-next-line array-callback-return
            Object.entries(costsByCategory).map(([category, value]) => {
                if (value < 0) {
                    pieData.push({
                        title: category,
                        value: Math.abs(parseFloat(value)),
                        color: this.getRandomColor(),
                    });
                }
            });

            this.#pieCostsByCategory.setState({
                data: pieData,
            });
        }

        // bar chart with costs in a month
        if (transactionsStore.storage.states) {
            const firstDayOfCurrentMonth = new Date();
            firstDayOfCurrentMonth.setHours(0, 0, 0, 0);
            firstDayOfCurrentMonth.setDate(1);
            const costsByDay = {};
            let maxDayOfMonth = 0;

            // eslint-disable-next-line
            for (const trans of transactionsStore.storage.states) {
                const transDate = new Date(trans.rawDate);
                if (transDate.getTime() < firstDayOfCurrentMonth.getTime()) {
                    // eslint-disable-next-line
                    continue;
                }
                const dayOfMonth = transDate.getDate();
                if (!costsByDay[dayOfMonth]) {
                    costsByDay[dayOfMonth] = 0;
                }
                maxDayOfMonth = Math.max(maxDayOfMonth, dayOfMonth);
                costsByDay[dayOfMonth] += parseFloat(trans.value.replace(/\s/g, ''));
            }

            // eslint-disable-next-line no-plusplus
            for (let day = 1; day <= maxDayOfMonth; day++) {
                if (!costsByDay[day]) {
                    costsByDay[day] = 0;
                }
            }

            const barData = Object.entries(costsByDay).map(([day, spendedMoney]) => ({
                key: day,
                values: [Math.abs(parseFloat(spendedMoney))],
                titles: [parseFloat(spendedMoney) < 0 ? 'Потрачено' : 'Заработано'],
                colors: [parseFloat(spendedMoney) < 0 ? '#0b62a4' : 'green']
            }));

            this.#barCostsByMonth.setState({
                data: barData,
                skipKeys: barData.length > 20 ? 2 : 0,
            });
        }
    };

    /**
     * Updates the state of the Dashboard component.
     * @param {Object} newState - The new state to be set.
     */
    setState(newState) {
        super.setState(newState);

        if (newState) {
            this.#cardBalance.setState(newState.cardBalance);
            this.#cardBudget.setState(newState.cardPlannedBudget);
        }
    }

    setHandlers() {
        const pieConsumedBudgetWrapper = document.getElementById('pie-conusmed-budget-wrapper');
        if (pieConsumedBudgetWrapper) {
            this.#pieConsumedBudget.parent = pieConsumedBudgetWrapper;
            this.#pieConsumedBudget.setHandlers();
        }
        const pieCostsByCategoryWrapper = document.getElementById('pie-cost-by-category-wrapper');
        if (pieCostsByCategoryWrapper) {
            this.#pieCostsByCategory.parent = pieCostsByCategoryWrapper;
            this.#pieCostsByCategory.setHandlers();
        }
        const barCostsByMonthWrapper = document.getElementById('bar-cost-by-month');
        if (barCostsByMonthWrapper) {
            this.#barCostsByMonth.parent = barCostsByMonthWrapper;
            this.#barCostsByMonth.setHandlers();
        }
    }

    getRandomColor() {
        const letters = '789ABCDEF';
        let color = '#';
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    cleanUp() {
        this.#pieConsumedBudget.cleanUp();
        this.#pieCostsByCategory.cleanUp();
        this.#barCostsByMonth.cleanUp();
    }
}
