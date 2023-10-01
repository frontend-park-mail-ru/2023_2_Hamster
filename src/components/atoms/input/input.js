'use strict';

import {BaseComponent} from "../../baseComponent.js";

const DEFAULT_INPUT = {
    Error: '',
    inputLabelText: '',
    inputSize: 'input_small',
    inputImageLeft: '',
    inputImageRight: '',
    typeOfInput: 'text',
    inputPlaceholder: 'Enter text...',
    inputHelperText: ''
};

/**
 * Represents an Input Component.
 * @class
 */
export class InputComponent extends BaseComponent {
    /**
     * The function that will handle the input change event.
     * @type {Function}
     */
    #changeHandler = () => {};

    /**
     * Creates an instance of InputComponent.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the input will be rendered.
     * @param {Object} [state=this.#state] - The initial state of the input component. (optional)
     * @param {string} state.inputValue - The current value of the input.
     * @param {string} state.inputImageLeft - The path to the image file for the left icon.
     * @param {string} state.inputImageRight - The path to the image file for the right icon
     * @param {string} state.inputType - The type attribute of the input element (e.g., text, email, password).
     * @param {string} state.inputPlaceholder - The placeholder text for the input.
     * @param {Function} [changeHandler=this.#changeHandler] - The function that will handle the input change event. (optional)
     */
    constructor(parent, state = DEFAULT_INPUT, changeHandler) {
        super(state, parent)
        if (typeof changeHandler === 'function') {
            this.#changeHandler = changeHandler;
        }
    }

    /**
     * Renders the input component and inserts into parent.
     * @returns {string} - The rendered HTML template of the input.
     */
    renderTemplateToParent() {
        const templatesToStateMap = {
            'input.hbs': this.getState(),
        };

        return super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Renders the input component.
     * @returns {string} - The rendered HTML template of the input.
     */
    render() {
        const templatesToStateMap = {
            'input.hbs': this.getState(),
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

        const inputElement = this.parent.querySelector('input');
        inputElement.addEventListener('change', this.handleInputChange.bind(this))
    }

    /**
     * Handles the input change event.
     * @param {Event} event - The input change event object.
     */
    handleInputChange(event) {
        if (typeof this.#changeHandler === 'function') {
            this.#changeHandler(event.target.value);
        }
    }

    /**
     * Sets the change event handler for the input.
     * @param {Function} changeHandler - The function to handle the input change event.
     */
    setChangeHandler(changeHandler) {
        this.#changeHandler = changeHandler;
    }

    /**
     * Gets the current change event handler for the input.
     * @returns {Function} - The current change event handler.
     */
    getChangeHandler() {
        return this.#changeHandler;
    }
}