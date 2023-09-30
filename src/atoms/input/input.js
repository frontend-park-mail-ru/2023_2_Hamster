'use strict';

/**
 * Represents an Input Component.
 * @class
 */
export class InputComponent {
    /**
     * The parent element where the input will be rendered.
     * @type {HTMLElement}
     */
    #parent;

    /**
     * The state of the input component.
     * @type {Object}
     * @property {string} inputValue - The current value of the input.
     * @property {string} inputImageLeft - The path to the image file for the left icon.
     * @property {string} inputImageRight - The path to the image file for the right icon
     * @property {string} inputType - The type attribute of the input element (e.g., text, email, password).
     * @property {string} inputPlaceholder - The placeholder text for the input.
     */
    #state = {
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
     * The function that will handle the input change event.
     * @type {Function}
     */
    #changeHandler = () => {};

    /**
     * Creates an instance of InputComponent.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the input will be rendered.
     * @param {Object} [state=this.#state] - The initial state of the input component. (optional)
     * @param {Function} [changeHandler=this.#changeHandler] - The function that will handle the input change event. (optional)
     */
    constructor(parent, state = this.#state, changeHandler = this.#changeHandler) {
        this.#parent = parent;
        this.#state = { ...this.#state, ...state };
        this.#changeHandler = changeHandler;
    }

    /**
     * Renders the input component.
     * @returns {string} - The rendered HTML template of the input.
     */
    renderTemplate() {
        const template = Handlebars.templates['input.hbs'];
        const renderedTemplate = template(this.#state);

        if (this.#parent) {
            this.#parent.innerHTML = renderedTemplate;
            //const inputElement = this.#parent.querySelector('input');
            //inputElement.addEventListener('click', this.handleInputChange.bind(this))
        }

        return renderedTemplate;
    }

    /**
     * Updates the state of the input component.
     * @param {Object} newState - The new state object containing the changed props.
     */
    setState(newState) {
        this.#state = { ...this.#state, ...newState };
        this.renderTemplate(); // Re-render the input with updated state.
    }

    /**
     * Retrieves the current state of the input component.
     * @returns {Object} - The current state object.
     */
    getState() {
        return this.#state;
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