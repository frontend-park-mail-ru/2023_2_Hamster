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

const USERNAME_REGEX = /[\w а-яА-Я]+/

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
    inputPlaceholder: 'Повторить пароль',
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

    #isValidUsername = (username) => username.length >= USERNAME_MIN_LENGTH &&
        username.length <= USERNAME_MAX_LENGTH &&
        USERNAME_REGEX.test(username);

    #isValidPassword = (password) => password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH;
    #isValidPasswordRepeat = (password, passwordRepeat) => password === passwordRepeat;

    /**
     * Handles click on submit button if form is signup
     */
    onRegistration = async () => {
        this.clearErrorState()

        const username = document.querySelector('#username_input').value;
        let anyInputInvalid = false;

        if (!this.#isValidUsername(username)) {
            console.error(`set invalid username`)
            this.#inputUsername.setState({
                isError: 'error',
                inputHelperText: 'Неверное имя пользователя'
            });
            anyInputInvalid = true;
        }

        const password = document.querySelector('#password_input').value;
        if (!this.#isValidPassword(password)) {
            console.error(`set invalid password`)
            this.#inputPassword.setState({
                isError: 'error',
                inputHelperText: 'Неверный пароль'
            });
            anyInputInvalid = true;
        }

        const passwordRepeat = document.querySelector('#password_repeat_input').value;
        if (!this.#isValidPasswordRepeat(password, passwordRepeat)) {
            this.#inputPasswordRepeat.setState({
                isError: 'error',
                inputHelperText: 'Пароли не совпдаают'
            });
            anyInputInvalid = true;
        }

        // TODO: сделать так, чтобы текст исчезал только в неправильном поле, а не во всех сразу
        if (anyInputInvalid) {
            this.renderTemplateToParent();
        } else {
            try {
                const response = await signUp({username: username, password: password});
                router.navigateTo(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
            } catch (error) {
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
        let anyInputInvalid = false;

        if (!this.#isValidUsername(username)) {  // TODO: more checks for username?
            this.#inputUsername.setState({
                isError: 'error',
                inputHelperText: 'Неверное имя пользователя'
            });
            anyInputInvalid = true;
        }

        const password = document.querySelector('#password_input').value;
        if (!this.#isValidPassword(password)) {
            this.#inputPassword.setState({
                isError: 'error',
                inputHelperText: 'Неверное имя пользователя'
            });
            anyInputInvalid = true;
        }

        // TODO: сделать так, чтобы текст исчезал только в неправильном поле, а не во всех сразу
        if (anyInputInvalid) {
            this.renderTemplateToParent();
        } else {
            try {
                const response = await signIn({username: username, password: password});
                router.navigateTo(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    }

    setHandlers() {
        const button = document.querySelector('#login_button');
        button.addEventListener('click', this.#button.getHandler());
    }
}
