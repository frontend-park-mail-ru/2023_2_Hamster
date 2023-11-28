import { BaseComponent } from '@components/baseComponent.js';

import template from './transaction.hbs';
import { Button, Image, Input } from '@atoms';
import { SVG_ICONS } from '@icons/icons';

const DEFAULT_TRANSACTION = {
    id: 'tag1',
    transactionName: 'Тестовая категория',
    value: -1000,
    account: 'основной',
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

const SUM_INPUT_STATE = {
    id: 'sum_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Сумма',
    units: 'руб.',
};

const TAG_INPUT_STATE = {
    id: 'tag_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Категория',
};

const ACCOUNT_INPUT_STATE = {
    id: 'account_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Счет',
};

/**
 * Represents a Transaction component.
 *
 * @class
 */
export class Transaction extends BaseComponent {
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
    constructor(parent, state = DEFAULT_TRANSACTION, clickHandler) {
        super(state, null, parent);

        const buttonState = { ...BUTTON_STATE, id: 'button_' + state.id };

        this.icon = new Image(null, ICON, undefined);
        this.sumInput = new Input(null, {...SUM_INPUT_STATE, id: 'sum_'+ state.id});
        this.tagInput = new Input(null, {...TAG_INPUT_STATE, id: 'tag_'+ state.id});
        this.accountInput = new Input(null, {...ACCOUNT_INPUT_STATE, id: 'account_'+ state.id});
        this.button = new Button(null, buttonState)

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
                    sumInput: this.sumInput.render(),
                    // accountInput: this.accountInput.render(),
                    tagInput: this.tagInput.render(),
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
