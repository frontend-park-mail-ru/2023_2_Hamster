import { BaseComponent } from '@components/baseComponent.js';
import { Card } from '@molecules';
import { PieChart, BarChart } from '@atoms';
import { userStore } from '@stores/userStore';
import { userActions } from '@actions/userActions';

import { USER_STORE } from '@constants/constants';
import { transactionsStore } from '@stores/transactionsStore';
import template from './dashboard.hbs';

/**
 * Dashboard class extends BaseComponent.
 * @extends {BaseComponent}
 */
export class DashboardView extends BaseComponent {

    #cardBalance;

    #cardPlannedBudget;

    #cardActualBudget;

    #pieCostsByCategory;

    #pieConsumedBudget;

    #barCostsByMonth;

    constructor(parent) {
        super(USER_STORE.FEED_STATE, template, parent);

        this.#cardBalance = new Card(USER_STORE.FEED_STATE.cardBalance);
        this.#cardPlannedBudget = new Card(USER_STORE.FEED_STATE.cardPlannedBudget);
        this.#cardActualBudget = new Card(USER_STORE.FEED_STATE.cardActualBudget);

        this.#pieCostsByCategory = new PieChart();
        this.#pieConsumedBudget = new PieChart();
        this.#barCostsByMonth = new BarChart();

        this.#pieConsumedBudget.setState({
            data: [],
            textAbove: 'Бюджет:',
            textAboveFormatter: () => 'Бюджет: ',
            hasTooltip: false,
        });
        this.#pieCostsByCategory.setState({
            data: [],
            textAbove: 'Траты по',
            textCenter: 'категориям',
            textAboveFormatter: () => 'Траты по',
            textCenterFormatter: () => 'категориям',
            isPercents: false,
            tooltipFormatter: (value, title) => `${title}: ${value} руб.`,
        });
        this.#barCostsByMonth.setState({
            chartWidth: 400,
            chartHeight: 400,
            fontSize: 4,
        });
    }

    /**
     * Renders the Dashboard template to the parent element.
     * This method is responsible for rendering the card balance list, cards for planned and actual budget,
     * and then mapping these rendered HTML strings to their corresponding state keys.
     */
    renderTemplateToParent = () => {
        userActions.getFeed();

        const { balance } = userStore.storage.user;
        const { plannedBudget } = userStore.storage.user;
        const { actualBudget } = userStore.storage.user;

        if (balance) {
            this.#cardBalance.setState({ cardSubhead: balance });
        }

        if (plannedBudget) {
            this.#cardPlannedBudget.setState({ cardSubhead: plannedBudget });
        }

        if (actualBudget) {
            this.#cardActualBudget.setState({ cardSubhead: actualBudget });
        }

        const cardBalanceHTML = this.#cardBalance.render();
        const cardPlannedBudgetHTML = this.#cardPlannedBudget.render();
        const cardActualBudgetHTML = this.#cardActualBudget.render();

        const templates = [
            template({
                balance: cardBalanceHTML,
                plannedBudget: cardPlannedBudgetHTML,
                actualBudget: cardActualBudgetHTML,
                pieConsumedBudget: pieConsumedBudgetHTML,
            }),
        ];

        super.renderTemplateToParent(templates);
    };

    /**
     * Renders the Dashboard template and returns the rendered HTML.
     * This method is similar to `renderTemplateToParent` but returns the rendered HTML instead of rendering it to the parent element.
     */
    render = async () => {
        await userStore.feed();

        console.log('userStore.storage.feed', userStore.storage.feed);
        if (userStore.storage.feed) {
            const { accounts } = userStore.storage.feed;
            const { balance } = userStore.storage.feed;
            const { plannedBudget } = userStore.storage.feed;
            const { actualBudget } = userStore.storage.feed;

            accounts
                ? this.#cardBalance.setState({ cardSubhead: `${parseFloat(balance)} руб.` })
                : this.#cardBalance.setState({ cardSubhead: 'У вас нет счетов, добавьте их, чтобы видеть свой баланс' });

            plannedBudget
                ? this.#cardPlannedBudget.setState({ cardSubhead: `${parseFloat(plannedBudget)} руб.` })
                : this.#cardPlannedBudget.setState({ cardSubhead: 'Ваш бюджет не запланирован, вы можете сделать это в профиле' });

            plannedBudget
                ? this.#cardActualBudget.setState({ cardSubhead: `${parseFloat(actualBudget)} руб.` })
                : this.#cardActualBudget.setState({ cardSubhead: 'Не можем расчитать фактический бюджет, задайте бюджет в профиле' });


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

        
        await transactionsStore.getTransaction();
        console.log('transactionsStore.storage.states', transactionsStore.storage.states);
        if (transactionsStore.storage.states) {
            const costsByCategory = {};
            for (const trans of transactionsStore.storage.states) {
                if (!costsByCategory[trans.transactionName]) {
                    costsByCategory[trans.transactionName] = 0;
                }
                costsByCategory[trans.transactionName] += trans.value;
            }

            const pieData = [];
            Object.entries(costsByCategory).map(([category, value]) => {
                if (value < 0) {
                    pieData.push({
                        title: category,
                        value: Math.abs(value),
                        color: this.getRandomColor(),
                    });
                }
            });

            console.log('costsByCategory', costsByCategory, pieData);

            this.#pieCostsByCategory.setState({
                data: pieData,
            });


            const firstDayOfCurrentMonth = new Date();
            firstDayOfCurrentMonth.setHours(0, 0, 0, 0);
            firstDayOfCurrentMonth.setDate(1);
            const costsByDay = {};
            let maxDayOfMonth = 0;

            for (const trans of transactionsStore.storage.states) {
                const transDate = new Date(trans.rawDate);
                if (transDate.getTime() < firstDayOfCurrentMonth.getTime()) {
                    continue;
                }
                const dayOfMonth = transDate.getDate();
                if (!costsByDay[dayOfMonth]) {
                    costsByDay[dayOfMonth] = 0;
                }
                maxDayOfMonth = Math.max(maxDayOfMonth, dayOfMonth);
                costsByDay[dayOfMonth] += trans.value;
            }

            for (let day = 1; day <= maxDayOfMonth; day++) {
                if (!costsByDay[day]) {
                    costsByDay[day] = 0;
                }
            }

            const barData = Object.entries(costsByDay).map(([day, spendedMoney]) => ({
                key: day,
                values: [Math.abs(spendedMoney)],
                titles: [spendedMoney < 0 ? 'Потрачено' : 'Заработано'],
                colors: [spendedMoney < 0 ? '#0b62a4' : 'green']
            }));

            console.log('barData', barData, costsByDay);

            this.#barCostsByMonth.setState({
                data: barData,
                skipKeys: barData.length > 20 ? 2 : 0,
            });
        }
        
        // this.#pieCostsByCategory.setState({
        //     data: [
        //         {
        //             title: 'Потраченный бюджет',
        //             value: 24,
        //             color: 'green',
        //         },
        //         {
        //             title: 'sdsdadбюджет',
        //             value: 56,
        //             color: 'blue',
        //         },
        //     ],
        // });

        
        // const relation = 1.1;

        // this.#pieConsumedBudget.setState({
        //     data: [{
        //         title: 'Потраченный бюджет',
        //         value: relation * 100,
        //         color: relation > 1 ? 'red' : 'green',
        //     }],
        //     totalPercent: Math.max(relation * 100, 100),
        // });
        

        // this.#barCostsByMonth.setState({
        //     data: [
        //         {
        //             key: 1,
        //             values: [228],
        //             titles: ['Потрачено'],
        //             colors: ['#0b62a4']
        //         },
        //         {
        //             key: 2,
        //             values: [100],
        //             titles: ['Заработано'],
        //             colors: ['green']
        //         },
        //         {
        //             key: 2.4,
        //             values: [823],
        //             titles: ['Потрачено'],
        //             colors: ['#0b62a4']
        //         },
        //         {
        //             key: 3,
        //             values: [1123],
        //             titles: ['Потрачено'],
        //             colors: ['#0b62a4']
        //         },
        //         {
        //             key: 1,
        //             values: [228],
        //             titles: ['Потрачено'],
        //             colors: ['#0b62a4']
        //         },
        //         {
        //             key: 2,
        //             values: [100],
        //             titles: ['Заработано'],
        //             colors: ['green']
        //         },
        //         {
        //             key: 2.4,
        //             values: [823],
        //             titles: ['Потрачено'],
        //             colors: ['#0b62a4']
        //         },
        //         {
        //             key: 3,
        //             values: [1123],
        //             titles: ['Потрачено'],
        //             colors: ['#0b62a4']
        //         },
        //     ]
        // });
        
        const cardBalanceHTML = this.#cardBalance.render();
        const cardPlannedBudgetHTML = this.#cardPlannedBudget.render();
        const cardActualBudgetHTML = this.#cardActualBudget.render();

        const pieConsumedBudgetHTML = this.#pieConsumedBudget.render();
        const pieCostsByCategoryHTML = this.#pieCostsByCategory.render();
        const barCostsByMonthHTML = this.#barCostsByMonth.render();

        const templates = [
            template({
                balance: cardBalanceHTML,
                plannedBudget: cardPlannedBudgetHTML,
                actualBudget: cardActualBudgetHTML,
                pieConsumedBudget: pieConsumedBudgetHTML,
                pieCostsByCategory: pieCostsByCategoryHTML,
                barCostsByMonth: barCostsByMonthHTML
            }),
        ];

        return super.render(templates);
    };

    /**
     * Updates the state of the Dashboard component.
     * @param {Object} newState - The new state to be set.
     */
    setState(newState) {
        super.setState(newState);

        if (newState) {
            this.#cardBalance.setState(newState.cardBalance);
            this.#cardPlannedBudget.setState(newState.cardPlannedBudget);
            this.#cardActualBudget.setState(newState.cardActualBudget);
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
