import { USER_ACTIONS_TYPES } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const userActions = {
    routeRegistration() {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.ROUTE_REGISTRATION,
            data: {},
        });
    },

    routeLogin() {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.ROUTE_LOGIN,
            data: {},
        });
    },

    getFeed() {
        dispatcher.dispatch({
           type: USER_ACTIONS_TYPES.API_FEED,
           data: {},
        });
    },

    register(login, username, password, passwordRepeat) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.API_REGISTRATION,
            data: {
                login,
                username,
                password,
                passwordRepeat,
            },
        });
    },

    login(login, password) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.API_LOGIN,
            data: {
                login,
                password,
            },
        });
    },

    logout() {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.API_LOGOUT,
            data: {},
        });
    },

    validateLogin(login) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.VALIDATE_LOGIN,
            data: { login },
        });
    },

    validateUsername(username) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.VALIDATE_USERNAME,
            data: { username },
        });
    },

    validatePassword(password) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.VALIDATE_PASSWORD,
            data: { password },
        });
    },

    validateRepeatPassword(password, repeatPassword) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.VALIDATE_REPEAT,
            data: {
                password,
                repeatPassword,
            },
        });
    },

    updateProfile(planned_budget, username) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.UPDATE_PROFILE,
            data: {
                planned_budget,
                username,
            },
        });
    }
};
