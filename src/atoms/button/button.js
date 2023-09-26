'use strict';

/**
 * Represents a Button component.
 * @class
 */
export class Button {
    /**
     * The parent element where the button will be rendered.
     * @type {HTMLElement}
     */
    #parent

    /**
     * The state of the button component.
     * @type {Object}
     * @property {string} buttonText - The text content of the button.
     * @property {string} buttonColor - The CSS class for the button color.
     * @property {string} buttonSize - The CSS class for the button size.
     * @property {string} buttonRadiusSize - The CSS class for the button radius size.
     * @property {string} buttonImageLeft - The path to the image file for the left icon.
     * @property {string} buttonImageRight - The path to the image file for the right icon.
     * @property {string} buttonType - The type attribute of the button element.
     */
    #state = {
        buttonText: 'Button',
        buttonColor: 'button_primary-color',
        buttonSize: 'button_small',
        buttonRadiusSize: 'button_radius-small',
        buttonImageLeft: '',
        buttonImageRight: '',
        buttonType: 'button'
    };

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
     * @param {Function} [clickHandler = this.#clickHandler] - The function that will handle the click event of the button element. (optional)
     */
    constructor(parent, state = this.#state, clickHandler = this.#clickHandler) {
        this.#parent = parent;
        this.#state = {...this.#state, ...state};
        this.#clickHandler = clickHandler;
    }

    /**
     * Renders the button component.
     * @returns {string} - The rendered HTML template of the button.
     */
    renderTemplate() {
        const template = Handlebars.templates['button.hbs'];
        const renderedTemplate = template(this.#state);

        if (this.#parent) {
            this.#parent.innerHTML = renderedTemplate;
            const buttonElement = this.#parent.querySelector('button');
            buttonElement.addEventListener('click', this.handleClick.bind(this));
        }

        return renderedTemplate;
    }

    /**
     * Updates the state of the button component.
     * @param {Object} newState - The new state object containing the changed props.
     */
    setState(newState) {
        this.#state = {...this.#state, ...newState};
    }

    /**
     * Retrieves the current state of the button component.
     * @returns {Object} - The current state object.
     */
    getState() {
        return this.#state;
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
