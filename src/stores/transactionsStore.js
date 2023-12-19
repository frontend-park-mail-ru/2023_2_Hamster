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

    transformArray = (arr) => {
        return arr
            .filter(data => data.categories !== null)
            .map((data) => {
                const sharedAccount = accountStore.sharingWith.find((account) => account.accountId === data.account_income);
                return {
                    raw: data.id,
                    id: `id${data.id}`,
                    rawDate: data.date,
                    transactionName: data.categories[0].category_name,
                    tag: data.categories[0].id,
                    transactionPlace: data.payer,
                    transactionMessage: data.description,
                    value: data.income - data.outcome,
                    account: accountStore.accounts?.find((account) => account.id === data.account_income).mean_payment,
                    owner: sharedAccount ? sharedAccount.login : undefined,
                    account_income: data.account_income,
                    account_outcome: data.account_outcome,
                    cardId: `card_${data.id}`,
                };
            });
    };


    getNameById(id) {
        const obj = categoriesStore.storage.tags.find((item) => item.id === id);

        return obj ? obj.name : null;
    }

    createTransaction = async (data) => {
        if (validator(data.description, DESCRIPTION_RULES).isError
            || validator(data.money, MONEY_RULES).isError
            || validator(data.payer, PAYER_RULES).isError) {

            this.validateTransaction(data, 'create');

            return;
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const { money, ...newData } = data;
            const response = await transactionsApi.createTransaction(newData);

            const index = this.storage.states.findIndex((obj) => new Date(obj.rawDate) <= new Date(data.date));

            this.storage.states.splice(index, 0, {
                raw: response.body.transaction_id,
                id: `id${response.body.transaction_id}`,
                rawDate: data.date,
                transactionName: this.getNameById(data.categories[0].id),
                transactionPlace: data.payer,
                transactionMessage: data.description,
                value: data.income - data.outcome,
                account: accountStore.accounts.find((account) => account.id === data.account_income).mean_payment,
                deleteId: `delete_${response.transaction_id}`,
                cardId: `card_${response.transaction_id}`,
            });
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }

        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };

    validateTransaction = (data, type) => {
        const resultDescription = validator(data.description, DESCRIPTION_RULES);
        const resultPayer = validator(data.payer, PAYER_RULES);
        const resultSum = validator(data.money, MONEY_RULES);

        resultDescription.value = data.description;
        resultPayer.value = data.payer;
        resultSum.value = data.money;

        if (!resultPayer.message) {
            resultPayer.message = '(опционально)';
        }

        if (!resultDescription.message) {
            resultDescription.message = '(опционально)';
        }

        this.storage.error = {
            type,
            description: resultDescription,
            payer: resultPayer,
            sum: resultSum,
            tag: data.categories[0].id,
            account: data.account_income,
        };

        if (type === 'update') {
            this.storage.error.raw = data.transaction_id;
        }

        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);

        this.storage.error = null;
    };

    deleteTransaction = async (data) => {
        try {
            await transactionsApi.deleteTransaction(data.transaction_id);

            this.storage.states = this.storage.states.filter((item) => item.raw !== data.transaction_id);

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    updateTransaction = async (data) => {
        if (validator(data.description, DESCRIPTION_RULES).isError
            || validator(data.money, MONEY_RULES).isError
            || validator(data.payer, PAYER_RULES).isError) {

            this.validateTransaction(data, 'update');

            return;
        }
        try {
            // eslint-disable-next-line no-unused-vars
            const { money, ...newData } = data;
            await transactionsApi.updateTransaction(newData);

            this.storage.states = this.storage.states.map((item) => {
                if (item.raw === data.transaction_id) {
                    return {
                        raw: data.transaction_id,
                        id: `id${data.transaction_id}`,
                        rawDate: data.date,
                        transactionName: this.getNameById(data.categories[0].id),
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

        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }

        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };

    rerenderTransaction = async () => {
        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };
}

export const transactionsStore = new TransactionsStore();
