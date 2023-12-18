import { BaseComponent } from '@components/baseComponent.js';
import {
    Button, Checkbox, Input, Select, Transaction
} from '@atoms';
import { transactionsStore } from '@stores/transactionsStore';
import { categoriesStore } from '@stores/categoriesStore';
import { accountStore } from '@stores/accountStore';
import { transactionActions } from '@actions/transactionActions';
import { MONTH_NAMES } from '@constants/constants';

import FILTER_IMAGE from '@icons/filter.svg';

import template from './transactions.hbs';

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

const FILTER_BUTTON = {
    id: 'filter_open',
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: FILTER_IMAGE,
    buttonText: '',
};

const INCOME = {
    id: 'income',
    label: 'В доходах'
};

const OUTCOME = {
    id: 'outcome',
    label: 'В расходах',
};

const SUBMIT_BUTTON = {
    id: 'filter_submit',
    buttonText: 'Подтвердить',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const DATE_START = {
    id: 'start_start_input',
    inputSize: 'input_small',
    typeOfInput: 'date',
    min: '2000-01-01',
    max: '2100-01-01',
};

const DATE_END = {
    id: 'end_date_input',
    inputSize: 'input_small',
    typeOfInput: 'date',
    min: '2000-01-01',
    max: '2100-01-01',
};

const DATE_CREATE = {
    id: 'date_create_input',
    inputSize: 'input_small',
    typeOfInput: 'date',
    min: '2000-01-01',
    max: '2100-01-01',
};

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
        this.tagInput = new Select(null, { id: 'tag_create_select' });
        this.payerInput = new Input(null, PAYER);
        this.descriptionInput = new Input(null, DESCRIPTION);
        this.accountInput = new Select(null, { id: 'account_create_id' });
        this.button = new Button(null, BUTTON_STATE);

        this.isFilterOpen = false;
        this.filterButton = new Button(null, FILTER_BUTTON);
        this.tagFilter = new Select(null, { hidden: 'Категория не выбрана', id: 'tag_select' });
        this.accountFilter = new Select(null, { hidden: 'Счет не выбран', id: 'account_select' });
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

        await accountStore.getAccounts();
        this.accountFilter.setState({ values: accountStore.accountsValues });
        this.accountInput.setState({ values: accountStore.accountsValues });

        await categoriesStore.getTags();
        this.tagFilter.setState({ values: categoriesStore.categoriesValues });
        this.tagInput.setState({ values: categoriesStore.categoriesValues });

        await transactionsStore.getTransaction();

        if (transactionsStore.storage.error) {
            if (transactionsStore.storage.error.type === 'create') {
                const {
                    description, payer, sum, account, tag
                } = transactionsStore.storage.error;

                this.descriptionInput.setState({
                    inputHelperText: description.message,
                    isError: description.isError,
                    value: description.value
                });
                this.payerInput.setState({
                    inputHelperText: payer.message,
                    isError: payer.isError,
                    value: payer.value
                });
                this.sumInput.setState({
                    inputHelperText: sum.message,
                    isError: sum.isError,
                    value: sum.value
                });
                this.accountInput.setState({
                    values: this.changeOrder(accountStore.accountsValues, account),
                });
                this.tagInput.setState({
                    values: this.changeOrder(categoriesStore.categoriesValues, tag.pop()),
                });
            }
        }

        this.transactions = this.createTransactions(transactionsStore.storage.states);
        this.renderedTransactions = this.renderTransactions(this.transactions);

        this.date.setState({ value: this.getTodayDate });

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

    getTodayDate = () => {
        const now = new Date();
        const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // получить смещение в миллисекундах
        const localNow = new Date(now.getTime() - timezoneOffset);

        const day = (`0${localNow.getDate()}`).slice(-2);
        const month = (`0${localNow.getMonth() + 1}`).slice(-2);

        return `${localNow.getFullYear()}-${month}-${day}`;
    };

    textFormatDate = (transactionDate) => {
        const date = new Date(transactionDate);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const month = MONTH_NAMES[monthIndex];
        const dayOfWeek = date.toLocaleString('ru', { weekday: 'long' });

        return { date: `${day} ${month}`, dayOfWeek };
    };

    createTransactions = (arr) => {
        if (arr) {
            return arr.map((item) => {
                const transaction = new Transaction(null, item, null);

                transaction.setState(this.textFormatDate(transaction.date));

                transaction.sumInput.setState({ value: item.value });
                transaction.accountInput.setState({ values: this.changeOrder(accountStore.accountsValues, item.account_income) });
                transaction.tagInput.setState({ values: this.changeOrder(categoriesStore.categoriesValues, item.tag) });
                transaction.descriptionInput.setState({ value: item.transactionMessage });
                transaction.payerInput.setState({ value: item.transactionPlace });

                if (transactionsStore.storage.error) {
                    if (transactionsStore.storage.error.type === 'update' && transactionsStore.storage.error.raw === item.raw) {
                        transaction.setState({ settingsOpen: true });

                        const {
                            description, payer, sum, account, tag
                        } = transactionsStore.storage.error;

                        transaction.descriptionInput.setState({
                            inputHelperText: description.message,
                            isError: description.isError,
                            value: description.value
                        });
                        transaction.payerInput.setState({
                            inputHelperText: payer.message,
                            isError: payer.isError,
                            value: payer.value
                        });
                        transaction.sumInput.setState({
                            inputHelperText: sum.message,
                            isError: sum.isError,
                            value: sum.value
                        });
                        transaction.accountInput.setState({
                            values: this.changeOrder(accountStore.accountsValues, account),
                        });
                        transaction.tagInput.setState({
                            values: this.changeOrder(categoriesStore.categoriesValues, tag.pop()),
                        });
                    }
                }

                return transaction;
            });
        }

        const transaction = new Transaction(null);

        transaction.setState(this.textFormatDate(transaction.date));

        return [transaction];
    };

    changeOrder = (array, id) => {
        const copy = [...array];
        return copy.sort((a, b) => {
            if (a.value === id) return -1;
            if (b.value === id) return 1;
            return 0;
        });
    };

    renderTransactions = (arr) => {
        if (arr) {
            return arr.map((item) => ({ transaction: item.render() }));
        }

        return [];
    };

    setHandlers() {
        if (this.transactions) {
            this.transactions.forEach((transaction) => {
                const categoryCard = document.querySelector(`#${transaction.getState().cardId}`);
                if (categoryCard) {
                    categoryCard.addEventListener('click', this.handleCardClick.bind(this, transaction));
                }

                const button = document.querySelector(`#${transaction.button.getState().id}`);
                if (button) {
                    button.addEventListener('click', this.updateButtonHandler.bind(this, transaction));
                }

                const deleteButton = document.querySelector(`#${transaction.delete.getState().id}`);
                if (deleteButton) {
                    deleteButton.addEventListener('click', this.deleteButtonHandler.bind(this, transaction));
                }
            });
        }

        const createButton = document.querySelector('#button');
        if (createButton) {
            createButton.addEventListener('click', this.createButtonHandler.bind(this));
        }

        const filterButton = document.querySelector(`#${this.filterButton.getState().id}`);
        if (filterButton) {
            filterButton.addEventListener('click', this.filterButtonHandler.bind(this));
        }

        const submitFilter = document.querySelector(`#${this.submitFilter.getState().id}`);
        if (submitFilter) {
            submitFilter.addEventListener('click', this.submitFilterHandler.bind(this));
        }
    }

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
    };

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
    };

    filterButtonHandler = async () => {
        this.isFilterOpen = !this.isFilterOpen;

        await transactionActions.rerenderTransactions();
    };

    handleCardClick = (transaction, event) => {
        if (event.target.classList.contains('transaction__delete')) {
            return;
        }

        const isSettingsOpen = transaction.getState().settingsOpen;
        transaction.setState({ settingsOpen: !isSettingsOpen });

        const transactionCard = document.querySelector(`#${transaction.getState().id}`);
        transactionCard.outerHTML = transaction.render();

        this.setHandlers();
    };

    updateButtonHandler = async (transaction) => {
        const dateValue = document.querySelector(`#${transaction.dateInput.getState().id}`).value;
        const sumValue = document.querySelector(`#${transaction.sumInput.getState().id}`).value;
        const tagValue = document.querySelector(`#${transaction.tagInput.getState().id}`).value;
        const descriptionValue = document.querySelector(`#${transaction.descriptionInput.getState().id}`).value;
        const payerValue = document.querySelector(`#${transaction.payerInput.getState().id}`).value;
        const accountValue = document.querySelector(`#${transaction.accountInput.getState().id}`).value;

        const startDateObj = new Date(dateValue || this.getTodayDate());
        const date = startDateObj.toISOString();

        let income = 0;
        let outcome = 0;

        if (sumValue > 0) {
            income = Math.abs(sumValue);
        } else {
            outcome = Math.abs(sumValue);
        }

        await transactionActions.updateTransaction(accountValue, transaction.getState().raw, [{ id: tagValue }], date, parseFloat(income), parseFloat(outcome), descriptionValue, payerValue, sumValue);
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

        const startDateObj = new Date(dateValue || this.getTodayDate());
        const date = startDateObj.toISOString();

        let income;
        let outcome;

        if (sumInput > 0) {
            income = Math.abs(sumInput);
            outcome = 0;
        } else {
            outcome = Math.abs(sumInput);
            income = 0;
        }

        await transactionActions.createTransaction(accountId, [{ id: tagId }], date, description, parseFloat(income), parseFloat(outcome), payer, sumInput);
    };
}
