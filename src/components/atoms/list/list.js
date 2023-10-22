import { BaseComponent } from '@components/baseComponent.js';

import template from './list.hbs';

const DEFAULT_LIST = {
    listItems: [
        {
            listItemTitle: '',
            listItemValue: '',
            valueUnits: '',
        },
    ],
};

/**
 * Represents a List component.
 * @class
 */
export class List extends BaseComponent {
    /**
     * The function that will handle the click event of the card element.
     * @type {Function}
     */
    #clickHandler = () => {
    };

    /**
     * Creates an instance of List.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the list will be rendered.
     * @param {{listItems: [{listItemValue: string, valueUnits: string, listItemTitle: string}]}} [state=this.#state] - The initial state of the list component. (optional)
     * @param {string} state.listSize - The size of the list.
     * @param {string} state.listTitle - The title of the list.
     * @param {Array} state.listItems - The items in the list.
     */
    constructor(state = DEFAULT_LIST, parent) {
        super(state, parent);
    }

    /**
     * Renders the list component and updates the DOM.
     * @returns {string} - The rendered HTML template of the list.
     */
    renderTemplateToParent() {
        super.renderTemplateToParent([template(this.getState())]);
    }

    render() {
        return super.render([template(this.getState())]);
    }

    setHandlers() {
        const cardElement = this.parent.querySelector('.card');
        cardElement.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        if (typeof this.#clickHandler === 'function') {
            this.#clickHandler();
        }
    }

    setHandler(clickHandler) {
        this.#clickHandler = clickHandler;
    }

    getHandler() {
        return this.#clickHandler;
    }
}
