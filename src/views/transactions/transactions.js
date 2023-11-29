import {BaseComponent} from '@components/baseComponent.js';

import template from './transactions.hbs';

import {Button, Checkbox, Input, Select} from '@atoms';
import {Transaction} from '@atoms/transaction/transaction';
import {transactionsStore} from '@stores/transactionsStore';
import {categoriesStore} from '@stores/categoriesStore';
import {transactionActions} from '@actions/transactionActions';
import FILTER_IMAGE from "@icons/filter.svg";
import {EVENT_TYPES} from "@constants/constants";
import {accountStore} from "@stores/accountStore";
import {AccountsView} from "@views";


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
    id: 'tag_create_select',
    hidden: 'Выберете категорию',
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
    id: 'account_create_id',
    hidden: 'Выберете счет',
};

const FILTER_BUTTON = {
    id: 'filter_open',
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: FILTER_IMAGE,
    buttonText: '',
}

const INCOME = {
    id: 'income',
    label: 'В доходах'
}

const OUTCOME = {
    id: 'outcome',
    label: 'В расходах',
}

const SUBMIT_BUTTON = {
    id: 'filter_submit',
    buttonText: 'Подтвердить',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
}

const DATE_START = {
    id: 'start_start_input',
    inputSize: 'input_small',
    typeOfInput: 'date',
}

const DATE_END = {
    id: 'end_date_input',
    inputSize: 'input_small',
    typeOfInput: 'date',
}

const ACCOUNT_SELECT = {
    id: 'account_select',
    hidden: 'Выберете счет',
}

const TAG_SELECT = {
    id: 'tag_select',
    hidden: 'Выберете категорию',
}

const DATE_CREATE = {
    id: 'date_create_input',
    inputSize: 'input_small',
    typeOfInput: 'date',
}

