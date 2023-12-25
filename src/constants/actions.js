import { userStore } from '@stores/userStore.js';
import { categoriesStore } from '@stores/categoriesStore';
import { transactionsStore } from '@stores/transactionsStore';
import { accountStore } from '@stores/accountStore';

export const USER_ACTIONS_TYPES = {
    API_CHECK_AUTH: 'USER_CHECK_AUTH',
    API_REGISTRATION: 'USER_REGISTRATION',
    API_LOGIN: 'USER_LOGIN',
    API_LOGOUT: 'USER_LOGOUT',
    API_FEED: 'USER_FEED',

    VALIDATE_LOGIN: 'VALIDATE_LOGIN',
    VALIDATE_USERNAME: 'VALIDATE_USERNAME',
    VALIDATE_PASSWORD: 'VALIDATE_PASSWORD',
    VALIDATE_REPEAT: 'VALIDATE_REPEAT',

    ROUTE_LOGIN: 'ROUTE_LOGIN',
    ROUTE_REGISTRATION: 'ROUTE_REGISTRATION',

    UPDATE_PROFILE: 'UPDATE_PROFILE',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_AVATAR: 'UPDATE_AVATAR',

    EXPORT_CSV: 'EXPORT_CSV',
    IMPORT_CSV: 'IMPORT_CSV',
};

export const CATEGORY_ACTIONS = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
};

export const TRANSACTION_ACTIONS = {
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    CREATE_TRANSACTION: 'CREATE_TRANSACTION',
    UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
    DELETE_TRANSACTION: 'DELETE_TRANSACTION',
    RERENDER_TRANSACTION: 'RERENDER_TRANSACTION_ACTION',
    VALIDATE_TRANSACTION: 'VALIDATE_TRANSACTION',
};

export const ACCOUNT_ACTIONS = {
    SELECT_ACCOUNT: 'SELECT_ACCOUNT',
    GET_ACCOUNTS: 'GET_ACCOUNTS',
    CREATE_ACCOUNT: 'CREATE_ACCOUNT',
    UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',

    ADD_USER_IN_ACCOUNT: 'ADD_USER_IN_ACCOUNT',
    DELETE_USER_IN_ACCOUNT: 'DELETE_USER_IN_ACCOUNT',
    UNSUBSCRIBE_ACCOUNT: 'UNSUBSCRIBE_ACCOUNT',
};

export const actions = [
    {
        type: USER_ACTIONS_TYPES.API_CHECK_AUTH,
        method: userStore.checkAuth,
    },
    {
        type: USER_ACTIONS_TYPES.API_LOGIN,
        method: userStore.login,
    },
    {
        type: USER_ACTIONS_TYPES.API_REGISTRATION,
        method: userStore.registration,
    },
    {
        type: USER_ACTIONS_TYPES.API_LOGOUT,
        method: userStore.logout,
    },
    {
        type: USER_ACTIONS_TYPES.API_FEED,
        method: userStore.feed,
    },
    {
        type: USER_ACTIONS_TYPES.VALIDATE_LOGIN,
        method: userStore.isLoginValid,
    },
    {
        type: USER_ACTIONS_TYPES.VALIDATE_USERNAME,
        method: userStore.isUsernameValid,
    },
    {
        type: USER_ACTIONS_TYPES.VALIDATE_PASSWORD,
        method: userStore.isPasswordValid,
    },
    {
        type: USER_ACTIONS_TYPES.VALIDATE_REPEAT,
        method: userStore.isPasswordRepeat,
    },
    {
        type: USER_ACTIONS_TYPES.ROUTE_LOGIN,
        method: userStore.routeLogin,
    },
    {
        type: USER_ACTIONS_TYPES.ROUTE_REGISTRATION,
        method: userStore.routeRegistration,
    },
    {
        type: USER_ACTIONS_TYPES.UPDATE_PROFILE,
        method: userStore.updateProfile,
    },
    {
        type: USER_ACTIONS_TYPES.UPDATE_PASSWORD,
        method: userStore.updatePassword,
    },
    {
        type: USER_ACTIONS_TYPES.UPDATE_AVATAR,
        method: userStore.updateAvatar,
    },
    {
        type: USER_ACTIONS_TYPES.EXPORT_CSV,
        method: userStore.csvExport,
    },
    {
        type: USER_ACTIONS_TYPES.IMPORT_CSV,
        method: userStore.csvImport,
    },

    {
        type: CATEGORY_ACTIONS.GET_CATEGORIES,
        method: categoriesStore.getTags,
    },
    {
        type: CATEGORY_ACTIONS.CREATE_CATEGORY,
        method: categoriesStore.createTag,
    },
    {
        type: CATEGORY_ACTIONS.UPDATE_CATEGORY,
        method: categoriesStore.updateTag,
    },
    {
        type: CATEGORY_ACTIONS.DELETE_CATEGORY,
        method: categoriesStore.deleteTag,
    },

    {
        type: TRANSACTION_ACTIONS.GET_TRANSACTIONS,
        method: transactionsStore.getTransaction,
    },
    {
        type: TRANSACTION_ACTIONS.CREATE_TRANSACTION,
        method: transactionsStore.createTransaction,
    },
    {
        type: TRANSACTION_ACTIONS.UPDATE_TRANSACTION,
        method: transactionsStore.updateTransaction,
    },
    {
        type: TRANSACTION_ACTIONS.DELETE_TRANSACTION,
        method: transactionsStore.deleteTransaction,
    },
    {
        type: TRANSACTION_ACTIONS.RERENDER_TRANSACTION,
        method: transactionsStore.rerenderTransaction,
    },

    {
        type: ACCOUNT_ACTIONS.SELECT_ACCOUNT,
        method: accountStore.selectAccount,
    },
    {
        type: ACCOUNT_ACTIONS.GET_ACCOUNTS,
        method: accountStore.getAccounts,
    },
    {
        type: ACCOUNT_ACTIONS.CREATE_ACCOUNT,
        method: accountStore.createAccount,
    },
    {
        type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT,
        method: accountStore.updateAccount,
    },
    {
        type: ACCOUNT_ACTIONS.DELETE_ACCOUNT,
        method: accountStore.deleteAccount,
    },
    {
        type: ACCOUNT_ACTIONS.ADD_USER_IN_ACCOUNT,
        method: accountStore.addUserInAccount,
    },
    {
        type: ACCOUNT_ACTIONS.DELETE_USER_IN_ACCOUNT,
        method: accountStore.deleteUserInAccount,
    },
    {
        type: ACCOUNT_ACTIONS.UNSUBSCRIBE_ACCOUNT,
        method: accountStore.unsubscribeAccount,
    }
];
