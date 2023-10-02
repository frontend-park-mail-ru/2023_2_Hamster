'use strict';

import {BaseComponent} from "../../components/baseComponent.js";
import {Card} from "../../components/molecules/card/card.js";
import {List} from "../../components/atoms/list/list.js";

/**
 * Default state for the Dashboard component.
 * @type {Object}
 */
const DEFAULT_DASHBOARD_STATE = {
    cardBalance: {
        cardSize: 'card_small',
        cardHeadline: 'Headline',
        cardSubhead: 'Subhead',
    },
    cardBudget: {
        cardSize: 'card_small',
        cardHeadline: 'Headline',
        cardSubhead: 'Subhead',
    },
};

/**
 * Dashboard class extends BaseComponent.
 * @extends {BaseComponent}
 */
export class Dashboard extends BaseComponent {

    /**
     * @private
     * @type {Card}
     */
    #cardBalance

    /**
     * @private
     * @type {Card}
     */
    #cardBudget

    #cardBalanceList

    /**
     * Creates a new Dashboard instance.
     * @param {HTMLElement} parent - The parent element.
     * @param {Object} [state=DEFAULT_DASHBOARD_STATE] - The initial state.
     */
    constructor(parent, state = DEFAULT_DASHBOARD_STATE) {
        super(state, parent);

        this.#cardBalance = new Card(this.getState().cardBalance);
        this.#cardBalanceList = new List(this.getState().cardBalance.cardList)

        this.#cardBudget = new Card(this.getState().cardBudget);
    }

    /**
     * Renders the Dashboard template to the parent element.
     */
    renderTemplateToParent() {
        const cardBalanceListHTML = this.#cardBalanceList.render();
        this.#cardBalance.setState({list: cardBalanceListHTML});

        const cardBalanceHTML = this.#cardBalance.render();

        const cardBudgetHTML = this.#cardBudget.render();

        const templatesToStateMap = {
            'dashboard.hbs': {
                balance: cardBalanceHTML,
                budget: cardBudgetHTML,
            },
        };

        super.renderTemplateToParent(templatesToStateMap);
    }
}
