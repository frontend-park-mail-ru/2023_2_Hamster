'use strict';

import {Button} from "../../components/atoms/button/button.js";
import {BaseComponent} from "../../components/baseComponent.js";
import {LoginSignUpForm} from "../../components/molecules/loginSignupForm/loginSignupForm.js"
import {router} from "../../modules/router.js";
import {CONSTANTS} from "../../constants.js";

const IMAGE_URL = "../../assets/images/peopleLoginReg.svg";


const DEFAULT_STATE = {
    ImagePeople: IMAGE_URL,
    ImageTextLoginH1: "Добрый день! HammyWallet",
    ImageTextLoginP1: "Рады видеть вас здесь снова",
    ImageTextRegistrH1: "Привет, это HammyWallet",
    ImageTextRegistrP1: "Будем рады помочь вам с финансами!",
    LinkLogin: "У вас нет учетной записи?",
    LinkRegister: "У вас уже есть аккаунт?"
};

const REGISTER_BUTTON_TEXT = 'Register';
const LOGIN_BUTTON_TEXT = 'Login';

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
        this.#buttonElement.setState({buttonText: isLogin ? REGISTER_BUTTON_TEXT : LOGIN_BUTTON_TEXT});
    }

    renderTemplateToParent() {
        const buttonHTML = this.#buttonElement.render()

        const templatesToStateMap = {
            'loginSignUp.hbs': {
                ...this.getState(),
                isLogin: this.#isLogin,
                button: buttonHTML,
            },
        };

        super.renderTemplateToParent(templatesToStateMap);

        const formContainer = document.querySelector('.login-sign-up-layout__form');
        this.#form.parent = formContainer

        this.#form.renderTemplateToParent();
    }

    cleanUp() {
        const button = document.querySelector('#switch_login_signup_button');
        if (button){
            button.removeEventListener('click', this.#buttonElement.getHandler());
        }
    }

    switchLoginSignup = () => {
        this.#form.clearErrorState();
        router.navigateTo(this.#isLogin ? CONSTANTS.REGISTRATION_ROUTE : CONSTANTS.LOGIN_ROUTE) ;
    }

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
