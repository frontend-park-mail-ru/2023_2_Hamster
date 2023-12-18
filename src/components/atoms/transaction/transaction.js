import { BaseComponent } from '@components/baseComponent.js';
import {
    Button, Image, Input, Select
} from '@atoms';
import { SVG_ICONS } from '@icons/icons';

import template from './transaction.hbs';

const DEFAULT_TRANSACTION = {
    id: 'tag1',
    transactionName: 'Хомячье',
    value: 0,
    account: 'Хомачьи щечки',
    deleteId: 'tag1_delete',
    cardId: 'tag1_card',
    rawDate: '0001-01-01T00:00:00.000000Z',
    transactionPlace: 'HammyWallet',
    transactionMessage: 'Не бойтесь, хомяки сами заберут эту транзакцию, когда вы добавите новую'
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

const DELETE_STATE = {
    buttonText: 'Удалить',
    buttonColor: 'button_delete',
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

const PAYER = {
    id: 'payer_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Место платежа',
};

const DESCRIPTION = {
    id: 'description_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Описание',
};

const DATE = {
    id: 'date_edit',
    inputSize: 'input_small',
    typeOfInput: 'date',
    min: '2000-01-01',
    max: '2100-01-01',
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

        this.date = state.rawDate;
        this.icon = new Image(null, ICON, undefined);
        this.dateInput = new Input(null, { ...DATE, id: `date_${state.id}`, value: state.rawDate.split('T')[0] });
        this.sumInput = new Input(null, { ...SUM_INPUT_STATE, id: `sum_${state.id}` });
        this.tagInput = new Select(null, { id: `tag_${state.id}` });
        this.payerInput = new Input(null, { ...PAYER, id: `payer_${state.id}` });
        this.descriptionInput = new Input(null, { ...DESCRIPTION, id: `description_${state.id}` });
        this.accountInput = new Select(null, { id: `account_${state.id}` });
        this.button = new Button(null, { ...BUTTON_STATE, id: `button_${state.id}` });
        this.delete = new Button(null, { ...DELETE_STATE, id: `delete_${state.id}` });

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
                dateInput: this.dateInput.render(),
                sumInput: this.sumInput.render(),
                payer: this.payerInput.render(),
                tagInput: this.tagInput.render(),
                description: this.descriptionInput.render(),
                accountInput: this.accountInput.render(),
                button: this.button.render(),
                delete: this.delete.render(),
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
