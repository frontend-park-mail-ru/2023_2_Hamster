import { BaseComponent } from '@components/baseComponent.js';
import { Card } from '@molecules/card/card.js';
import { List } from '@atoms/list/list.js';

import template from './dashboard.hbs';

/**
 * Default state for the Dashboard component.
 * @type {Object}
 */
const DEFAULT_DASHBOARD_STATE = {
    cardBalance: {
        cardSize: 'card_small',
        cardHeadline: 'У вас еще нет счетов',
        cardSubhead: '',
        cardList: {
            listItems: [
                {
                    listItemTitle: 'title',
                    listItemValue: 'value',
                    valueUnits: '₽',
                },
            ],
        },
    },
    cardPlannedBudget: {
        cardSize: 'card_small',
        cardHeadline: 'У вас не запланирован бюджет',
        cardSubhead: '',
    },
    cardActualBudget: {
        cardSize: 'card_small',
        cardHeadline: 'Не можем расчитать фактический бюджет',
        cardSubhead: '',
    },
};

/**
 * Dashboard class extends BaseComponent.
 * @extends {BaseComponent}
 */
export class Dashboard extends BaseComponent {

    #cardBalance;

    #cardPlannedBudget;

    #cardActualBudget;

    #cardBalanceList;

    /**
     * Creates a new Dashboard instance.
     * @param {HTMLElement} parent - The parent element.
     * @param {Object} [state=DEFAULT_DASHBOARD_STATE] - The initial state.
     */
    constructor(parent, state = DEFAULT_DASHBOARD_STATE) {
        super(state, parent);

        this.#cardBalance = new Card(this.getState().cardBalance);
        this.#cardBalanceList = new List(this.getState().cardBalance.cardList);

        this.#cardPlannedBudget = new Card(this.getState().cardPlannedBudget);
        this.#cardActualBudget = new Card(this.getState().cardActualBudget);
    }

    /**
     * Renders the Dashboard template to the parent element.
     * This method is responsible for rendering the card balance list, cards for planned and actual budget,
     * and then mapping these rendered HTML strings to their corresponding state keys.
     */
    renderTemplateToParent = () => {
        const cardBalanceListHTML = this.#cardBalanceList.render();
        this.#cardBalance.setState({ list: cardBalanceListHTML });

        const cardBalanceHTML = this.#cardBalance.render();

        const cardPlannedBudgetHTML = this.#cardPlannedBudget.render();
        const cardActualBudgetHTML = this.#cardActualBudget.render();

        const templates = [
            template({
                balance: cardBalanceHTML,
                plannedBudget: cardPlannedBudgetHTML,
                actualBudget: cardActualBudgetHTML,
            }),
        ];

        super.renderTemplateToParent(templates);
    };

    /**
     * Renders the Dashboard template and returns the rendered HTML.
     * This method is similar to `renderTemplateToParent` but returns the rendered HTML instead of rendering it to the parent element.
     */
    render = () => {
        const cardBalanceListHTML = this.#cardBalanceList.render();
        this.#cardBalance.setState({ list: cardBalanceListHTML });

        const cardBalanceHTML = this.#cardBalance.render();

        const cardPlannedBudgetHTML = this.#cardPlannedBudget.render();
        const cardActualBudgetHTML = this.#cardActualBudget.render();

        const templates = [
            template({
                balance: cardBalanceHTML,
                plannedBudget: cardPlannedBudgetHTML,
                actualBudget: cardActualBudgetHTML,
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
            this.#cardBalanceList.setState(newState.cardBalance.cardList);

            this.#cardPlannedBudget.setState(newState.cardPlannedBudget);
            this.#cardActualBudget.setState(newState.cardActualBudget);
        }
    }

    /**
     * Retrieves the current state of the Dashboard component.
     * @returns {Object} The current state of the Dashboard component.
     */
    getState() {
        return super.getState();
    }
}
