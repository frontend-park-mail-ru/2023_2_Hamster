import { BaseComponent } from '@components/baseComponent.js';

import template from './transactions.hbs';

import { Button, Input } from '@atoms';
import { EVENT_TYPES } from '@constants/constants';
import { Transaction } from '@atoms/transaction/transaction';
import { transactionsStore } from '@stores/transactionsStore';
import { categoriesStore } from '@stores/categoriesStore';
import { transactionActions } from '@actions/transactionActions';

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

    constructor(parent) {
        super(undefined, template, parent);

        this.sumInput = new Input(null, SUM_INPUT_STATE);
        this.tagInput = new Input(null, TAG_INPUT_STATE);
        this.accountInput = new Input(null, ACCOUNT_INPUT_STATE);
        this.button = new Button(null, BUTTON_STATE);

        transactionsStore.registerListener(EVENT_TYPES.RERENDER_TRANSACTIONS, this.render);
    }

    /**
     * Renders the CategoriesView template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    render() {
        this.transactions = this.createTransactions(categoriesStore.storage.states);
        this.renderedTransactions = this.renderTransactions(this.transactions);

        const templates = [
            template({
                sumInput: this.sumInput.render(),
                tagInput: this.tagInput.render(),
                accountInput: this.accountInput.render(),
                button: this.button.render(),
                transactionsList: this.renderedTransactions,
            }),
        ];

        return super.render(templates);
    }

    createTransactions = (arr) => {
        if (arr) {
            return arr.map(item => {
                return new Transaction(null, item, null);
            });
        }
    };

    renderTransactions = (arr) => {
        if (arr) {
            return arr.map(item => {
                return { category: item.render() };
            });
        }
    };

    // TODO: add input validation
    setHandlers() {
        if (this.transactions) {
            this.transactions.forEach(transaction => {
                const categoryCard = document.querySelector(`#${transaction.getState().cardId}`);
                if (categoryCard) {
                    categoryCard.addEventListener('click', this.handleClick.bind(this, transaction));
                }

                const button = document.querySelector(`#${transaction.button.getState().id}`);
                if (button) {
                    button.addEventListener('click', this.updateButtonHandler.bind(this, transaction));
                }

                const deleteButton = document.querySelector(`#${transaction.button.getState().deleteId}`);
                if (deleteButton) {
                    deleteButton.addEventListener('click', this.deleteButtonHandler.bind(this, transaction));
                }
            });
        }

        const createButton = document.querySelector(this.button.getState().id);
        if (createButton) {
            createButton.addEventListener('click', this.createButtonHandler.bind(this));
        }
    }

    handleClick = (transaction) => {
        const isSettingsOpen = transaction.getState().settingsOpen;
        transaction.setState({ settingsOpen: !isSettingsOpen });

        const categoryCard = document.querySelector(`#${transaction.getState().id}`);
        categoryCard.outerHTML = transaction.render();

        this.setHandlers();
    };

    updateButtonHandler = (transaction) => {
        const sumInput = document.querySelector(`#${transaction.sumInput.getState().id}`).value;
        const tagInput = document.querySelector(`#${transaction.tagInput.getState().id}`).value;
        const accountInput = document.querySelector(`#${transaction.accountInput.getState().id}`).value;

        if (sumInput && tagInput && accountInput) {
            transactionActions.updateTransaction(transaction.getState().id, [tagInput], sumInput);
        }
    };

    deleteButtonHandler = (transaction) => {
        transactionActions.deleteTransaction(transaction.getState().id);
    };

    createButtonHandler = () => {
        const sumInput = document.querySelector(`#${this.sumInput.getState().id}`).value;
        const tagInput = document.querySelector(`#${this.tagInput.getState().id}`).value;
        const accountInput = document.querySelector(`#${this.accountInput.getState().id}`).value;

        if (sumInput && tagInput && accountInput) {
            transactionActions.createTransaction([tagInput]);
        }
    };
}
