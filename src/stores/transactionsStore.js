import BaseStore from './baseStore.js';
import { transactionsApi } from '@api/transaction';
import { router } from '@router';
import { EVENT_TYPES, ROUTE_CONSTANTS } from '@constants/constants';

/**
 *
 * @class
 * @extends BaseStore
 */
class CategoriesStore extends BaseStore {

    /**
     * Creates an instance of UserStore.
     *
     * @constructor
     * @property {Object} storage - An object that contains the state of the user.
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
    getTransaction = async () => {
        try {
            const response = await transactionsApi.getTransaction();

            this.storage.states = this.transformArray(response);

            router.navigateTo(ROUTE_CONSTANTS.TRANSACTIONS)
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    transformArray = (arr) => {
        return arr.map(data => {
            return {
                id: 'id' + data.transaction_id,
                transactionName: data.categories.pop(),
                value: data.income - data.outcome,
                account: data.account_income,
                deleteId: 'delete_' + data.transaction_id,
                cardId: 'card_' + data.transaction_id,
            };
        });
    };

    createTransaction = async (data) => {
        try {
            const response = await transactionsApi.createTransaction(data);

            this.storage.states.push({
                id: 'id' + response.transaction_id,
                transactionName: data.categories.pop(),
                value: data.value,
                account: data.account,
                deleteId: 'delete_' + response.transaction_id,
                cardId: 'card_' + response.transaction_id,
            });

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    deleteTransaction = async (data) => {
        try {
            const response = await transactionsApi.deleteTransaction(data);

            this.storage.states.filter(item => item.id !== data);

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    updateTransaction = async (data) => {
        try {
            const response = await transactionsApi.updateTransaction(data);

            this.storage.states.map(item => {
                if (item.id === response.id) {
                    return {
                        id: 'id' + response.id,
                        categoryName: response.name,
                        deleteId: 'delete_' + response.id,
                        cardId: 'card_' + response.id,
                    };
                }
                return item;
            });

            this.emitChange(EVENT_TYPES.RERENDER_TRANSACTIONS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };
}

export const transactionsStore = new CategoriesStore();
