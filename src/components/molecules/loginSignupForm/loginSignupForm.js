import { BaseComponent } from '@components/baseComponent.js';
import { Button, Input } from '@atoms';

import template from './loginSignupForm.hbs';

const LOGIN_INPUT_STATE = {
    isError: '',
    id: 'login_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Логин',
};

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

export class LoginSignUpForm extends BaseComponent {
    button;

    inputLogin;

    inputUsername;

    inputPassword;

    inputPasswordRepeat;

    isLogin;

    constructor(parent, isLogin = true, state = DEFAULT_FORM_STATE) {
        state.header = isLogin ? LOGIN_HEADER : SIGNUP_HEADER;
        super(state, parent);

        this.isLogin = isLogin;
        this.inputLogin = new Input(null, LOGIN_INPUT_STATE);
        this.inputUsername = new Input(null, USERNAME_INPUT_STATE);
        this.inputPassword = new Input(null, PASSWORD_INPUT_STATE);
        this.inputPasswordRepeat = new Input(null, PASSWORD_REPEAT_INPUT_STATE);
        this.button = new Button(null, BUTTON_STATE);
    }

    renderTemplateToParent() {
        const inputLoginHTML = this.inputLogin.render();
        const buttonHTML = this.button.render();
        const inputUsernameHTML = this.isLogin ? '' : this.inputUsername.render();
        const inputPasswordHTML = this.inputPassword.render();
        const inputPasswordRepeatHTML = this.isLogin ? '' : this.inputPasswordRepeat.render();
        const templates = [
            template({
                isSignup: !this.isLogin,
                ...this.getState(),
                loginButton: buttonHTML,
                loginInput: inputLoginHTML,
                userNameInput: inputUsernameHTML,
                passwordInput: inputPasswordHTML,
                passwordRepeatInput: inputPasswordRepeatHTML,
            }),
        ];

        super.renderTemplateToParent(templates);
    }

    render() {
        const inputLoginHTML = this.inputLogin.render();
        const buttonHTML = this.button.render();
        const inputUsernameHTML = this.isLogin ? '' : this.inputUsername.render();
        const inputPasswordHTML = this.inputPassword.render();
        const inputPasswordRepeatHTML = this.isLogin ? '' : this.inputPasswordRepeat.render();
        const templates = [
            template({
                isSignup: !this.isLogin,
                ...this.getState(),
                loginButton: buttonHTML,
                loginInput: inputLoginHTML,
                userNameInput: inputUsernameHTML,
                passwordInput: inputPasswordHTML,
                passwordRepeatInput: inputPasswordRepeatHTML,
            }),
        ];

        return super.render(templates);
    }
}
