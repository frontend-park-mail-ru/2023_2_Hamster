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
     * Renders the Dashboard template to the parent element.
     * This method is responsible for rendering the card balance list, cards for planned and actual budget,
     * and then mapping these rendered HTML strings to their corresponding state keys.
     */
    renderTemplateToParent = () => {
        userActions.getFeed();

        const balance = userStore.storage.user.balance;
        const plannedBudget = userStore.storage.user.plannedBudget;
        const actualBudget = userStore.storage.user.actualBudget;

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
            }),
        ];

        super.renderTemplateToParent(templates);
    };

    /**
     * Renders the Dashboard template and returns the rendered HTML.
     * This method is similar to `renderTemplateToParent` but returns the rendered HTML instead of rendering it to the parent element.
     */
    render = async () => {
        await userActions.getFeed();

        const balance = userStore.storage.user.balance;
        const plannedBudget = userStore.storage.user.plannedBudget;
        const actualBudget = userStore.storage.user.actualBudget;

        if (balance) {
            this.#cardBalance.setState({ cardSubhead: balance });
        }

        if (plannedBudget) {
            this.#cardPlannedBudget.setState({ cardSubhead: plannedBudget });
        }

        if (actualBudget) {
            this.#cardActualBudget.setState({ cardSubhead: actualBudget });
        }

        console.log(userStore.storage.user);

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
