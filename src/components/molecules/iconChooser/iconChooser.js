import { BaseComponent } from '@components/baseComponent.js';

import { SVG_ICONS } from '@icons/icons';

import { Button } from '@atoms';
import template from './iconChooser.hbs';

const DEFAULT = {
    id: 'default',
    openId: 'defaultOpen',
    closeId: 'defaultClose',
};

/**
 * Represents a Component to choose icons in modal window.
 * @class
 */
export class IconChooser extends BaseComponent {
    /**
     * The function that will handle the select event.
     * @type {Function}
     */
    #handler = () => {
    };

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

        this.getState().preview = SVG_ICONS.defaultIcon.path;

        this.getState().icons = Object.values(SVG_ICONS).map(({ id, path }) => ({
            id,
            path,
            iconId: `icon_${this.getState().id}_${id}`,
        }));

        this.closeButton = new Button(null, {
            id: this.getState().closeId,
            buttonColor: 'button_primary-color',
            buttonText: 'Закрыть'
        });

        this.value = 0;
    }

    /**
     * Renders the select component.
     * @returns {string} - The rendered HTML template of the select.
     */
    render() {
        return super.render([template({ ...this.getState(), closeButton: this.closeButton.render() })]);
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

    setHandlers() {
        document.getElementById(this.getState().openId).addEventListener('click', this.openModal);
        document.getElementById(this.getState().closeId).addEventListener('click', this.closeModal);

        this.getState().icons.forEach((icon) => {
            document.getElementById(icon.iconId).addEventListener('click', this.iconHandler);
        });

        super.setHandlers();
    }

    iconHandler = (event) => {
        const { id } = event.currentTarget.children[0];
        const openButton = document.getElementById(this.getState().openId);
        openButton.children[0].innerHTML = this.getState().icons[id].path;
        this.value = id;

        this.closeModal();
    };

    openModal = () => {
        const modal = document.getElementById(this.getState().id);
        modal.style.display = 'block';
    };

    closeModal = () => {
        const modal = document.getElementById(this.getState().id);
        modal.style.display = 'none';
    };
}
