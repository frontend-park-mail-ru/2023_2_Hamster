import { BaseComponent } from '@components/baseComponent.js';
import { Card } from '@molecules';
import { userStore } from '@stores/userStore';
import { userActions } from '@actions/userActions';

import template from './dashboard.hbs';
import { USER_STORE } from '@constants/constants';

/**
 * Dashboard class extends BaseComponent.
 * @extends {BaseComponent}
 */
export class DashboardView extends BaseComponent {

    #cardBalance;

    #cardPlannedBudget;

    #cardActualBudget;

    constructor(parent) {
        super(USER_STORE.FEED_STATE, template, parent);

        this.#cardBalance = new Card(USER_STORE.FEED_STATE.cardBalance);
        this.#cardPlannedBudget = new Card(USER_STORE.FEED_STATE.cardPlannedBudget);
        this.#cardActualBudget = new Card(USER_STORE.FEED_STATE.cardActualBudget);
    }

    /**
     * Renders the Dashboard template and returns the rendered HTML.
     * This method is similar to `renderTemplateToParent` but returns the rendered HTML instead of rendering it to the parent element.
     */
    render = async () => {
        if (!userStore.storage.user.feed) {
            await userStore.feed();
        }

        if (userStore.storage.user.feed) {
            const balance = userStore.storage.user.feed.balance;
            const plannedBudget = userStore.storage.user.feed.plannedBudget;
            const actualBudget = userStore.storage.user.feed.actualBudget;

            this.#cardBalance.setState({ cardSubhead: parseFloat(balance) });
            this.#cardPlannedBudget.setState({ cardSubhead: parseFloat(plannedBudget) });
            this.#cardActualBudget.setState({ cardSubhead: parseFloat(actualBudget) });
        }

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
            this.#cardPlannedBudget.setState(newState.cardPlannedBudget);
            this.#cardActualBudget.setState(newState.cardActualBudget);
        }
    }
}
