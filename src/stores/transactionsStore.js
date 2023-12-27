import { transactionsApi } from '@api/transaction';
import { EVENT_TYPES, STATUS_CODES } from '@constants/constants';
import { categoriesStore } from '@stores/categoriesStore';
import {
    DATE_RULES, DESCRIPTION_RULES, MONEY_RULES, PAYER_RULES
} from '@constants/validation';
import { accountStore } from '@stores/accountStore';
import { userStore } from '@stores/userStore';

import { numberWithSpaces } from '@utils';
import { validator } from '../modules/validator';

import BaseStore from './baseStore.js';

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
        this.storage = {
            states: [],
        };
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
            switch (error.status) {
            case STATUS_CODES.NO_CONTENT:
                this.storage.states = null;
                break;
            default:
                this.storage.states = null;
            }
            this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, транзакции не были загружены' };
        }
    };

    transformArray = (arr) => arr
        .map((data) => ({
            raw: data.id,
            id: `id${data.id}`,
            rawDate: data.date,
            transactionName: data.categories ? data.categories[0].category_name : 'Без категории',
            tag: data.categories ? data.categories[0].id : null,
            transactionPlace: data.payer,
            transactionMessage: data.description,
            value: numberWithSpaces(data.income - data.outcome),
            account: accountStore.accounts?.find((account) => account.id === data.account_income).mean_payment,
            owner: data.login === userStore.storage.user.login ? '' : data.login,
            account_income: data.account_income,
            account_outcome: data.account_outcome,
            cardId: `card_${data.id}`,
        }));

    getNameById(id) {
        const obj = categoriesStore.storage.tags.find((item) => item.id === id);

        return obj ? obj.name : null;
    }

    createTransaction = async (data) => {
        if (validator(data.description, DESCRIPTION_RULES).isError
            || validator(data.money, MONEY_RULES).isError
            || validator(data.payer, PAYER_RULES).isError
            || validator(data.date, DATE_RULES).isError) {

            this.validateTransaction(data, 'create');

            return;
        }

        try {
            // eslint-disable-next-line no-unused-vars
            data.categories = data.categories[0].id ? data.categories : null;
            // eslint-disable-next-line
            const { money, ...newData } = data;
            const response = await transactionsApi.createTransaction(newData);

            this.notify = { success: true, notifierText: `Транзакция на сумму ${data.money} успешно создана!` };

            const index = this.storage.states?.findIndex((obj) => new Date(obj.rawDate) <= new Date(data.date));

            this.storage.states.splice(index, 0, {
                raw: response.body.transaction_id,
                id: `id${response.body.transaction_id}`,
                rawDate: data.date,
                transactionName: data.categories ? this.getNameById(data.categories[0].id) : 'Без категорий',
                transactionPlace: data.payer,
                transactionMessage: data.description,
                value: numberWithSpaces(data.income - data.outcome),
                account: accountStore.accounts.find((account) => account.id === data.account_income).mean_payment,
                deleteId: `delete_${response.transaction_id}`,
                cardId: `card_${response.transaction_id}`,
            });
        } catch (error) {
            this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не смогли создать транзакцию' };
        }

        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };

    validateTransaction = (data, type) => {
        const resultDescription = validator(data.description, DESCRIPTION_RULES);
        const resultPayer = validator(data.payer, PAYER_RULES);
        const resultSum = validator(data.money, MONEY_RULES);
        const resultDate = validator(data.date, DATE_RULES);

        resultDescription.value = data.description;
        resultPayer.value = data.payer;
        resultSum.value = data.money;
        resultDate.value = data.date;

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
            date: resultDate,
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

            this.notify = { success: true, notifierText: 'Успешно удалили транзакцию' };

            this.storage.states = this.storage.states.filter((item) => item.raw !== data.transaction_id);

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не смогли удалить транзакцию' };
        }
    };

    updateTransaction = async (data) => {
        if (validator(data.description, DESCRIPTION_RULES).isError
            || validator(data.money, MONEY_RULES).isError
            || validator(data.payer, PAYER_RULES).isError
            || validator(data.date, DATE_RULES).isError) {

            this.validateTransaction(data, 'update');

            return;
        }
        try {
            // eslint-disable-next-line no-unused-vars
            data.categories = data.categories[0].id ? data.categories : null;
            // eslint-disable-next-line
            const { money, ...newData } = data;
            await transactionsApi.updateTransaction(newData);

            this.notify = { success: true, notifierText: 'Транзакция успешно обновлена!' };

            this.storage.states = this.storage.states.map((item) => {
                if (item.raw === data.transaction_id) {
                    return {
                        raw: data.transaction_id,
                        id: `id${data.transaction_id}`,
                        rawDate: data.date,
                        transactionName: data.categories ? this.getNameById(data.categories[0].id) : 'Без категорий',
                        value: numberWithSpaces(data.income - data.outcome),
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
            this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не смогли обновить транзакцию' };
        }

        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };

    rerenderTransaction = async () => {
        this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
    };
}

export const transactionsStore = new TransactionsStore();
