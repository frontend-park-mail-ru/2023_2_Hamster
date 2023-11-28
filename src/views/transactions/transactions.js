import {BaseComponent} from '@components/baseComponent.js';

import template from './transactions.hbs';

import {Button, Input, Select} from '@atoms';
import {EVENT_TYPES} from '@constants/constants';
import {Transaction} from '@atoms/transaction/transaction';
import {transactionsStore} from '@stores/transactionsStore';
import {categoriesStore} from '@stores/categoriesStore';
import {transactionActions} from '@actions/transactionActions';
import {categoryActions} from '@actions/categoryActions';

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
    units: 'руб.',
};

const TAG_INPUT_STATE = {
    id: 'tag_input_id',
    hidden: 'Категория',
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

const ACCOUNT_INPUT_STATE = {
    id: 'account_input_id',
    hidden: 'Счет',
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
        this.tagInput = new Select(null, TAG_INPUT_STATE);
        this.payerInput = new Input(null, PAYER);
        this.descriptionInput = new Input(null, DESCRIPTION);
        this.accountInput = new Select(null, ACCOUNT_INPUT_STATE);
        this.button = new Button(null, BUTTON_STATE);
    }

    /**
     * Renders the CategoriesView template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    async render() {
        if (!categoriesStore.storage.states) {
            await categoryActions.getCategories();
        }

        if (!transactionsStore.storage.states) {
            await transactionActions.getTransactions();
        }

        this.transactions = this.createTransactions(transactionsStore.storage.states);
        this.renderedTransactions = this.renderTransactions(this.transactions);

        const templates = [
            template({
                sumInput: this.sumInput.render(),
                tagInput: this.tagInput.render(),
                payer: this.payerInput.render(),
                description: this.descriptionInput.render(),
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
                return {transaction: item.render()};
            });
        }
    };

    // TODO: add input validation
    setHandlers() {
        if (this.transactions) {
            this.transactions.forEach(transaction => {
                const categoryCard = document.querySelector(`#${transaction.getState().cardId}`);
                if (categoryCard) {
                    categoryCard.addEventListener('click', this.handleCardClick.bind(this, transaction));
                }

                const button = document.querySelector(`#${transaction.button.getState().id}`);
                if (button) {
                    button.addEventListener('click', this.updateButtonHandler.bind(this, transaction));
                }

                const deleteButton = document.querySelector(`#${transaction.getState().deleteId}`);
                if (deleteButton) {
                    deleteButton.addEventListener('click', this.deleteButtonHandler.bind(this, transaction));
                }
            });
        }

        const createButton = document.querySelector('#button');
        if (createButton) {
            createButton.addEventListener('click', this.createButtonHandler.bind(this));
        }
    }

    handleCardClick = (transaction, event) => {
        if (event.target.classList.contains('transaction__delete')) {
            return;
        }

        const isSettingsOpen = transaction.getState().settingsOpen;
        transaction.setState({settingsOpen: !isSettingsOpen});

        const categoryCard = document.querySelector(`#${transaction.getState().id}`);
        categoryCard.outerHTML = transaction.render();

        this.setHandlers();
    };

    updateButtonHandler = async (transaction) => {
        const sumInput = document.querySelector(`#${transaction.sumInput.getState().id}`).value;
        const tagInput = document.querySelector(`#${transaction.tagInput.getState().id}`).value;
        // const accountInput = document.querySelector(`#${transaction.accountInput.getState().id}`).value;

        if (sumInput && tagInput) {
            let income;
            let outcome;

            if (sumInput > 0) {
                income = sumInput;
                outcome = 0;
            } else {
                outcome = Math.abs(sumInput);
                income = 0;
            }

            const account = transactionsStore.account;

            await transactionActions.updateTransaction(account, transaction.getState().raw, [transactionsStore.getIdByName(tagInput)], parseFloat(income), parseFloat(outcome));
        }
    };

    deleteButtonHandler = async (transaction) => {
        await transactionActions.deleteTransaction(transaction.getState().raw);
    };

    createButtonHandler = async () => {
        const sumInput = document.querySelector(`#${this.sumInput.getState().id}`).value;
        const tagInput = document.querySelector(`#${this.tagInput.getState().id}`).value;
        // const accountInput = document.querySelector(`#${this.accountInput.getState().id}`).value;

        if (sumInput && tagInput) {
            let income;
            let outcome;

            if (sumInput > 0) {
                income = sumInput;
                outcome = 0;
            } else {
                outcome = sumInput;
                income = 0;
            }

            const account = transactionsStore.account;

            await transactionActions.createTransaction(account, [transactionsStore.getIdByName(tagInput)], parseFloat(income), parseFloat(outcome));
        }
    };
}
