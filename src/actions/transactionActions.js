import { TRANSACTION_ACTIONS } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const transactionActions = {
    async getTransactions() {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.GET_TRANSACTIONS,
            data: {},
        });
    },

    async createTransaction(account, categories, income, outcome) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.CREATE_TRANSACTION,
            data: {
                account_income: account,
                account_outcome: account,
                categories,
                date: '2023-11-13T04:11:38.113227Z',
                description: 'sorry, not now :(',
                income,
                outcome,
                payer: 'sorry, not now :(',
            },
        });
    },

    async updateTransaction(account, transaction_id, categories, income, outcome) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.UPDATE_TRANSACTION,
            data: {
                account_income: account,
                account_outcome: account,
                transaction_id,
                categories,
                date: '2023-11-13T04:11:38.113227Z',
                description: 'sorry, not now :(',
                income,
                outcome,
                payer: 'sorry, not now :(',
            },
        });
    },

    async deleteTransaction(transaction_id) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.DELETE_TRANSACTION,
            data: {
                transaction_id,
            },
        });
    },

};
