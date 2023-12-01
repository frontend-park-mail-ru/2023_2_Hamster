import { TRANSACTION_ACTIONS } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const transactionActions = {
    async getTransactions(qString) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.GET_TRANSACTIONS,
            data: {
                qString
            },
        });
    },

    async createTransaction(account, categories, date, description, income, outcome, payer) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.CREATE_TRANSACTION,
            data: {
                account_income: account,
                account_outcome: account,
                categories,
                date,
                description,
                income,
                outcome,
                payer,
            },
        });
    },

    async updateTransaction(account, transactionId, categories, date, income, outcome, description, payer) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.UPDATE_TRANSACTION,
            data: {
                account_income: account,
                account_outcome: account,
                transaction_id: transactionId,
                categories,
                date,
                description,
                income,
                outcome,
                payer,
            },
        });
    },

    async deleteTransaction(transactionId) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.DELETE_TRANSACTION,
            data: {
                transaction_id: transactionId,
            },
        });
    },

    async rerenderTransactions() {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.RERENDER_TRANSACTION,
            data: {},
        });
    },

    async validateTransaction(sum, date, payer, description, tag, account) {
        await dispatcher.dispatch({
            type: TRANSACTION_ACTIONS.VALIDATE_TRANSACTION,
            data: {
                sum,
                date,
                payer,
                description,
                tag,
                account,
            },
        });
    }
};
