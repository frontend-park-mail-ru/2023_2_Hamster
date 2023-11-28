import IMAGE_URL from '@images/peopleLoginReg.svg';
import { SVG_ICONS } from '@icons/icons';

export const ROUTE_CONSTANTS = {
    PROFILE: '/profile',
    LOGIN_ROUTE: '/login',
    REGISTRATION_ROUTE: '/registration',
    DASHBOARD_ROUTE: '/dashboard',
    HOME_ROUTE: '',
    CATEGORIES: '/categories',
    TRANSACTIONS: '/transactions',
    NOT_FOUND: '/404',
    ACCOUNTS: '/accounts',
};

const SERVER_PREFIX = 'https://hammywallet.ru';

export const API_CONSTANTS = {
    SIGN_IN: `${SERVER_PREFIX}/api/auth/signin`,
    SIGN_UP: `${SERVER_PREFIX}/api/auth/signup`,
    LOG_OUT: `${SERVER_PREFIX}/api/auth/logout`,
    CHECK_AUTH: `${SERVER_PREFIX}/api/auth/checkAuth`,

    CSRF: `${SERVER_PREFIX}/api/csrf/`,

    GET_TAGS: `${SERVER_PREFIX}/api/tag/all`,
    CREATE_TAG: `${SERVER_PREFIX}/api/tag/create`,
    UPDATE_TAG_TAIL: `/update`,
    DELETE_TAG: `${SERVER_PREFIX}/api/tag/delete`,

    CREATE_TRANSACTION: `${SERVER_PREFIX}/api/transaction/create`,
    GET_TRANSACTIONS: `${SERVER_PREFIX}/api/transaction/feed`,
    UPDATE_TRANSACTION: `${SERVER_PREFIX}/api/transaction/update`,
    DELETE_TRANSACTION_TAIL: `/delete`,

    FEED: `${SERVER_PREFIX}/api/user/feed`,
    UPDATE: `${SERVER_PREFIX}/api/user/update`,

    GET_ACCOUNTS: `${SERVER_PREFIX}/api/user/accounts/all`,
    CREATE_ACCOUNT: `${SERVER_PREFIX}/api/account/create`,
    UPDATE_ACCOUNT: `${SERVER_PREFIX}/api/account/update`,
    DELETE_ACCOUNT_TAIL: `/delete`,
};

export const getTagURL = (id) => `${SERVER_PREFIX}/api/tag/${id}`;

export const getTransactionURL = (id) => `${SERVER_PREFIX}/api/transaction/${id}`;

export const getAccountURL = (id) => `${SERVER_PREFIX}/api/account/${id}`;

export const STATUS_CODES = {
    OK: 200,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};

// TODO: maybe don't need render login and registration action
export const EVENT_TYPES = {
    RENDER_LOGIN_VIEW: 'RENDER_LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',

    RENDER_REGISTRATION_VIEW: 'RENDER_REGISTRATION',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    REGISTRATION_ERROR: 'REGISTRATION_ERROR',

    LOGOUT: 'LOGOUT',

    RERENDER_LOGIN_INPUT: 'LOGIN_INPUT',
    RERENDER_USERNAME_INPUT: 'USERNAME_INPUT',
    RERENDER_PASSWORD_INPUT: 'PASSWORD_INPUT',
    RERENDER_REPEAT_INPUT: 'REPEAT_INPUT',

    FEED: 'FEED',
    FEED_ERROR: 'FEED_ERROR',

    RERENDER_CATEGORIES: 'RERENDER_CATEGORIES',

    RERENDER_TRANSACTIONS: 'RERENDER_TRANSACTIONS',

    RERENDER_ACCOUNTS: 'RERENDER_ACCOUNTS'
};

export const USER_STORE = {
    LOGIN_STATE: {
        imagePeople: IMAGE_URL,
        imageTextLoginH1: 'Добрый день! HammyWallet',
        imageTextLoginP1: 'Рады видеть вас здесь снова',
        linkLogin: 'У вас нет учетной записи?',
        redirectButton: {
            id: 'switch_login_signup_button',
            buttonText: 'Регистрация',
            buttonSize: 'button_small',
            buttonColor: 'button_primary-color',
        },
    },
    REGISTRATION_STATE: {
        imagePeople: IMAGE_URL,
        imageTextRegistrH1: 'Привет, это HammyWallet',
        imageTextRegistrP1: 'Будем рады помочь вам с финансами!',
        linkRegister: 'У вас уже есть аккаунт?',
        redirectButton: {
            id: 'switch_login_signup_button',
            buttonText: 'Вход',
            buttonSize: 'button_small',
            buttonColor: 'button_primary-color',
        },
    },
    FEED_STATE: {
        cardBalance: {
            cardSize: 'card_small',
            cardHeadline: 'Баланс',
            cardSubhead: 'У вас еще нет счетов',
        },
        cardPlannedBudget: {
            cardSize: 'card_small',
            cardHeadline: 'Запланированный бюджет',
            cardSubhead: 'У вас не запланирован бюджет',
        },
        cardActualBudget: {
            cardSize: 'card_small',
            cardHeadline: 'Фактический бюджет',
            cardSubhead: 'Не можем расчитать фактический бюджет',
        },
    },
};

export const PROFILE_STATE = {
    PLAN_CARD_STATE: {
        cardColor: 'button-card_accent-color',
        description: 'Ваш план',
        text: 'Базовый',
        path: SVG_ICONS.box.path,
    },

    SHARE_CARD_STATE: {
        cardColor: 'button-card_default-color',
        text: 'Совместный доступ',
        path: SVG_ICONS.people.path,
    },

    CATEGORIES_CARD_STATE: {
        id: 'categories_card',
        cardColor: 'button-card_default-color',
        description: 'Настройте свои',
        text: 'Категории',
        path: SVG_ICONS.bookmark.path,
    },

    USERNAME_INPUT_STATE: {
        isError: '',
        id: 'username_input',
        inputSize: 'input_small',
        typeOfInput: 'editable',
        inputPlaceholder: 'Имя пользователя',
    },

    CURRENT_PASSWORD_INPUT_STATE: {
        isError: '',
        id: 'current_password_input',
        inputSize: 'input_small',
        typeOfInput: 'password',
        inputPlaceholder: 'Текущий пароль',
    },

    NEW_PASSWORD_INPUT_STATE: {
        isError: '',
        id: 'new_password_input',
        inputSize: 'input_small',
        typeOfInput: 'password',
        inputPlaceholder: 'Новый пароль',
    },

    REPEAT_PASSWORD_INPUT_STATE: {
        isError: '',
        id: 'repeat_password_input',
        inputSize: 'input_small',
        typeOfInput: 'password',
        inputPlaceholder: 'Повтор пароля',
    },

    BUDGET_INPUT_STATE: {
        isError: '',
        id: 'budget_input',
        inputSize: 'input_small',
        typeOfInput: 'number',
        inputPlaceholder: 'Ваш бюджет на месяц',
    },

    AVATAR: {
        avatar: null,
        textFallback: 'ИП',
        svg: null,
        imageSize: 'image-container_large',
    },

    BUTTON_STATE: {
        id: 'save_profile_button',
        buttonText: 'Сохранить изменения',
        buttonColor: 'button_primary-color',
        buttonSize: 'button_small',
        buttonType: 'button',
    },
};
