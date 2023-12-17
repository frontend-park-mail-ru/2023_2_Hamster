import { BaseComponent } from '@components/baseComponent.js';

import { SVG_ICONS } from '@icons/icons';
import template from './buttonCard.hbs';

const DEFAULT_CARD = {
    cardColor: 'button-card_accent-color',
    description: 'Ваш план',
    text: 'Базовый',
    path: SVG_ICONS.box.path,
};

/**
 * Represents a small Card component.
 *
 * @class
 */
export class ButtonCard extends BaseComponent {
    /**
     * The function that will handle the click event of the small Card element.
     * @type {Function}
     */
    #clickHandler = () => {
    };

    /**
     * Creates an instance of small card.
     *
     * @constructor
     * @param {HTMLElement} parent - The parent element where the card will be rendered.
     * @param {Object} state - The initial state of the card component. (optional)
     * @param {Function} [clickHandler = this.#clickHandler] - The function that will handle the click event of the card element. (optional)
     */
    constructor(parent, state = DEFAULT_CARD, clickHandler) {
        super(state, null, parent);

        if (typeof clickHandler === 'function') {
            this.#clickHandler = clickHandler;
        }
    }

    /**
     * Renders the card component and inserts into parent.
     *
     * @returns {string} - The rendered HTML template of the card.
     * @function
     */
    async renderTemplateToParent() {
        return await super.renderTemplateToParent([template(this.getState())]);
    }

    /**
     * Renders the card component.
     *
     * @returns {string} - The rendered HTML template of the card.
     * @function
     */
    render() {
        return super.render([template(this.getState())]);
    }

    /**
     * Remove listeners and then set them up.
     *
     * @function
     */
    cleanUp() {
        const avatarElement = document.querySelector(this.getState().id);
        if (avatarElement) {
            avatarElement.removeEventListener('click', this.getHandler());
        }

        this.setHandlers();
    }

    /**
     * Setup handlers after rendering template.
     *
     * @function
     */
    setHandlers() {
        if (!this.parent) {
            console.error(`can't set handlers for ${this} because no parent`);
            return;
        }

        const avatarElement = this.parent.querySelector(this.getState().id);
        if (avatarElement) {
            avatarElement.addEventListener('click', this.handleClick.bind(this));
        }
    }

    /**
     * Handles the click event of the image element.
     *
     * @function
     * @param {Event} event - The click event object.
     */
    handleClick(event) {
        if (typeof this.#clickHandler === 'function') {
            this.#clickHandler();
        }
    }

    /**
     * Sets the click event handler for the image.
     *
     * @function
     * @param {Function} clickHandler - The function to handle the click event.
     */
    setHandler(clickHandler) {
        this.#clickHandler = clickHandler;
    }

    /**
     * Gets the current click event handler for the image.
     *
     * @function
     * @returns {Function} - The current click event handler.
     */
    getHandler() {
        return this.#clickHandler;
    }
}
