import { BaseComponent } from '@components/baseComponent.js';
import { Card } from '@molecules';
import { PieChart, BarChart } from '@atoms';
import { userStore } from '@stores/userStore';
import { userActions } from '@actions/userActions';

import { USER_STORE } from '@constants/constants';
import template from './dashboard.hbs';
import { transactionsStore } from '@stores/transactionsStore';

/**
 * Dashboard class extends BaseComponent.
 * @extends {BaseComponent}
 */
export class DashboardView extends BaseComponent {

    #cardBalance;

    #cardPlannedBudget;

    #cardActualBudget;

    #pieCostsByCategory
    #pieConsumedBudget
    #barCostsByMonth

    constructor(parent) {
        super(USER_STORE.FEED_STATE, template, parent);

        this.#cardBalance = new Card(USER_STORE.FEED_STATE.cardBalance);
        this.#cardPlannedBudget = new Card(USER_STORE.FEED_STATE.cardPlannedBudget);
        this.#cardActualBudget = new Card(USER_STORE.FEED_STATE.cardActualBudget);

        this.#pieCostsByCategory = new PieChart();
        this.#pieConsumedBudget  = new PieChart();
        this.#barCostsByMonth   = new BarChart();

        this.#pieConsumedBudget.setState({
            textAbove: 'Бюджет:',
        });
        this.#pieCostsByCategory.setState({
            textAbove: '',
            textCenter: '',
            isPercents: false,
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

        if (userStore.storage.user.feed) {
            const balance = userStore.storage.user.feed.balance;
            const plannedBudget = userStore.storage.user.feed.plannedBudget;
            const actualBudget = userStore.storage.user.feed.actualBudget;

            this.#cardBalance.setState({ cardSubhead: parseFloat(balance) });
            this.#cardPlannedBudget.setState({ cardSubhead: parseFloat(plannedBudget) });
            this.#cardActualBudget.setState({ cardSubhead: parseFloat(actualBudget) });

            this.#pieConsumedBudget.setState({
                data: [{
                    title: 'Потраченный бюджет',
                    value: actualBudget / plannedBudget * 100,
                    color: 'green',
                }],
            });
           
        } else {
            this.#pieConsumedBudget.setState({
                data: [{
                    title: 'Потраченный бюджет',
                    value: 67,
                    color: 'green',
                }],
            });
        }


        if (!transactionsStore.transactions) {
            await transactionsStore.getTransaction();
        }

        if (transactionsStore.transactions) {
            const costsByCategory = {};
            for (let trans of transactionsStore.transactions) {
                for (let cat of trans.categories) {
                    if (!costsByCategory[cat.category_name]) {
                        costsByCategory[cat.category_name] = 0;
                    }
                    costsByCategory[cat.category_name] += trans.income;
                    costsByCategory[cat.category_name] -= trans.outcome;
                }
            }

            const pieData = Object.entries(costsByCategory).map(([k, v]) => ({
                title: k,
                value: v,
                color: this.getRandomColor(),
            }));
            console.log(costsByCategory, pieData);

            this.#pieCostsByCategory.setState({
                data: pieData,
            });
        }
        
        
        const cardBalanceHTML = this.#cardBalance.render();
        const cardPlannedBudgetHTML = this.#cardPlannedBudget.render();
        const cardActualBudgetHTML = this.#cardActualBudget.render();
        
        const pieConsumedBudgetHTML = this.#pieConsumedBudget.render();
        const pieCostsByCategoryHTML = this.#pieCostsByCategory.render();

        const templates = [
            template({
                balance: cardBalanceHTML,
                plannedBudget: cardPlannedBudgetHTML,
                actualBudget: cardActualBudgetHTML,
                pieConsumedBudget: pieConsumedBudgetHTML,
                pieCostsByCategory: pieCostsByCategoryHTML,
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
        const thisElement = document.querySelector('.grid');
        if (thisElement) {
            this.#pieCostsByCategory.parent = thisElement;
            this.#pieConsumedBudget.parent = thisElement;
            // this.#barCostsByMonth.parent = thisElement;
            this.#pieCostsByCategory.setHandlers();
            this.#pieConsumedBudget.setHandlers();
            // this.#barCostsByMonth.setHandlers();
        }
    }

    getRandomColor() {
        // let letters = '0123456789ABCDEF';
        let letters = '89ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }
      

    cleanUp() {
        // TODO
    }
}
