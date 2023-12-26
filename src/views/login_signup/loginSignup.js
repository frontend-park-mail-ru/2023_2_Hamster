import { Button } from '@atoms';
import { LoginSignUpForm } from '@molecules';
import { BaseComponent } from '@components';
import { EVENT_TYPES, ROUTE_CONSTANTS } from '@constants/constants';
import { router } from '@router';
import { userStore } from '@stores/userStore';
import { userActions } from '@actions/userActions';

import template from './loginSignup.hbs';

/**
 * Class representing a LoginSignupView.
 *
 * @extends BaseComponent
 */
export class LoginSignupView extends BaseComponent {
    #form;

    #buttonElement;

    #isLogin;

    /**
     * Create a LoginSignupView, register listeners.
     *
     * @param {HTMLElement} parent - The parent element.
     * @param {boolean} isLogin - The login state.
     * @constructor
     */
    constructor(parent, isLogin) {
        if (isLogin) {
            super(userStore.storage.loginState, template, parent);
            this.#form = new LoginSignUpForm(null, isLogin, undefined);
        } else {
            super(userStore.storage.registrationState, template, parent);
            this.#form = new LoginSignUpForm(null, isLogin, undefined);
        }

        this.#isLogin = isLogin;

        this.#buttonElement = new Button(null, this.getState().redirectButton, this.switchLoginSignup.bind(this));

        if (isLogin) {
            userStore.registerListener(EVENT_TYPES.LOGIN_SUCCESS, this.navigateToHome.bind(this));
            userStore.registerListener(EVENT_TYPES.LOGIN_ERROR, this.renderLoginInput.bind(this));
            userStore.registerListener(EVENT_TYPES.RENDER_LOGIN_VIEW, this.renderTemplateToParent.bind(this));
        } else {
            userStore.registerListener(EVENT_TYPES.REGISTRATION_SUCCESS, this.navigateToHome.bind(this));
            userStore.registerListener(EVENT_TYPES.REGISTRATION_ERROR, this.renderLoginInput.bind(this));
            userStore.registerListener(EVENT_TYPES.RENDER_REGISTRATION_VIEW, this.renderTemplateToParent.bind(this));
        }

        userStore.registerListener(EVENT_TYPES.RERENDER_LOGIN_INPUT, this.renderLoginInput.bind(this));
        userStore.registerListener(EVENT_TYPES.RERENDER_USERNAME_INPUT, this.renderUsername.bind(this));
        userStore.registerListener(EVENT_TYPES.RERENDER_PASSWORD_INPUT, this.renderPassword.bind(this));
        userStore.registerListener(EVENT_TYPES.RERENDER_REPEAT_INPUT, this.renderRepeatPassword.bind(this));
    }

    /**
     * Navigate to home route.
     *
     * @function
     */
    navigateToHome = async () => {
        await router.navigateTo(ROUTE_CONSTANTS.HOME_ROUTE, false);
    };

    /**
     * Render template to parent.
     *
     * @returns {HTMLElement} The rendered template.
     * @function
     */
    async renderTemplateToParent() {
        const templates = [
            template({
                ...this.getState(),
                isLogin: this.#form.isLogin,
                form: this.#form.render(),
                button: this.#buttonElement.render(),
            }),
        ];

        return await super.renderTemplateToParent(templates);
    }

    /**
     * Rerender login input without loosing it value.
     *
     * @function
     */
    renderLoginInput = () => {
        // this.cleanUp();
        //
        this.#form.inputLogin.setState(userStore.storage.loginInputState);

        const login = document.querySelector('#login_input_container');
        login.innerHTML = this.#form.inputLogin.render();

        const loginInput = document.querySelector('#login_input');
        loginInput.addEventListener('blur', this.loginInputHandler);

        document.querySelector('#login_input').value = userStore.storage.loginInputState.login;
    };

    /**
     * Rerender username input without loosing it value.
     *
     * @function
     */
    renderUsername = () => {
        // this.cleanUp();
        //
        this.#form.inputUsername.setState(userStore.storage.usernameState);

        const username = document.querySelector('#username_input_container');
        username.innerHTML = this.#form.inputUsername.render();

        const usernameInput = document.querySelector('#username_input');
        usernameInput.addEventListener('blur', this.usernameInputHandler);

        document.querySelector('#username_input').value = userStore.storage.usernameState.username;
    };

    /**
     * Rerender password input without loosing it value.
     *
     * @function
     */
    renderPassword = () => {
        this.#form.inputPassword.setState(userStore.storage.passwordState);

        const password = document.querySelector('#password_input_container');
        password.innerHTML = this.#form.inputPassword.render();

        const passwordInput = document.querySelector('#password_input');
        passwordInput.addEventListener('blur', this.passwordInputHandler);

        document.querySelector('#password_input').value = userStore.storage.passwordState.password;
    };

