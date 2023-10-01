'use strict';

import {BaseComponent} from "../../baseComponent.js";

const DEFAULT_BUTTON = {
    buttonText: 'Button',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonRadiusSize: 'button_radius-small',
    buttonImageLeft: '',
    buttonImageRight: '',
    buttonType: 'button'
};

/**
 * Represents a Button component.
 * @class
 */
export class Button extends BaseComponent {
    /**
     * The function that will handle the click event of the button element.
     * @type {Function}
     */
    #clickHandler = () => {};

    /**
     * Creates an instance of Button.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the button will be rendered.
     * @param {Object} [state=this.#state] - The initial state of the button component. (optional)
     * @param {string} state.buttonText - The text content of the button.
     * @param {string} state.buttonColor - The CSS class for the button color.
     * @param {string} state.buttonSize - The CSS class for the button size.
     * @param {string} state.buttonRadiusSize - The CSS class for the button radius size.
     * @param {string} state.buttonImageLeft - The path to the image file for the left icon.
     * @param {string} state.buttonImageRight - The path to the image file for the right icon.
     * @param {string} state.buttonType - The type attribute of the button element.
     * @param {Function} [clickHandler = this.#clickHandler] - The function that will handle the click event of the button element. (optional)
     */
    constructor(parent, state = DEFAULT_BUTTON, clickHandler) {
        super(state, parent)
        if (typeof clickHandler === 'function') {
            this.#clickHandler = clickHandler;
        }
    }

    /**
     * Renders the button component and inserts into parent.
     * @returns {string} - The rendered HTML template of the button.
     */
    renderTemplateToParent() {
        const templatesToStateMap = {
            'button.hbs': this.getState(),
        }
        
        return super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Renders the button component.
     * @returns {string} - The rendered HTML template of the button.
     */
    render() {
        const templatesToStateMap = {
            'button.hbs': this.getState(),
        }
        
        return super.render(templatesToStateMap);
    }

    /**
     * Setup handlers after rendering template.
     */
    setHandlers() {
        if (!this.parent) {
            console.log(`can't set handlers for {this} because no parent`);
            return;
        }
        
        const buttonElement = this.parent.querySelector('button');
        buttonElement.addEventListener('click', this.handleClick.bind(this));
    }

    /**
     * Handles the click event of the button element.
     * @param {Event} event - The click event object.
     */
    handleClick(event) {
        if (typeof this.#clickHandler === 'function') {
            this.#clickHandler();
        }
    }

    /**
     * Sets the click event handler for the button.
     * @param {Function} clickHandler - The function to handle the click event.
     */
    setHandler(clickHandler) {
        this.#clickHandler = clickHandler;
    }

    /**
     * Gets the current click event handler for the button.
     * @returns {Function} - The current click event handler.
     */
    getHandler() {
        return this.#clickHandler;
    }
}
