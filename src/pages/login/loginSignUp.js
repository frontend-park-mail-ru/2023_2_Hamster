import { Button } from '@atoms';
import { BaseComponent } from '@components';
import { LoginSignUpForm } from '@molecules';
import { router } from '@router';
import { ROUTE_CONSTANTS } from '@constants';

import template from './loginSignUp.hbs';

import IMAGE_URL from '@images/peopleLoginReg.svg';

const DEFAULT_STATE = {
    ImagePeople: IMAGE_URL,
    ImageTextLoginH1: 'Добрый день! HammyWallet',
    ImageTextLoginP1: 'Рады видеть вас здесь снова',
    ImageTextRegistrH1: 'Привет, это HammyWallet',
    ImageTextRegistrP1: 'Будем рады помочь вам с финансами!',
    LinkLogin: 'У вас нет учетной записи?',
    LinkRegister: 'У вас уже есть аккаунт?',
};

const REGISTER_BUTTON_TEXT = 'Регистрация';
const LOGIN_BUTTON_TEXT = 'Вход';

const DEFAULT_BUTTON_STATE = {
    id: 'switch_login_signup_button',
    buttonText: LOGIN_BUTTON_TEXT,
    buttonSize: 'button_small',
    buttonColor: 'button_primary-color',
};

/**
 * Represents a LoginOrSignUp component.
 * @class
 */
export class LoginOrSignUp extends BaseComponent {
    /**
     * The form template.
     * @type {Object}
     * @private
     */
    #form;

    /**
     * The boolean parameter indicating if it's a login form.
     * @type {boolean}
     * @private
     */
    #isLogin;

    /**
     * The button element.
     * @type {Object}
     * @private
     */
    #buttonElement;

    /**
     * Creates instance of LoginOrSignUp.
     * @param {HTMLElement} parent The parent element where the LoginSignUp will be rendered.
     * @param {boolean} isLogin Determines whether it is a login or signup.
     * @param {Object} [state = DEFAULT_STATE] initial state of LoginSignUp.
     * @param {LoginSignUpForm} [form = new LoginSignUpForm(null, isLogin)] form inside LoginSignUp.
     * @param {Button} [button = new Button(null, DEFAULT_BUTTON_STATE)] button of this LoginSignUp.
     */
    constructor(parent, isLogin, state = DEFAULT_STATE,
        form = new LoginSignUpForm(null, isLogin),
        button = new Button(null, DEFAULT_BUTTON_STATE)) {
        super(state, parent);
        this.#isLogin = isLogin;
        this.#buttonElement = button;
        this.#form = form;

        this.#buttonElement.setHandler(this.switchLoginSignup);
        this.#buttonElement.setState({ buttonText: isLogin ? REGISTER_BUTTON_TEXT : LOGIN_BUTTON_TEXT });
    }

    renderTemplateToParent() {
        const buttonHTML = this.#buttonElement.render();

        const templates = [
            template({
                ...this.getState(),
                isLogin: this.#isLogin,
                button: buttonHTML,
            }),
        ];

        super.renderTemplateToParent(templates);

        this.#form.parent = document.querySelector('.login-sign-up-layout__form');

        this.#form.renderTemplateToParent();
    }

    cleanUp() {
        const button = document.querySelector('#switch_login_signup_button');
        if (button) {
            button.removeEventListener('click', this.#buttonElement.getHandler());
        }
    }

    switchLoginSignup = () => {
        this.#form.clearErrorState();
        router.navigateTo(this.#isLogin ? ROUTE_CONSTANTS.REGISTRATION_ROUTE : ROUTE_CONSTANTS.LOGIN_ROUTE);
    };

    setHandlers() {
        const button = document.querySelector('#switch_login_signup_button');
        button.addEventListener('click', this.#buttonElement.getHandler());
    }

    setButton(button) {
        this.#buttonElement = button;
        this.renderTemplateToParent();
    }

    getButton() {
        return this.#buttonElement;
    }

    setForm(form) {
        this.#form = form;
        this.renderTemplateToParent();
    }

    getForm() {
        return this.#form;
    }
}
