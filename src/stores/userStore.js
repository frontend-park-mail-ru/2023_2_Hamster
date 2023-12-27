import {
    STATUS_CODES, EVENT_TYPES, USER_STORE, ROUTE_CONSTANTS
} from '@constants/constants';
import {
    BUDGET_RULES, LOGIN_RULES, NOT_NULL_RULE, PASSWORD_RULES, PROFILE_NAME_RULES, USERNAME_RULES
} from '@constants/validation';
import { authApi } from '@api/auth';
import { userApi } from '@api/user';
import { router } from '@router';
import { transactionsApi } from '@api/transaction';
import { validator } from '../modules/validator.js';

import BaseStore from './baseStore.js';

/**
 * UserStore is a class for managing user state of the site. It extends the BaseStore class and
 * provides methods for authentication (login, registration, logout, and checking if session for this user is on),
 * routing (login and registration routes), and validation (username and password validation).
 *
 * @class
 * @extends BaseStore
 */
class UserStore extends BaseStore {

    /**
     * Creates an instance of UserStore.
     *
     * @constructor
     * @property {Object} storage - An object that contains the state of the user.
     * @property {Object} storage.loginState - The current login state.
     * @property {Object} storage.registrationState - The current registration state.
     * @property {Object} storage.user - An object representing the current user.
     * @property {string|null} storage.error - An error message, if any.
     */
    constructor() {
        super();
        this.storage = {
            loginState: USER_STORE.LOGIN_STATE,
            registrationState: USER_STORE.REGISTRATION_STATE,
            user: {},
            error: null,
        };
        this.inputs = {};
    }

    /**
     * Checks if session for user is on.
     *
     * @async
     * @function
     */
    checkAuth = async () => {
        try {
            const response = await authApi.checkAuth();
            this.storage.user = {
                login: response.body.login,
                username: response.body.username,
                id: response.body.id,
                isAuthorised: true,
            };

            const getUser = await userApi.getUser();
            this.storage.user.avatarPath = getUser.body.avatar_url;
        } catch (error) {
            this.storage.user.isAuthorised = false;
        }
    };

    /**
     * Authenticates a user.
     *
     * @async
     * @function
     * @param {Object} data - The user's credentials.
     */
    login = async (data) => {
        if (validator(data.login, LOGIN_RULES).isError
            || validator(data.password, PASSWORD_RULES).isError) {

            this.isLoginValid(data);
            this.isPasswordValid(data);

            return;
        }

        try {
            const response = await authApi.signIn(data);
            this.storage.user = {
                login: data.login,
                username: response.body.username,
                id: response.body.id,
                isAuthorised: true,
            };

            const getUser = await userApi.getUser();
            this.storage.user.avatarPath = getUser.body.avatar_url;

            await this.emitChange(EVENT_TYPES.LOGIN_SUCCESS);
        } catch (error) {
            this.storage.loginInputState = { login: data.login, isError: true };

            switch (error.status) {
            case STATUS_CODES.FORBIDDEN:
            case STATUS_CODES.NOT_FOUND:
                this.storage.loginInputState.inputHelperText = 'Неверный логин или пароль';
                break;

            default:
                console.log('Unable to connect to the server, error: ', error);
                this.storage.loginInputState.inputHelperText = 'Непредвиденная ошибка';
            }

            this.emitChange(EVENT_TYPES.LOGIN_ERROR);
        }
    };

    /**
     * Registers a new user.
     *
     * @async
     * @function
     * @param {Object} data - The new user's information.
     */
    registration = async (data) => {
        if (validator(data.login, LOGIN_RULES).isError
            || validator(data.password, PASSWORD_RULES).isError
            || validator(data.username, USERNAME_RULES).isError
            || validator(data.passwordRepeat, PASSWORD_RULES).isError) {

            this.isLoginValid(data);
            this.isPasswordValid(data);
            this.isUsernameValid(data);
            this.isPasswordRepeat(data);

            return;
        }

        try {
            const response = await authApi.signUp(data);
            this.storage.user = {
                login: data.login,
                username: response.body.username,
                id: response.body.id,
                isAuthorised: true,
            };

            const getUser = await userApi.getUser();
            this.storage.user.avatarPath = getUser.body.avatar_url;

            await this.emitChange(EVENT_TYPES.REGISTRATION_SUCCESS);
        } catch (error) {
            this.storage.loginInputState = { login: data.login, isError: true };

            switch (error.status) {
            case STATUS_CODES.BAD_REQUEST:
                this.storage.loginInputState.inputHelperText = 'Неккоректные данные';
                break;
            case STATUS_CODES.CONFLICT:
                this.storage.loginInputState.inputHelperText = 'Данный логин уже занят';
                break;
            case STATUS_CODES.TOO_MANY_REQUESTS:
            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage.loginInputState.inputHelperText = 'Непредвиденная ошибка, уже работаем над этим';
                break;
            default:
                console.log('Undefined status code', error.status);
                this.storage.error = 'Непредвиденная ошибка';
            }

            this.emitChange(EVENT_TYPES.REGISTRATION_ERROR);
        }
    };

