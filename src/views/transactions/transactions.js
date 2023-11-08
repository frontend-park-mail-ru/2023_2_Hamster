import { BaseComponent } from '@components/baseComponent.js';

import template from './transactions.hbs';

import { Button, Category, Input } from '@atoms';
import { EVENT_TYPES } from '@constants/constants';
import { Transaction } from '@atoms/transaction/transaction';
import { transactionsStore } from '@stores/transactionsStore';

const BUTTON_STATE = {
    id: 'button',
    buttonText: 'Создать',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const SUM_INPUT_STATE = {
    id: 'sum_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Сумма',
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
 * TransactionsView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class TransactionsView extends BaseComponent {

    constructor(parent) {я
        super(undefined, template, parent);

        this.sumInput = new Input(null, SUM_INPUT_STATE);
        this.tagInput = new Input(null, TAG_INPUT_STATE);
        this.accountInput = new Input(null, ACCOUNT_INPUT_STATE);
        this.button = new Button(null, BUTTON_STATE);

        this.transaction = new Transaction(null, undefined);

        transactionsStore.registerListener(EVENT_TYPES.RERENDER_TRANSACTIONS, this.render)
    }

    /**
     * Renders the CategoriesView template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    render() {
        const templates = [
            template({
                sumInput: this.sumInput.render(),
                tagInput: this.tagInput.render(),
                accountInput: this.accountInput.render(),
                button: this.button.render(),
                transactionsList: [{
                    transaction: this.transaction.render(),
                },
                ],
            }),
        ];

        return super.render(templates);
    }

    createCategories = (arr) => {
        if (arr) {
            return arr.map(item => {
                return new Category(null, item, null);
            });
        }
    };

    renderCategories = (arr) => {
        if (arr) {
            return arr.map(item => {
                return { category: item.render() };
            });
        }
    };

    // TODO: add input validation
    // setHandlers() {
    //     if (this.categories) {
    //         this.categories.forEach(category => {
    //             const categoryCard = document.querySelector(`#${category.getState().cardId}`);
    //             if (categoryCard) {
    //                 categoryCard.addEventListener('click', this.handleClick.bind(this, category));
    //             }
    //
    //             const button = document.querySelector(`#${category.button.getState().id}`);
    //             if (button) {
    //                 button.addEventListener('click', this.updateButtonHandler.bind(this, category));
    //             }
    //
    //             const deleteButton = document.querySelector(`#${category.button.getState().deleteId}`);
    //             if (deleteButton) {
    //                 deleteButton.addEventListener('click', this.deleteButtonHandler.bind(this, category));
    //             }
    //         });
    //     }
    //
    //     const createButton = document.querySelector(this.button.getState().id);
    //     if (createButton) {
    //         createButton.addEventListener('click', this.createButtonHandler.bind(this));
    //     }
    // }
    //
    // handleClick = (category) => {
    //     const isSettingsOpen = category.getState().settingsOpen;
    //     category.setState({ settingsOpen: !isSettingsOpen });
    //
    //     const categoryCard = document.querySelector(`#${category.getState().id}`);
    //     categoryCard.outerHTML = category.render();
    //
    //     this.setHandlers();
    // };
    //
    // updateButtonHandler = (category) => {
    //     const inputValue = document.querySelector(`#${category.input.getState().id}`).value;
    //     if (inputValue) {
    //         categoryActions.updateCategory(category.getState().id, inputValue);
    //     }
    // };
    //
    // deleteButtonHandler = (category) => {
    //     categoryActions.deleteCategory(category.getState().id);
    // };
    //
    // createButtonHandler = () => {
    //     const inputValue = document.querySelector(this.input.getState().id).value;
    //     if (inputValue) {
    //         categoryActions.createCategory(inputValue);
    //     }
    // };
}
