import { ACCOUNT_ACTIONS } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const accountActions = {
    async selectAccount(accountElementId) {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.SELECT_ACCOUNT,
            data: {
                accountElementId,
            },
        });
    },

    async getAccounts() {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.GET_ACCOUNTS,
            data: {},
        });
    },

    async createAccount(name, balance) {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.CREATE_ACCOUNT,
            data: {
                accumulation: true,
                balance,
                balance_enabled: true,
                mean_payment: name
            }
        });
    },

    async updateAccount(accountId, name, balance) {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT,
            data: {
                accumulation: true,
                balance,
                balance_enabled: true,
                id: accountId,
                mean_payment: name,
            },
        });
    },

    async deleteAccount(accountId, accountElementId) {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.DELETE_ACCOUNT,
            data: {
                account_id: accountId,
                accountElementId,
            },
        });
    },

    async addUserInAccount(login, accountId) {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.ADD_USER_IN_ACCOUNT,
            data: {
                account_id: accountId,
                login,
            },
        });
    },

    async deleteUserInAccount(userId, accountId) {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.DELETE_USER_IN_ACCOUNT,
            data: {
                account_id: accountId,
                user_id: userId,
            },
        });
    },

    async unsubscribeAccount(accountId) {
        await dispatcher.dispatch({
            type: ACCOUNT_ACTIONS.UNSUBSCRIBE_ACCOUNT,
            data: {
                account_id: accountId,
            },
        });
    },
};
