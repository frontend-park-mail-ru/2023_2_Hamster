import {
    STATUS_CODES, EVENT_TYPES, USER_STORE, ROUTE_CONSTANTS
} from '@constants/constants';
import { LOGIN_RULES, PASSWORD_RULES, USERNAME_RULES } from '@constants/validation';
import { authApi } from '@api/auth';
import { userApi } from '@api/user';
import { router } from '@router';
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
            user: {
                login: 'Ваш логин',
            },
            error: null,
        };
    }

    /**
     * Checks if session for user is on.
     *
     * @async
     * @function
     */
    checkAuth = async () => {
        let response;

        try {
            response = await authApi.checkAuth();

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.user = {
                    login: response.body.login,
                    username: response.body.username,
                    id: response.body.id,
                    isAuthorised: true,
                };
                this.storage.error = null;
                this.storeChanged = true;

                break;

            case STATUS_CODES.UNAUTHORISED:
                this.storage.error = 'Не авторизован';
                this.storeChanged = true;
                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
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
        if (this.validator(data.login, LOGIN_RULES).isError
            || this.validator(data.password, PASSWORD_RULES).isError) {

            this.isLoginValid(data);
            this.isPasswordValid(data);

            return;
        }

        try {
            const response = await authApi.signIn(data);

            switch (response.status) {
            case STATUS_CODES.ACCEPTED:
                this.storage.user = {
                    login: response.body.login,
                    username: response.body.username,
                    id: response.body.id,
                    isAuthorised: true,
                };
                this.storage.error = null;
                this.storeChanged = true;

                await this.emitChange(EVENT_TYPES.LOGIN_SUCCESS);
                break;

            case STATUS_CODES.TOO_MANY_REQUESTS:
                this.storage = {
                    ...this.storage,
                    loginInputState: {
                        login: data.login,
                        isError: true,
                        inputHelperText: 'Неверное логин или пароль',
                    },
                };

                this.storeChanged = true;

                this.emitChange(EVENT_TYPES.LOGIN_ERROR);
                break;

            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage = {
                    ...this.storage,
                    loginInputState: {
                        login: data.login,
                        isError: true,
                        inputHelperText: 'Непредвиденная ошибка',
                    },
                };

                this.storeChanged = true;

                this.emitChange(EVENT_TYPES.LOGIN_ERROR);
                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
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
        if (this.validator(data.login, LOGIN_RULES).isError
            || this.validator(data.password, PASSWORD_RULES).isError
            || this.validator(data.username, USERNAME_RULES).isError
            || this.validator(data.passwordRepeat, PASSWORD_RULES).isError) {

            this.isLoginValid(data);
            this.isPasswordValid(data);
            this.isUsernameValid(data);
            this.isPasswordRepeat(data);

            return;
        }

        try {
            const response = await authApi.signUp(data);

            switch (response.status) {
            case STATUS_CODES.ACCEPTED:
                this.storage.user = {
                    login: response.body.login,
                    username: response.body.username,
                    id: response.body.id,
                    isAuthorised: true,
                };
                this.storage.error = null;
                this.storeChanged = true;

                await this.emitChange(EVENT_TYPES.REGISTRATION_SUCCESS);
                break;

            case STATUS_CODES.UNAUTHORISED:
                this.storage.error = 'Данное логин пользователя уже занят';
                this.storeChanged = true;

                this.emitChange(EVENT_TYPES.REGISTRATION_ERROR);
                break;

            case STATUS_CODES.TOO_MANY_REQUESTS:
                this.storage = {
                    ...this.storage,
                    loginInputState: {
                        login: data.login,
                        isError: true,
                        inputHelperText: 'Данный логин уже занят',
                    },
                };

                this.storeChanged = true;

                this.emitChange(EVENT_TYPES.REGISTRATION_ERROR);
                break;

            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage = {
                    ...this.storage,
                    loginInputState: {
                        login: data.login,
                        isError: true,
                        inputHelperText: 'Непредвиденная ошибка, уже работаем над этим',
                    },
                };

                this.storeChanged = true;

                this.emitChange(EVENT_TYPES.REGISTRATION_ERROR);
                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
            this.storage.error = 'Непредвиденная ошибка';
            this.storeChanged = true;
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
                this.storeChanged = true;
                break;

            case STATUS_CODES.BAD_REQUEST:
                this.storage.user = {
                    isAuthorised: false,
                };
                this.storage.error = response.message;
                this.storeChanged = true;
                break;

            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage.user = {
                    isAuthorised: false,
                };
                this.storage.error = 'Ошибка на сервере';
                this.storeChanged = true;
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

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.user.feed = {
                    accounts: response.body.accounts,
                    balance: response.body.balance,
                    actualBudget: response.body.actual_budget,
                    plannedBudget: response.body.planned_budget,
                };

                this.storage.error = null;
                this.storeChanged = true;
                break;

            case STATUS_CODES.BAD_REQUEST:
            case STATUS_CODES.UNAUTHORISED:
            case STATUS_CODES.FORBIDDEN:
            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage.error = response.message;
                this.storeChanged = true;
                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    /**
     * Validates a data against a set of rules.
     *
     * @function
     * @param {string} data - The data to be validated.
     * @param {Array.<Object>} rules - The validation rules.
     * @param {RegExp} rules.regex - The regex to test the data against.
     * @param {string} rules.message - The message to return if the data fails the validation.
     * @returns {Object} The validation result.
     * isError - Indicates if there was an error during validation.
     * message - The validation message.
     */
    validator(data, rules) {
        const failedRule = rules.find((condition) => !condition.regex.test(data));

        if (failedRule) {
            return {
                isError: true,
                message: failedRule.message,
            };
        }

        return {
            isError: false,
            message: null,
        };
    }

    /**
     * Checks if a login is valid.
     *
     * @function
     * @param {Object} data - The username to validate.
     * @param {string} data.login - The username to validate.
     */
    isLoginValid = (data) => {
        const result = this.validator(data.login, LOGIN_RULES);

        this.storage = {
            ...this.storage,
            loginInputState: {
                login: data.login,
                isError: result.isError,
                inputHelperText: result.message,
            },
        };

        this.storeChanged = true;

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
        const result = this.validator(data.username, USERNAME_RULES);

        this.storage = {
            ...this.storage,
            usernameState: {
                username: data.username,
                isError: result.isError,
                inputHelperText: result.message,
            },
        };

        this.storeChanged = true;

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
        const result = this.validator(data.password, PASSWORD_RULES);

        this.storage = {
            ...this.storage,
            passwordState: {
                password: data.password,
                isError: result.isError,
                inputHelperText: result.message,
            },
        };

        this.storeChanged = true;

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

        this.storeChanged = true;
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
        try {
            const response = await userApi.putUpdate(data);

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.user.feed.plannedBudget = data.planned_budget;
                this.storage.error = null;
                this.storeChanged = true;
                break;

            case STATUS_CODES.BAD_REQUEST:
            case STATUS_CODES.UNAUTHORISED:
            case STATUS_CODES.FORBIDDEN:
            case STATUS_CODES.INTERNAL_SERVER_ERROR:
                this.storage.error = response.message;
                this.storeChanged = true;
                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };
}

export const userStore = new UserStore();
