import { BaseComponent } from '@components/baseComponent.js';

import template from './checkbox.hbs';

const DEFAULT_CHECKBOX = {
    id: 'checkbox',
    label: 'default',
};

/**
 * Represents a Checkbox component.
 * @class
 */
export class Checkbox extends BaseComponent {
    /**
     * The function that will handle the click event of the checkbox element.
     * @type {Function}
     */
    #clickHandler = () => {};

    /**
     * Creates an instance of Checkbox.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the checkbox will be rendered.
     * @param {Object} state - The initial state of the checkbox component. (optional)
     * @param {string} state.id - The id of the checkbox.
     * @param {string} state.label - The label for the button.
     * @param {Function} [clickHandler = this.#clickHandler] - The function that will handle the click event of the checkbox element. (optional)
     */
    constructor(parent, state = DEFAULT_CHECKBOX, clickHandler) {
        state = { ...DEFAULT_CHECKBOX, ...state };
        super(state, parent);
        if (typeof clickHandler === 'function') {
            this.#clickHandler = clickHandler;
        }
    }

    /**
     * Renders the checkbox component.
     * @returns {string} - The rendered HTML template of the checkbox.
     */
    render() {
        return super.render([template(this.getState())]);
    }

    /**
     * Setup handlers after rendering template.
     */
    setHandlers() {
        if (!this.parent) {
            console.error(`can't set handlers for ${this} because no parent`);
            return;
        }

        const checkboxElement = this.parent.querySelector(`#${this.getState().id}`);
        checkboxElement.addEventListener('click', this.handleClick.bind(this));
    }

    /**
     * Handles the click event of the checkbox element.
     * @param {Event} event - The click event object.
     */
    handleClick(event) {
        if (typeof this.#clickHandler === 'function') {
            this.#clickHandler();
        }
    }

    /**
     * Sets the click event handler for the checkbox.
     * @param {Function} clickHandler - The function to handle the click event.
     */
    setHandler(clickHandler) {
        this.#clickHandler = clickHandler;
    }

    /**
     * Gets the current click event handler for the checkbox.
     * @returns {Function} - The current click event handler.
     */
    getHandler() {
        return this.#clickHandler;
    }
}
