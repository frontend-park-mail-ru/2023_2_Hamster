import { userStore } from '@stores/userStore.js';

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
];
