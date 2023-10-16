import { BaseComponent } from '../../baseComponent.js';
import { InputComponent } from '../../atoms/input/input.js';
import { Button } from '../../atoms/button/button.js';
import { signIn, signUp } from '../../../modules/ajax.js';
import { router } from '../../../modules/router.js';
import { ROUTE_CONSTANTS } from '../../../constants.js';

const PASSWORD_MIN_LENGTH = 4;
const PASSWORD_MAX_LENGTH = 64;
const USERNAME_MIN_LENGTH = 4;
const USERNAME_MAX_LENGTH = 20;

const USERNAME_INPUT_STATE = {
    isError: '',
    id: 'username_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Имя пользователя',
};

const PASSWORD_INPUT_STATE = {
    isError: '',
    id: 'password_input',
    inputSize: 'input_small',
    typeOfInput: 'password',
    inputPlaceholder: 'Пароль',
};

const PASSWORD_REPEAT_INPUT_STATE = {
    isError: '',
    id: 'password_repeat_input',
    inputSize: 'input_small',
    typeOfInput: 'password',
    inputPlaceholder: 'Повторите пароль',
};

const BUTTON_STATE = {
    id: 'login_button',
    buttonText: 'Подтвердить',
    buttonSize: 'button_medium',
    buttonColor: 'button_primary-color',
    buttonRadiusSize: 'button_radius-small',
};

const LOGIN_HEADER = 'Вход';
const SIGNUP_HEADER = 'Регистрация';

const DEFAULT_FORM_STATE = {
    header: LOGIN_HEADER,
    helperText: 'Введите данные вашего аккаунта',
};

/**
 * Represents a login or signup form.
 * @class
 */
export class LoginSignUpForm extends BaseComponent {
    /**
     * Submit button.
     * @type {Button}
     */
    #button;

    /**
     * Input field for username.
     * @type {InputComponent}
     */
    #inputUsername;

    /**
     * Input field for password.
     * @type {InputComponent}
     */
    #inputPassword;

    /**
     * Input field for password repeat in case it is signup form.
     * @type {InputComponent}
     */
    #inputPasswordRepeat;

    /**
     * is it login or signup form.
     * @type {Boolean}
     */
    #isLogin;

    /**
     * Creates instance of LoginSignUpForm.
     * @constructor
     * @param {HTMLElement} parent The parent element where the LoginSignUpForm will be rendered.
     * @param {Boolean} [isLogin = true] Determines whether it is a login or signup form.
     * @param {Object} [state = DEFAULT_FORM_STATE] The initial state of form.
     * @param {string} state.header Header text of the form.
     * @param {string} state.helperText Helper text under the header.
     */
    constructor(parent, isLogin = true, state = DEFAULT_FORM_STATE) {
        state.header = isLogin ? state.header : SIGNUP_HEADER;
        super(state, parent);

        this.#isLogin = isLogin;
        this.#inputUsername = new InputComponent(null, USERNAME_INPUT_STATE, this.usernameHandler);
        this.#inputPassword = new InputComponent(null, PASSWORD_INPUT_STATE, this.passwordHandler);
        this.#button = new Button(null, BUTTON_STATE, isLogin ? this.onLogin : this.onRegistration);
        this.#inputPasswordRepeat = new InputComponent(null, PASSWORD_REPEAT_INPUT_STATE, this.passwordRepeatHandler);
    }