/**
 * TransactionsView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class TransactionsView extends BaseComponent {

    constructor(parent) {
        super(undefined, template, parent);

        this.date = new Input(null, DATE_CREATE);
        this.sumInput = new Input(null, SUM_INPUT_STATE);
        this.tagInput = new Select(null, TAG_INPUT_STATE);
        this.payerInput = new Input(null, PAYER);
        this.descriptionInput = new Input(null, DESCRIPTION);
        this.accountInput = new Select(null, ACCOUNT_INPUT_STATE);
        this.button = new Button(null, BUTTON_STATE);

        this.isFilterOpen = false;
        this.filterButton = new Button(null, FILTER_BUTTON);
        this.tagFilter = new Select(null, TAG_SELECT);
        this.accountFilter = new Select(null, ACCOUNT_SELECT);
        this.incomeFilter = new Checkbox(null, INCOME);
        this.outcomeFilter = new Checkbox(null, OUTCOME);
        this.submitFilter = new Button(null, SUBMIT_BUTTON);
        this.startDate = new Input(null, DATE_START);
        this.endDate = new Input(null, DATE_END);
    }

    /**
     * Renders the CategoriesView template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    async render() {
        if (!categoriesStore.storage.tags) {
            await categoriesStore.getTags();
            this.tagFilter.setState({values: categoriesStore.categoriesValues});
            this.tagInput.setState({values: categoriesStore.categoriesValues});
        }

        if (!transactionsStore.transactions) {
            await transactionsStore.getTransaction();
        }

        if (!accountStore.storage.feed) {
            await accountStore.getAccounts();
            this.accountFilter.setState({values: accountStore.accountsValues});
            this.accountInput.setState({values: accountStore.accountsValues});
        }

        this.transactions = this.createTransactions(transactionsStore.storage.states);
        this.renderedTransactions = this.renderTransactions(this.transactions);

        const templates = [
            template({
                date: this.date.render(),
                sumInput: this.sumInput.render(),
                tagInput: this.tagInput.render(),
                payer: this.payerInput.render(),
                description: this.descriptionInput.render(),
                accountInput: this.accountInput.render(),
                button: this.button.render(),
                transactionsList: this.renderedTransactions,

                filterOpen: this.isFilterOpen,
                filterButton: this.filterButton.render(),
                tagFilter: this.tagFilter.render(),
                accountFilter: this.accountFilter.render(),
                incomeFilter: this.incomeFilter.render(),
                outcomeFilter: this.outcomeFilter.render(),
                startDate: this.startDate.render(),
                endDate: this.endDate.render(),
                submitFilter: this.submitFilter.render(),
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

        const filterButton = document.querySelector(`#${this.filterButton.getState().id}`)
        if (filterButton) {
            filterButton.addEventListener('click', this.filterButtonHandler.bind(this));
        }

        const submitFilter = document.querySelector(`#${this.submitFilter.getState().id}`)
        if (submitFilter) {
            submitFilter.addEventListener('click', this.submitFilterHandler.bind(this));
        }
    }

    // TODO: 1) Add validation; 2)Add new handler in transaction store special for filter;
    submitFilterHandler = async () => {
        const categoryID = document.querySelector(`#${this.tagFilter.getState().id}`).value;
        const accountId = document.querySelector(`#${this.accountFilter.getState().id}`).value;
        const income = document.querySelector(`#${this.incomeFilter.getState().id}`).checked;
        const outcome = document.querySelector(`#${this.outcomeFilter.getState().id}`).checked;
        const startDateValue = document.querySelector(`#${this.startDate.getState().id}`).value;
        const endDateValue = document.querySelector(`#${this.endDate.getState().id}`).value;

        let startDate = null;
        if (startDateValue) {
            const startDateObj = new Date(startDateValue);
            startDate = startDateObj.toISOString();
        }

        let endDate = null;
        if (endDateValue) {
            const endDateObj = new Date(endDateValue);
            endDate = endDateObj.toISOString();
        }

        const qString = this.buildQueryString(accountId, categoryID, startDate, endDate, income, outcome);

        this.isFilterOpen = false;
        await transactionsStore.getTransaction(`?${qString}`);
        await transactionActions.rerenderTransactions();
    }

    buildQueryString = (account, category, startDate, endDate, income, outcome) => {
        let queryString = '';

        if (account) {
            queryString += `account=${account}&`;
        }
        if (category) {
            queryString += `category=${category}&`;
        }
        if (startDate) {
            queryString += `start_date=${startDate}&`;
        }
        if (endDate) {
            queryString += `end_date=${endDate}&`;
        }
        if (income) {
            queryString += `income=${income}&`;
        }
        if (outcome) {
            queryString += `outcome=${outcome}&`;
        }

        queryString = queryString.slice(0, -1);

        return queryString;
    }

    filterButtonHandler = async () => {
        this.isFilterOpen = !this.isFilterOpen;

        await transactionActions.rerenderTransactions();
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
        const description = document.querySelector(`#${this.descriptionInput.getState().id}`).value;
        const payer = document.querySelector(`#${this.payerInput.getState().id}`).value;
        const accountInput = document.querySelector(`#${transaction.accountInput.getState().id}`).value;

        if (sumInput && tagInput) {
            let income;
            let outcome;

            if (sumInput > 0) {
                income = Math.abs(sumInput);
                outcome = 0;
            } else {
                outcome = Math.abs(sumInput);
                income = 0;
            }

            const account = transactionsStore.account;

            await transactionActions.updateTransaction(account, transaction.getState().raw, [transactionsStore.getIdByName(tagInput)], parseFloat(income), parseFloat(outcome), description, payer);
        }
    };

    deleteButtonHandler = async (transaction) => {
        await transactionActions.deleteTransaction(transaction.getState().raw);
    };

    createButtonHandler = async () => {
        const dateValue = document.querySelector(`#${this.date.getState().id}`).value;
        const sumInput = document.querySelector(`#${this.sumInput.getState().id}`).value;
        const tagId = document.querySelector(`#${this.tagInput.getState().id}`).value;
        const description = document.querySelector(`#${this.descriptionInput.getState().id}`).value;
        const payer = document.querySelector(`#${this.payerInput.getState().id}`).value;
        const accountId = document.querySelector(`#${this.accountInput.getState().id}`).value;

        let date = null;
        if (dateValue) {
            const startDateObj = new Date(dateValue);
            date = startDateObj.toISOString();
        }

        if (sumInput && tagId) {
            let income;
            let outcome;

            if (sumInput > 0) {
                income = Math.abs(sumInput);
                outcome = 0;
            } else {
                outcome = Math.abs(sumInput);
                income = 0;
            }

            await transactionActions.createTransaction(accountId, [tagId], date, description, parseFloat(income), parseFloat(outcome), payer);
        }
    };
}
