import { BaseComponent } from '@components/baseComponent.js';

import template from './select.hbs';

const DEFAULT = {
    hidden: 'choose something',
    values: [
        {value: 'value 1'},
        {value: 'value 2'},
        {value: 'value 3'},
    ]
};

/**
 * Represents a Select Component.
 * @class
 */
export class Select extends BaseComponent {
    /**
     * The function that will handle the select event.
     * @type {Function}
     */
    #handler = () => {};

    /**
     * Creates an instance of Select Component.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the select will be rendered.
     * @param {Object} [state=DEFAULT_INPUT] - The initial state of the select component. (optional)
     * @param {string} state.inputValue - The current value of the input.
     * @param {string} state.inputImageLeft - The path to the image file for the left icon.
     * @param {Function} [handler=this.#handler] - The function that will handle the select event. (optional)
     */
    constructor(parent, state = DEFAULT, handler) {
        super(state, parent);
        if (typeof handler === 'function') {
            this.#handler = handler;
        }
    }

    /**
     * Renders the select component.
     * @returns {string} - The rendered HTML template of the select.
     */
    render() {
        return super.render([template(this.getState())]);
    }

    /**
     * Sets the event handler for the select.
     * @param {Function} handler - The function to handle the select event.
     */
    setHandler(handler) {
        this.#handler = handler;
    }

    /**
     * Gets the current event handler for the select.
     * @returns {Function} - The current event handler.
     */
    getHandler() {
        return this.#handler;
    }
}
