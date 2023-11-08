import { TRANSACTION_ACTIONS } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const transactionActions = {
    getTransactions() {
        dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.GET_TRANSACTIONS,
            data: {},
        });
    },

    createTransaction(categories) {
        dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.CREATE_TRANSACTION,
            data: {
                categories,
            },
        });
    },

    updateTransaction(transaction_id, categories) {
        dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.UPDATE_TRANSACTION,
            data: {
                transaction_id,
                categories,
            },
        });
    },

    deleteTransaction(transaction_id) {
        dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.DELETE_TRANSACTION,
            data: {
                transaction_id,
            },
        });
    },

};
