import { BaseComponent } from '@components/baseComponent.js';

import { Button, Image, Input } from '@atoms';
import { SVG_ICONS } from '@icons/icons';
import { IconChooser } from '@molecules';
import template from './category.hbs';

const DEFAULT_CATEGORY = {
    id: 'tag1',
    categoryName: 'Тестовая категория',
    deleteId: 'tag1_delete',
    cardId: 'tag1_card'
};

const ICON = {
    imageColor: 'image-container__color_light-blue',
    svg: SVG_ICONS.handCoins.path,
    iconSize: 'icon_big',
    imageSize: 'image-container_big',
};

const BUTTON_STATE = {
    id: 'save__button',
    buttonText: 'Сохранить',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const INPUT_STATE = {
    isError: '',
    id: 'input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Название категории',
};

/**
 * Represents a Category component.
 *
 * @class
 */
export class Category extends BaseComponent {
    /**
     * The function that will handle the click event of the Category element.
     * @type {Function}
     */
    #clickHandler = () => {
    };

    /**
     * Creates an instance of Category.
     *
     * @constructor
     * @param {HTMLElement} parent - The parent element where the category will be rendered.
     * @param {Object} state - The initial state of the category component. (optional)
     * @param {Function} [clickHandler = this.#clickHandler] - The function that will handle the click event of the category element. (optional)
     */
    constructor(parent, state = DEFAULT_CATEGORY, clickHandler) {
        super(state, null, parent);

        const inputState = { ...INPUT_STATE, id: `input_${state.id}`, value: state.categoryName };
        const buttonState = { ...BUTTON_STATE, id: `button_${state.id}` };

        this.icon = new Image(null, { ...ICON, svg: state.path }, undefined);
        this.input = new Input(null, inputState, undefined);
        this.iconChooser = new IconChooser(null, { id: `id_${state.raw}`, openId: `open_${state.raw}`, closeId: `close_${state.raw}` });
        this.button = new Button(null, buttonState, undefined);

        if (typeof clickHandler === 'function') {
            this.#clickHandler = clickHandler;
        }
    }

    /**
     * Renders the category component.
     *
     * @returns {string} - The rendered HTML template of the category.
     * @function
     */
    render() {
        return super.render([template(
            {
                ...this.getState(),
                icon: this.icon.render(),
                iconChooser: this.iconChooser.render(),
                input: this.input.render(),
                button: this.button.render(),
            },
        ),
        ],
        );
    }

    /**
     * Remove listeners.
     *
     * @function
     */
    cleanUp() {

    }

    /**
     * Setup handlers after rendering template.
     *
     * @function
     */
    setHandlers() {
        this.iconChooser.setHandlers();
    }

    /**
     * Handles the click event of the category element.
     *
     * @function
     * @param {Event} event - The click event object.
     */
    handleClick(event) {

    }

    /**
     * Sets the click event handler for the category.
     *
     * @function
     * @param {Function} clickHandler - The function to handle the click event.
     */
    setHandler(clickHandler) {
        this.#clickHandler = clickHandler;
    }

    /**
     * Gets the current click event handler for the category.
     *
     * @function
     * @returns {Function} - The current click event handler.
     */
    getHandler() {
        return this.#clickHandler;
    }
}
