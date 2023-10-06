import {BaseComponent} from "../../baseComponent.js";
import {InputComponent} from "../../atoms/input/input.js";
import {Button} from "../../atoms/button/button.js"
import {signIn, signUp} from "../../../modules/ajax.js";
import {router} from "../../../modules/router.js";
import {ROUTE_CONSTANTS} from "../../../constants.js";

const PASSWORD_MIN_LENGTH = 4;
const PASSWORD_MAX_LENGTH = 64;
const USERNAME_MIN_LENGTH = 4;
const USERNAME_MAX_LENGTH = 32;

const USERNAME_REGEX = /\w+/

const USERNAME_INPUT_STATE = {
    isError: '',
    id: 'username_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Имя пользователя',
}

const PASSWORD_INPUT_STATE = {
    isError: '',
    id: 'password_input',
    inputSize: 'input_small',
    typeOfInput: 'password',
    inputPlaceholder: 'Пароль',
}

const PASSWORD_REPEAT_INPUT_STATE = {
    isError: '',
    id: 'password_repeat_input',
    inputSize: 'input_small',
    typeOfInput: 'password',
    inputPlaceholder: 'Повторите пароль',
}

const BUTTON_STATE = {
    id: "login_button",
    buttonText: 'Подтвердить',
    buttonSize: 'button_small',
    buttonColor: 'button_primary-color',
}

const LOGIN_HEADER = "Вход";
const SIGNUP_HEADER = "Регистрация";

const DEFAULT_FORM_STATE = {
    header: LOGIN_HEADER,
    helperText: "Введите данные вашего аккаунта",
}

/**
 * Represents a login or signup form.
 * @class
 */
export class LoginSignUpForm extends BaseComponent {
    /**
     * Submit button.
     * @type {Button}
     */
    #button

    /**
     * Input field for username.
     * @type {InputComponent}
     */
    #inputUsername

    /**
     * Input field for password.
     * @type {InputComponent}
     */
    #inputPassword

    /**
     * Input field for password repeat in case it is signup form.
     * @type {InputComponent}
     */
    #inputPasswordRepeat

    /**
     * is it login or signup form.
     * @type {Boolean}
     */
    #isLogin

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
        state.header = isLogin ? state.header : "Регистрация"
        super(state, parent);

        this.#isLogin = isLogin
        this.#inputUsername = new InputComponent(null, USERNAME_INPUT_STATE);
        this.#inputPassword = new InputComponent(null, PASSWORD_INPUT_STATE);
        this.#button = new Button(null, BUTTON_STATE, isLogin ? this.onLogin : this.onRegistration);
        this.#inputPasswordRepeat = new InputComponent(null, PASSWORD_REPEAT_INPUT_STATE)
    }

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
            }
        }
        super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Clear errors and re-render form
     */
    clearErrorState() {
        const noErrorState = {
            isError: false,
            inputHelperText: ''
        }
        this.#inputUsername.setState(noErrorState);
        this.#inputPassword.setState(noErrorState);
        this.#inputPasswordRepeat?.setState(noErrorState);

        this.saveState();
    }

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
    }

    #checkUsername = (username) => {
        return {
            hasEnglish: /[a-zA-Z]/.test(password),
            isWithinLength: password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH
        };
    };

    #isValidUsername = (username) => {
        const failedCheck = Object.entries(this.#checkUsername(username)).reduce((failedCheck, [key, value]) => {
            if (!value) {
                let errorMessage;
                switch (key) {
                    case 'hasEnglish':
                        errorMessage = 'Имя пользователя может включать символы только английского языка';
                        break;
                    case 'isWithinLength':
                        errorMessage = 'Имя пользователя должно быть от 4 до 32 символов в длину';
                        break;
                }
                return {errorMessage, key};
            }
            return failedCheck;
        }, null);

        if (failedCheck) {
            this.#inputUsername.setState({
                isError: 'error',
                inputHelperText: failedCheck.errorMessage
            });

            return false;
        }

        return true;
    }

    #checkPassword = (password) => {
        return {
            hasLowerCase: /[a-z]/.test(password),
            hasUpperCase: /[A-Z]/.test(password),
            hasDigit: /\d/.test(password),
            hasSpecialChar: /[@$!%*?&]/.test(password),
            isWithinLength: password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH
        };
    };

    #isPasswordValid = (password) => {
        const failedCheck = Object.entries(this.#checkPassword(password)).reduce((failedCheck, [key, value]) => {
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
                return {errorMessage, key};
            }
            return failedCheck;
        }, null);

        if (failedCheck) {
            this.#inputPassword.setState({
                isError: 'error',
                inputHelperText: failedCheck.errorMessage
            });

            return false;
        }

        return true;
    }

    #isPasswordRepeat = (password, passwordRepeat) => {
        if (password !== passwordRepeat) {
            this.#inputPasswordRepeat.setState({
                isError: 'error',
                inputHelperText: 'Пароли не совпадают',
            });

            return false;
        }

        return true;
    }

    /**
     * Handles click on submit button if form is signup
     */
    onRegistration = async () => {
        this.clearErrorState()

        const username = document.querySelector('#username_input').value;
        let allInputValid = this.#isValidUsername(username);

        const password = document.querySelector('#password_input').value;
        allInputValid = allInputValid && this.#isPasswordValid(password);

        const repeatPassword = document.querySelector('#password_repeat_input').value;
        allInputValid = allInputValid && this.#isPasswordRepeat(password, repeatPassword);

        if (!allInputValid) {
            this.saveState();
        } else {
            try {
                const response = await signUp({username: username, password: password});
                router.isAuthorised = true;
                router.username = response.username;
                router.id = response.id;
                router.navigateTo(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
            } catch (error) {
                this.#inputUsername.setState({
                    isError: 'error',
                    inputHelperText: error.message ? error.message : 'An error occurred',
                });
                console.log('Error: ', error);
            }
        }
    }

    setLogin(isLogin) {
        this.clearErrorState()
        this.#isLogin = isLogin;
        this.setState({header: isLogin ? LOGIN_HEADER : SIGNUP_HEADER});
        this.#button.setHandler(isLogin ? this.onLogin : this.onRegistration);
    }

    getLogin() {
        return this.#isLogin;
    }

    /**
     * Handles click on submit button if form is login
     */
    onLogin = async () => {
        this.clearErrorState()

        const username = document.querySelector('#username_input').value;
        let allInputValid = this.#isValidUsername(username);

        const password = document.querySelector('#password_input').value;
        allInputValid = allInputValid && this.#isPasswordValid(password);

        if (!allInputValid) {
            this.saveState();
        } else {
            try {
                const response = await signUp({username: username, password: password});
                router.isAuthorised = true;
                router.username = response.username;
                router.id = response.id;
                router.navigateTo(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
            } catch (error) {
                this.#inputUsername.setState({
                    isError: 'error',
                    inputHelperText: error.message ? error.message : 'An error occurred',
                });
                console.log('Error: ', error);
            }
        }
    }

    setHandlers() {
        const button = document.querySelector('#login_button');
        button.addEventListener('click', this.#button.getHandler());
    }
}