    /**
     * Logs the user out.
     *
     * @async
     * @function
     */
    logout = async () => {
        let response;

        try {
            response = await authApi.logOut();

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.user = {
                    username: response.body.username,
                    id: response.body.id,
                    isAuthorised: false,
                };
                this.storage.error = null;

                break;

            case STATUS_CODES.BAD_REQUEST:
                this.storage.user = {
                    isAuthorised: false,
                };
                this.storage.error = response.message;

                break;

            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage.user = {
                    isAuthorised: false,
                };
                this.storage.error = 'Ошибка на сервере';

                break;

            default:
                console.log('Undefined status code', response.status);
            }

            await router.navigateTo(ROUTE_CONSTANTS.LOGIN_ROUTE, false);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    /**
     * Gets feed for specific user.
     *
     * @async
     * @function
     */
    feed = async () => {
        try {
            const response = await userApi.getFeed();
            const getUser = await userApi.getUser();

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.feed = {
                    accounts: response.body.accounts,
                    balance: response.body.balance,
                    actualBudget: response.body.actual_budget,
                    plannedBudget: response.body.planned_budget,
                };
                this.storage.user.avatarPath = getUser.body.avatar_url;

                this.storage.error = null;

                break;

            case STATUS_CODES.BAD_REQUEST:
            case STATUS_CODES.UNAUTHORISED:
            case STATUS_CODES.FORBIDDEN:
            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage.error = response.message;

                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    /**
     * Checks if a login is valid.
     *
     * @function
     * @param {Object} data - The username to validate.
     * @param {string} data.login - The username to validate.
     */
    isLoginValid = (data) => {
        const result = validator(data.login, LOGIN_RULES);

        this.storage = {
            ...this.storage,
            loginInputState: {
                login: data.login,
                isError: result.isError,
                inputHelperText: result.message,
            },
        };

        this.emitChange(EVENT_TYPES.RERENDER_LOGIN_INPUT);
    };

    /**
     * Checks if a username is valid.
     *
     * @function
     * @param {Object} data - The username to validate.
     * @param {string} data.username - The username to validate.
     */
    isUsernameValid = (data) => {
        const result = validator(data.username, USERNAME_RULES);

        this.storage = {
            ...this.storage,
            usernameState: {
                username: data.username,
                isError: result.isError,
                inputHelperText: result.message,
            },
        };

        this.emitChange(EVENT_TYPES.RERENDER_USERNAME_INPUT);
    };

    /**
     * Checks if a password is valid.
     *
     * @function
     * @param {Object} data - The password to validate.
     * @param {string} data.password - The password to validate.
     */
    isPasswordValid = (data) => {
        const result = validator(data.password, PASSWORD_RULES);

        this.storage = {
            ...this.storage,
            passwordState: {
                password: data.password,
                isError: result.isError,
                inputHelperText: result.message,
            },
        };

        this.emitChange(EVENT_TYPES.RERENDER_PASSWORD_INPUT);
    };

    /**
     * Checks if a repeated password is equals to original.
     *
     * @function
     * @param {Object} data - The passwords to check.
     * @param {string} data.password - The original password.
     * @param {string} data.passwordRepeat - The repeated password.
     */
    isPasswordRepeat = ({
        password,
        passwordRepeat,
    }) => {
        const result = password === passwordRepeat;

        this.storage = {
            ...this.storage,
            repeatState: {
                passwordRepeat,
                isError: result ? null : true,
                inputHelperText: result ? null : 'Пароли не совпадают',
            },
        };

        this.emitChange(EVENT_TYPES.RERENDER_REPEAT_INPUT);
    };

    /**
     * Update user profile.
     *
     * @async
     * @function
     * @param {Object} data - The user's updated information.
     */
    updateProfile = async (data) => {
        if (!this.profileUpdateError(data)) {
            try {
                await userApi.putUpdate({ planned_budget: parseFloat(data.plannedBudget), username: data.username });

                if (data.username !== this.storage.user.username) {
                    this.inputs.nameInput = { isSuccess: true, inputHelperText: 'Успешно!' };
                }

                if (parseFloat(data.plannedBudget) !== parseFloat(this.storage.feed.plannedBudget)) {
                    this.inputs.budgetInput = { isSuccess: true, inputHelperText: 'Успешно!' };
                }

                this.notify = { success: true, notifierText: 'Профиль обновлен' };

                this.storage.feed.plannedBudget = data.plannedBudget;
                this.storage.user.username = data.username;
            } catch (response) {
                this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не смогли обновить профиль' };
            }
        }

        this.emitChange(EVENT_TYPES.RERENDER_PROFILE);
        this.clearInputsState();
    };

    updatePassword = async (data) => {
        if (!this.passwordUpdateError(data)) {
            try {
                await authApi.changePassword({ new_password: data.newPassword, old_password: data.oldPassword });

                this.inputs.oldPasswordInput = { value: '', isSuccess: true };
                this.inputs.newPasswordInput = { value: '', isSuccess: true };
                this.inputs.repeatPasswordInput = { value: '', isSuccess: true, inputHelperText: 'Успешно!' };

                this.notify = { success: true, notifierText: 'Пароль изменен' };
            } catch (response) {
                this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не смогли сменить пароль' };
            }
        }

        this.emitChange(EVENT_TYPES.RERENDER_PROFILE);
        this.clearInputsState();
    };

    profileUpdateError = (data) => {
        const nameValidation = validator(data.username, PROFILE_NAME_RULES);
        const budget = validator(data.plannedBudget, BUDGET_RULES);

        this.inputs.nameInput = {
            value: data.username,
            isError: nameValidation.isError,
            isSuccess: false,
            inputHelperText: nameValidation.message,
        };

        this.inputs.budgetInput = {
            value: data.plannedBudget,
            isError: budget.isError,
            isSuccess: false,
            inputHelperText: budget.message,
        };

        return nameValidation.isError || budget.isError;
    };

    passwordUpdateError = (data) => {
        const newPassword = validator(data.newPassword, PASSWORD_RULES);
        const oldPassword = validator(data.oldPassword, NOT_NULL_RULE);

        this.inputs.oldPasswordInput = {
            value: data.oldPassword,
            isError: oldPassword.isError,
            isSuccess: false,
            inputHelperText: oldPassword.message,
        };

        this.inputs.newPasswordInput = {
            value: data.newPassword,
            isError: newPassword.isError,
            isSuccess: false,
            inputHelperText: newPassword.message,
        };

        if (data.newPassword !== data.repeatPassword) {
            this.inputs.repeatPasswordInput = {
                value: data.repeatPassword,
                isError: true,
                isSuccess: false,
                inputHelperText: 'Пароли не совпадают',
            };
        }

        return newPassword.isError || this.inputs.repeatPasswordInput.isError;
    };

    clearInputsState = () => {
        this.inputs.nameInput = {
            isSuccess: false, value: this.storage.user.username, isError: false, inputHelperText: ''
        };
        this.inputs.budgetInput = {
            isSuccess: false, value: this.storage.feed.plannedBudget, isError: false, inputHelperText: ''
        };
        this.inputs.oldPasswordInput = { isSuccess: false, isError: false, inputHelperText: '' };
        this.inputs.newPasswordInput = { isSuccess: false, isError: false, inputHelperText: '' };
        this.inputs.repeatPasswordInput = { isSuccess: false, isError: false, inputHelperText: '' };
    };

    updateAvatar = async (data) => {
        try {
            const response = await userApi.putAvatar(data.file, this.storage.user.avatarPath);

            this.storage.user.avatarPath = response.body.path;
            this.storage.error = null;

            this.notify = { success: true, notifierText: 'Аватар сменился' };
        } catch (error) {
            this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не смогли установить аватар' };
        }

        this.emitChange(EVENT_TYPES.RERENDER_PROFILE);
    };

    csvExport = async () => {
        try {
            const response = await transactionsApi.csvExport();

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            this.notify = { success: true, notifierText: 'CSV файл был экспортирован!' };
        } catch (error) {
            this.notify = { error: true, notifierText: 'Не получается скачать CSV файл, возникла ошибка на сервере' };
        }
    };

    csvImport = async (data) => {
        try {
            await transactionsApi.csvImport(data);

            this.notify = { success: true, notifierText: 'CSV файл успешно импортирвоан!' };
        } catch (error) {
            this.notify.error = true;

            switch (error.status) {
            case STATUS_CODES.BAD_REQUEST:
                this.notify.notifierText = 'Не корректный формат данных, не смогли импортировать файл';
                break;
            case STATUS_CODES.CONTENT_TOO_LARGE:
                this.notify.notifierText = 'Файл слишком большой, не смогли импортировать файл';
                break;
            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.notify.notifierText = 'Сервер не доступен';
                break;
            default:
                this.notify.notifierText = 'Возникла непредвиденная ошибка, не смогли импортировать файл';
            }
        }

        this.emitChange(EVENT_TYPES.RERENDER_PROFILE);
    };
}

export const userStore = new UserStore();