    /**
     * Rerender password repeat input without loosing it value.
     *
     * @function
     */
    renderRepeatPassword = () => {
        this.#form.inputPasswordRepeat.setState(userStore.storage.repeatState);

        const repeatPasswordContainer = document.querySelector('#password_repeat_input_container');
        repeatPasswordContainer.innerHTML = this.#form.inputPasswordRepeat.render();

        const repeatPasswordInput = document.querySelector('#password_repeat_input');
        repeatPasswordInput.addEventListener('blur', this.passwordRepeatInputHandler);

        document.querySelector('#password_repeat_input').value = userStore.storage.repeatState.passwordRepeat;
    };

    /**
     * Remove listeners from inputs and then set them up.
     *
     * @function
     */
    cleanUp() {
        const redirectButton = document.querySelector('#switch_login_signup_button');
        if (redirectButton) {
            redirectButton.removeEventListener('click', this.#buttonElement.getHandler());
        }

        const loginButton = document.querySelector('#login_button');
        if (loginButton) {
            loginButton.removeEventListener('click', this.submitButtonHandler);
        }

        const usernameInput = document.querySelector('#username_input');
        if (usernameInput) {
            usernameInput.removeEventListener('blur', this.usernameInputHandler);
        }

        const passwordInput = document.querySelector('#password_input');
        if (passwordInput) {
            passwordInput.removeEventListener('blur', this.passwordInputHandler);
        }

        const passwordRepeatInput = document.querySelector('#password_repeat_input');
        if (passwordRepeatInput) {
            passwordRepeatInput.removeEventListener('blur', this.passwordRepeatInputHandler);
        }
    }

    /**
     * Switch between login and signup pages.
     *
     * @function
     */
    switchLoginSignup = async () => {
        // eslint-disable-next-line no-unused-expressions
        this.#isLogin ? await router.navigateTo(ROUTE_CONSTANTS.REGISTRATION_ROUTE, false) : await router.navigateTo(ROUTE_CONSTANTS.LOGIN_ROUTE, false);
    };

    /**
     * Submit button handler.
     * Call login action.
     *
     * @function
     */
    submitButtonHandler = async () => {
        const login = document.querySelector('#login_input');
        const username = document.querySelector('#username_input');
        const password = document.querySelector('#password_input');
        const repeatPassword = document.querySelector('#password_repeat_input');

        if (login && username && password && repeatPassword) {
            await userActions.register(login.value, username.value, password.value, repeatPassword.value);
        } else {
            await userActions.login(login.value, password.value);
        }
    };

    /**
     * Login input handler.
     * Call validate login input action.
     *
     * @function
     */
    loginInputHandler = () => {
        const login = document.querySelector('#login_input').value;
        userActions.validateLogin(login);
    };

    /**
     * Username input handler.
     * Call validate username input action.
     *
     * @function
     */
    usernameInputHandler = () => {
        const username = document.querySelector('#username_input').value;
        userActions.validateUsername(username);
    };

    /**
     * Password input handler.
     * Call validate password input action.
     *
     * @function
     */
    passwordInputHandler = () => {
        const password = document.querySelector('#password_input').value;
        userActions.validatePassword(password);
    };

    /**
     * Repeat password input handler.
     * Call validate password repeat input action.
     *
     * @function
     */
    passwordRepeatInputHandler = () => {
        const password = document.querySelector('#password_input').value;
        const repeatPassword = document.querySelector('#password_repeat_input').value;

        userActions.validateRepeatPassword(password, repeatPassword);
    };

    /**
     * Set handlers.
     * Register handlers if there is such element on page.
     *
     * @function
     */
    setHandlers() {
        const redirectButton = document.querySelector('#switch_login_signup_button');
        if (redirectButton) {
            redirectButton.addEventListener('click', this.switchLoginSignup);
        }

        const submitButton = document.querySelector('#login_button');
        if (submitButton) {
            submitButton.addEventListener('click', this.submitButtonHandler);
        }

        const loginInput = document.querySelector('#login_input');
        if (loginInput) {
            loginInput.addEventListener('blur', this.loginInputHandler);
        }

        const usernameInput = document.querySelector('#username_input');
        if (usernameInput) {
            usernameInput.addEventListener('blur', this.usernameInputHandler);
        }

        const passwordInput = document.querySelector('#password_input');
        if (passwordInput) {
            passwordInput.addEventListener('blur', this.passwordInputHandler);
        }

        const repeatPasswordInput = document.querySelector('#password_repeat_input');
        if (repeatPasswordInput) {
            repeatPasswordInput.addEventListener('blur', this.passwordRepeatInputHandler);
        }
    }
}
