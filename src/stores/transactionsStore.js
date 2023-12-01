import BaseStore from './baseStore.js';
import {transactionsApi} from '@api/transaction';
import {EVENT_TYPES, STATUS_CODES} from '@constants/constants';
import {categoriesStore} from '@stores/categoriesStore';
import {
    DESCRIPTION_RULES, LOGIN_RULES,
    MONEY_RULES,
    PAYER_RULES
} from "@constants/validation";
import {validator} from "../modules/validator";

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
                    this.account = response.body.transactions.pop().account_income;

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
        return arr.map(data => {
            if (!this.findName(data.categories).pop().name) {
                return
            }
            return {
                raw: data.id,
                id: 'id' + data.id,
                transactionName: this.findName(data.categories)
                    .pop().name,
                transactionPlace: data.payer,
                transactionMessage: data.description,
                value: data.income - data.outcome,
                account: 'Карта',
                deleteId: 'delete_' + data.id,
                cardId: 'card_' + data.id,
            };
        });
    };

    findName = (categories) => {
        this.categories = categoriesStore.storage.tags.map(obj => {
            return {
                id: obj.id,
                name: obj.name,
            };
        });

        return this.categories.filter(obj => categories.includes(obj.id));
    };

    getNameById(id) {
        const obj = this.categories.find(item => item.id === id);

        return obj ? obj.name : null;
    }

    getIdByName(name) {
        const obj = this.categories.find(item => item.name === name);

        return obj ? obj.id : '00000000-0000-0000-0000-000000000000';
    }

    createTransaction = async (data) => {
        if (validator(data.description, DESCRIPTION_RULES).isError
            || validator(data.income, MONEY_RULES).isError
            || validator(data.outcome, MONEY_RULES).isError
            || validator(data.payer, PAYER_RULES).isError) {

            console.log(validator(data.description, DESCRIPTION_RULES), validator(data.income, MONEY_RULES), validator(data.outcome, MONEY_RULES), validator(data.payer, PAYER_RULES))

            this.validateCreateTransaction(data);

            return null;
        }

        try {
            const response = await transactionsApi.createTransaction(data);

            this.storage.states.push({
                raw: response.body.transaction_id,
                id: 'id' + response.body.transaction_id,
                transactionName: this.getNameById(data.categories.pop()),
                transactionPlace: data.payer,
                transactionMessage: data.description,
                value: data.income - data.outcome,
                account: 'Карта',
                deleteId: 'delete_' + response.transaction_id,
                cardId: 'card_' + response.transaction_id,
            });

            this.storage.error = null;

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    validateCreateTransaction = (data) => {
        const resultDescription = validator(data.description, DESCRIPTION_RULES);
        const resultPayer = validator(data.payer, PAYER_RULES);
        const resultIncome = validator(data.income, MONEY_RULES);
        const resultOutcome = validator(data.outcome, MONEY_RULES);

        let resultSum = null;
        if (resultIncome.isError) {
            resultSum = resultIncome
        }
        if (resultOutcome.isError) {
            resultSum = resultOutcome
        }

        this.storage.error = {
            position: 'create',
            description: resultDescription,
            payer: resultPayer,
            money: resultSum,
        };

        this.storeChanged = true;

        this.emitChange(EVENT_TYPES.RERENDER_LOGIN_INPUT);
    }

    deleteTransaction = async (data) => {
        try {
            await transactionsApi.deleteTransaction(data.transaction_id);

            this.storage.states = this.storage.states.filter(item => item.raw !== data.transaction_id);

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    updateTransaction = async (data) => {
        try {
            await transactionsApi.updateTransaction(data);
            this.storage.states = this.storage.states.map(item => {
                if (item.raw === data.transaction_id) {
                    return {
                        raw: data.transaction_id,
                        id: 'id' + data.transaction_id,
                        transactionName: this.getNameById(data.categories.pop()),
                        value: data.income - data.outcome,
                        account: 'Карта',
                        deleteId: 'delete_' + data.transaction_id,
                        cardId: 'card_' + data.transaction_id,
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
    }
}

export const transactionsStore = new TransactionsStore();
