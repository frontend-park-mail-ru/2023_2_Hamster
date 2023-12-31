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

    async getFeed() {
        await dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.API_FEED,
            data: {},
        });
    },

    async register(login, username, password, passwordRepeat) {
        await dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.API_REGISTRATION,
            data: {
                login,
                username,
                password,
                passwordRepeat,
            },
        });
    },

    async login(login, password) {
        await dispatcher.dispatch({
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

    validateRepeatPassword(password, passwordRepeat) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.VALIDATE_REPEAT,
            data: {
                password,
                passwordRepeat,
            },
        });
    },

    updateProfile(plannedBudget, username) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.UPDATE_PROFILE,
            data: {
                plannedBudget,
                username,
            }
        });
    },

    updatePassword(newPassword, oldPassword, repeatPassword) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.UPDATE_PASSWORD,
            data: {
                oldPassword,
                newPassword,
                repeatPassword,
            }
        });
    },

    updateAvatar(filename) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.UPDATE_AVATAR,
            data: {
                file: filename,
            },
        });
    },

    csvExport() {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.EXPORT_CSV,
            data: {},
        });
    },

    csvImport(file) {
        dispatcher.dispatch({
            type: USER_ACTIONS_TYPES.IMPORT_CSV,
            data: {
                file
            },
        });
    },
};
