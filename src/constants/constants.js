import IMAGE_URL from '@images/peopleLoginReg.svg';

export const ROUTE_CONSTANTS = {
    LOGIN_ROUTE: '/login',
    REGISTRATION_ROUTE: '/registration',
    DASHBOARD_ROUTE: '/dashboard',
    HOME_ROUTE: '',
    NOT_FOUND: '/404',
};

const SERVER_PREFIX = 'https://84.23.52.156';

export const API_CONSTANTS = {
    SIGN_IN: `${SERVER_PREFIX}/api/auth/signin`,
    SIGN_UP: `${SERVER_PREFIX}/api/auth/signup`,
    LOG_OUT: `${SERVER_PREFIX}/api/auth/logout`,
    CHECK_AUTH: `${SERVER_PREFIX}/api/auth/checkAuth`,

    FEED_TAIL: '/feed',
    BALANCE_TAIL: '/balance',
    ACCOUNTS_TAIL: '/account/all',
    ACTUAL_BUDGET_TAIL: '/actualBudget',
    PLANNED_BUDGET_TAIL: '/plannedBudget',
};

export const getBaseURL = (id) => `${SERVER_PREFIX}/api/user/${id}`;

export const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
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
    FEED_STATE:{
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
    }
};
