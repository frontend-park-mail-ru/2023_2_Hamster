import { transactionsApi } from '@api/transaction';
import { EVENT_TYPES, STATUS_CODES } from '@constants/constants';
import { categoriesStore } from '@stores/categoriesStore';
import { DESCRIPTION_RULES, MONEY_RULES, PAYER_RULES } from '@constants/validation';
import { accountStore } from '@stores/accountStore';
import BaseStore from './baseStore.js';
import { validator } from '../modules/validator';

/**
 *
 * @class
 * @extends BaseStore
 */
class TransactionsStore extends BaseStore {

    /**
     * Creates an instance of TransactionsStore.
     *
     * @constructor
     * @property {Object} storage - An object that contains the state of the transactions.
     * @property {string|null} storage.error - An error message, if any.
     */
    constructor() {
        super();
        this.storage = {};
    }

    /**
     * Get all categories.
     *
     * @async
     * @function
     */
    getTransaction = async (qString) => {
        try {
            const response = await transactionsApi.getTransaction(qString);

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.states = this.transformArray(response.body.transactions);
                this.transactions = response.body.transactions;

                break;

            case STATUS_CODES.NO_CONTENT:
                this.storage.states = null;

                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    transformArray = (arr) => arr.map((data) => ({
        raw: data.id,
        id: `id${data.id}`,
        rawDate: data.date,
        transactionName: this.findName(data.categories).pop().name,
        tag: this.findName(data.categories).pop().id,
        transactionPlace: data.payer,
        transactionMessage: data.description,
        value: data.income - data.outcome,
        account: accountStore.accounts.find((account) => account.id === data.account_income).mean_payment,
        account_income: data.account_income,
        account_outcome: data.account_outcome,
        cardId: `card_${data.id}`,
    }));

    findName = (categories) => {
        this.categories = categoriesStore.storage.tags.map((obj) => ({
            id: obj.id,
            name: obj.name,
        }));

        return this.categories.filter((obj) => categories.includes(obj.id));
    };

    getNameById(id) {
        const obj = this.categories.find((item) => item.id === id);

        return obj ? obj.name : null;
    }

    createTransaction = async (data) => {
        if (validator(data.description, DESCRIPTION_RULES).isError
            || validator(data.income - data.outcome, MONEY_RULES).isError
            || validator(data.payer, PAYER_RULES).isError) {

            this.validateCreateTransaction(data, 'create');

            return;
        }

        try {
            const response = await transactionsApi.createTransaction(data);

            const index = this.storage.states.findIndex((obj) => new Date(obj.rawDate) <= new Date(data.date));

            this.storage.states.splice(index, 0, {
                raw: response.body.transaction_id,
                id: `id${response.body.transaction_id}`,
                rawDate: data.date,
                transactionName: this.getNameById(data.categories.pop()),
                transactionPlace: data.payer,
                transactionMessage: data.description,
                value: data.income - data.outcome,
                account: accountStore.accounts.find((account) => account.id === data.account_income).mean_payment,
                deleteId: `delete_${response.transaction_id}`,
                cardId: `card_${response.transaction_id}`,
            });

            this.storage.error = null;

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    validateCreateTransaction = (data, type) => {
        const resultDescription = validator(data.description, DESCRIPTION_RULES);
        const resultPayer = validator(data.payer, PAYER_RULES);
        const resultSum = validator(data.income - data.outcome, MONEY_RULES);

        resultDescription.value = data.description;
        resultPayer.value = data.payer;
        resultSum.value = data.income - data.outcome;

        this.storage.error = {
            type,
            description: resultDescription,
            payer: resultPayer,
            sum: resultSum,
            tag: data.categories,
            account: data.account_income,
        };

        if (type === 'update') {
            this.storage.error.raw = data.transaction_id;
        }

        this.storeChanged = true;

        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };

    deleteTransaction = async (data) => {
        try {
            await transactionsApi.deleteTransaction(data.transaction_id);

            this.storage.states = this.storage.states.filter((item) => item.raw !== data.transaction_id);

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    updateTransaction = async (data) => {
        if (validator(data.description, DESCRIPTION_RULES).isError
            || validator(data.income - data.outcome, MONEY_RULES).isError
            || validator(data.payer, PAYER_RULES).isError) {

            console.log(validator(data.description, DESCRIPTION_RULES), validator(data.income, MONEY_RULES), validator(data.outcome, MONEY_RULES), validator(data.payer, PAYER_RULES));

            this.validateCreateTransaction(data, 'update');

            return;
        }
        try {
            await transactionsApi.updateTransaction(data);

            this.storage.states = this.storage.states.map((item) => {
                if (item.raw === data.transaction_id) {
                    return {
                        raw: data.transaction_id,
                        id: `id${data.transaction_id}`,
                        rawDate: data.date,
                        transactionName: this.getNameById(data.categories.pop()),
                        value: data.income - data.outcome,
                        account: accountStore.accounts.find((account) => account.id === data.account_income).mean_payment,
                        transactionPlace: data.payer,
                        transactionMessage: data.description,
                        deleteId: `delete_${data.transaction_id}`,
                        cardId: `card_${data.transaction_id}`,
                    };
                }
                return item;
            });

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    rerenderTransaction = async () => {
        this.storeChanged = true;

        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };
}

export const transactionsStore = new TransactionsStore();
