export const ROUTE_CONSTANTS = {
    LOGIN_ROUTE: '/login',
    REGISTRATION_ROUTE: '/registration',
    DASHBOARD_ROUTE: '/dashboard',
    HOME_ROUTE: '',
};

const SERVER_PREFIX = 'http://84.23.52.156';

export const API_CONSTANTS = {
    SIGN_IN: SERVER_PREFIX + '/api/auth/signin',
    SIGN_UP: SERVER_PREFIX + '/api/auth/signup',
    LOG_OUT: SERVER_PREFIX + '/api/auth/logout',
    CHECK_AUTH: SERVER_PREFIX + '/api/auth/checkAuth',
    BALANCE_TAIL: '/balance',
    ACCOUNTS_TAIL: '/account/all',
    ACTUAL_BUDGET_TAIL: '/actualBudget',
    PLANNED_BUDGET_TAIL: '/plannedBudget',
}

export const getBaseURL = (id) => {
    return SERVER_PREFIX + '/api/user/' + id;
}
