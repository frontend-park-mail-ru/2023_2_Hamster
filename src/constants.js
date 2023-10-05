export const ROUTE_CONSTANTS = {
    LOGIN_ROUTE: '/login',
    REGISTRATION_ROUTE: '/registration',
    DASHBOARD_ROUTE: '/dashboard',
    HOME_ROUTE: '',
};

export const API_CONSTANTS = {
    SIGN_IN: '/api/auth/signin',
    SIGN_UP: '/api/auth/signup',
    LOG_OUT: '/api/auth/logout',
    CHECK_AUTH: '/api/auth/checkAuth',
    BALANCE_TAIL: '/balance',
    ACCOUNTS_TAIL: '/account/all',
    ACTUAL_BUDGET_TAIL: '/actualBudget',
    PLANNED_BUDGET_TAIL: '/plannedBudget',
}

export const getBaseURL = (id) => {
    return '/api/user/' + id;
}