    /**
     * Renders the template to the parent element.
     * @method
     */
    renderTemplateToParent() {
        const buttonHTML = this.#button.render();
        const inputUsernameHTML = this.#inputUsername.render();
        const inputPasswordHTML = this.#inputPassword.render();
        const inputPasswordRepeatHTML = this.#isLogin ? '' : this.#inputPasswordRepeat.render();
        const templatesToStateMap = {
            'loginSignupForm.hbs': {
                isSignup: !this.#isLogin,
                ...this.getState(),
                loginButton: buttonHTML,
                userNameInput: inputUsernameHTML,
                passwordInput: inputPasswordHTML,
                passwordRepeatInput: inputPasswordRepeatHTML,
            },
        };
        super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Clears error state and re-renders form based on the component.
     * @method
     * @param {string} component - The component to clear the error state of.
     */
    clearErrorState(component) {
        const noErrorState = {
            isError: false,
            inputHelperText: '',
        };

        switch (component) {
        case 'username':
            this.#inputUsername.setState(noErrorState);
            break;
        case 'password':
            this.#inputPassword.setState(noErrorState);
            break;
        case 'repeatPassword':
            this.#inputPasswordRepeat?.setState(noErrorState);
            break;
        }

        this.saveState();
    }

    /**
     * Saves the current state and re-renders the form.
     * @method
     */
    saveState = () => {
        const username = document.querySelector('#username_input').value;
        const password = document.querySelector('#password_input').value;
        const passwordRepeat = this.#isLogin ? '' : document.querySelector('#password_repeat_input').value;

        this.renderTemplateToParent();

        document.querySelector('#username_input').value = username;
        document.querySelector('#password_input').value = password;
        if (!this.#isLogin) {
            document.querySelector('#password_repeat_input').value = passwordRepeat;
        }
    };

    /**
     * Checks if the username meets the specific criteria.
     * @method
     * @private
     * @param {string} username - The username to check.
     * @returns {Object} An object containing the result of the checks.
     */
    #checkUsername = (username) => ({
        hasEnglish: /[a-zA-Z]/.test(username),
        isWithinLength: username.length >= USERNAME_MIN_LENGTH && username.length <= USERNAME_MAX_LENGTH,
    });

    /**
     * Validates the username.
     * @method
     * @private
     * @param {string} username - The username to validate.
     * @returns {boolean} True if the username is valid, false otherwise.
     */
    #isUsernameValid = (username) => {
        const failedCheck = Object.entries(this.#checkUsername(username))
            .reduce((failedCheck, [key, value]) => {
                if (!value) {
                    let errorMessage;
                    switch (key) {
                    case 'hasEnglish':
                        errorMessage = 'Имя пользователя может включать только символы английского языка';
                        break;
                    case 'isWithinLength':
                        errorMessage = 'Имя пользователя должно быть от 4 до 32 символов в длину';
                        break;
                    }

                    return {
                        errorMessage,
                        key,
                    };
                }

                return failedCheck;
            }, null);

        if (failedCheck) {
            this.#inputUsername.setState({
                isError: 'error',
                inputHelperText: failedCheck.errorMessage,
            });

            return false;
        }

        return true;
    };

    /**
     * Checks if the password meets the specific criteria.
     * @method
     * @private
     * @param {string} password - The password to check.
     * @returns {Object} An object containing the result of the checks.
     */
    #checkPassword = (password) => ({
        hasLowerCase: /[a-z]/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&]/.test(password),
        isWithinLength: password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH,
    });

    /**
     * Validates the password.
     * @method
     * @private
     * @param {string} password - The password to validate.
     * @returns {boolean} True if the password is valid, false otherwise.
     */
    #isPasswordValid = (password) => {
        const failedCheck = Object.entries(this.#checkPassword(password))
            .reduce((failedCheck, [key, value]) => {
                if (!value) {
                    let errorMessage;
                    switch (key) {
                    case 'hasLowerCase':
                        errorMessage = 'Пароль должен содержать минимум одну прописную букву';
                        break;
                    case 'hasUpperCase':
                        errorMessage = 'Пароль должен содержать минимум одну строчную букву';
                        break;
                    case 'hasDigit':
                        errorMessage = 'Пароль должен содержать минимум одну цифру';
                        break;
                    case 'hasSpecialChar':
                        errorMessage = 'Пароль должен содержать минимум один специальный символ';
                        break;
                    case 'isWithinLength':
                        errorMessage = 'Пароль должен быть от 8 до 64 символов в длину';
                        break;
                    }
                    return {
                        errorMessage,
                        key,
                    };
                }
                return failedCheck;
            }, null);

        if (failedCheck) {
            this.#inputPassword.setState({
                isError: 'error',
                inputHelperText: failedCheck.errorMessage,
            });

            return false;
        }

        return true;
    };

    /**
     * Checks if the repeated password matches the original password.
     * @method
     * @private
     * @param {string} password - The original password.
     * @param {string} passwordRepeat - The repeated password.
     * @returns {boolean} True if the passwords match, false otherwise.
     */
    #isPasswordRepeat = (password, passwordRepeat) => {
        if (password !== passwordRepeat) {
            this.#inputPasswordRepeat.setState({
                isError: 'error',
                inputHelperText: 'Пароли не совпадают',
            });

            return false;
        }

        return true;
    };

    /**
     * Handles click on submit button if form is signup
     * @async
     * @method
     */
    onRegistration = async () => {
        this.clearErrorState();

        const username = document.querySelector('#username_input').value;
        let allInputValid = this.#isUsernameValid(username);

        const password = document.querySelector('#password_input').value;
        allInputValid = allInputValid && this.#isPasswordValid(password);

        const repeatPassword = document.querySelector('#password_repeat_input').value;
        allInputValid = allInputValid && this.#isPasswordRepeat(password, repeatPassword);

        if (!allInputValid) {
            this.saveState();
        } else {
            try {
                const response = await signUp({
                    username,
                    password,
                });
                router.isAuthorised = true;
                router.username = response.username;
                router.id = response.id;
                router.navigateTo(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
            } catch (error) {
                this.#inputUsername.setState({
                    isError: 'error',
                    inputHelperText: 'Ошибка при регистрации',
                });
                console.log('Error: ', error);
            }
        }
    };

    /**
     * Handles click on submit button if form is login
     * @async
     * @method
     */
    onLogin = async () => {
        this.clearErrorState();

        const username = document.querySelector('#username_input').value;
        let allInputValid = this.#isUsernameValid(username);

        const password = document.querySelector('#password_input').value;
        allInputValid = allInputValid && this.#isPasswordValid(password);

        if (!allInputValid) {
            this.saveState();
        } else {
            try {
                const response = await signIn({
                    username,
                    password,
                });
                router.isAuthorised = true;
                router.username = response.username;
                router.id = response.id;
                router.navigateTo(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
            } catch (error) {
                this.#inputUsername.setState({
                    isError: 'error',
                    inputHelperText: 'Ошибка при авторизации',
                });
                console.log('Error: ', error);
            }
        }
    };

    /**
     * Handles the username input field blur event.
     * @method
     */
    usernameHandler = () => {
        this.clearErrorState('username');

        const username = document.querySelector('#username_input').value;

        if (!this.#isUsernameValid(username)) {
            this.saveState();
        }
    };

    /**
     * Handles the password input field blur event.
     * @method
     */
    passwordHandler = () => {
        this.clearErrorState('password');

        const password = document.querySelector('#password_input').value;

        if (!this.#isPasswordValid(password)) {
            this.saveState();
        }
    };

    /**
     * Handles the password repeat input field blur event in case it is signup form.
     * @method
     */
    passwordRepeatHandler = () => {
        this.clearErrorState('passwordRepeat');

        const password = document.querySelector('#password_input').value;
        const passwordRepeat = document.querySelector('#password_repeat_input').value;

        if (!this.#isPasswordRepeat(password, passwordRepeat)) {
            this.saveState();
        }
    };

    /**
     * Sets event handlers for the form. Adds 'blur' event handlers for the username and password fields,
     * and if it's a signup form, for the password repeat field as well.
     * @method
     */
    setHandlers() {
        const button = document.querySelector('#login_button');
        button.addEventListener('click', this.#button.getHandler());

        const username = document.querySelector('#username_input');
        username.addEventListener('blur', this.#inputUsername.getHandler());

        const password = document.querySelector('#password_input');
        password.addEventListener('blur', this.#inputPassword.getHandler());

        if (!this.#isLogin) {
            const passwordRepeat = document.querySelector('#password_repeat_input');
            passwordRepeat.addEventListener('blur', this.#inputPasswordRepeat.getHandler());
        }
    }
}
