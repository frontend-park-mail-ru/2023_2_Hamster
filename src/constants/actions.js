import {userStore} from '@stores/userStore.js';
import {categoriesStore} from '@stores/categoriesStore';
import {transactionsStore} from '@stores/transactionsStore';
import {csatStore} from "@stores/csatStore";

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
};

export const CSAT_ACTIONS = {
    GET: 'GET_STATISTICS',
    POST: 'SEND_RESULTS',
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
        type: CSAT_ACTIONS.GET,
        method: csatStore.getStats
    },
    {
        type: CSAT_ACTIONS.POST,
        method: csatStore.post
    }
];
