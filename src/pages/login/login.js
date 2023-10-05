const IMAGE_URL = '../../images/peopleLoginReg.svg';

/**
 * Represents a Login component.
 * @class
 */
export class LoginOrSignUp {
    /**
     * The parent element where the login form will be rendered.
     * @type {HTMLElement}
     * @private
     */
    #parent;

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
     * The state of the login form.
     * @type {Object}
     * @property {string} ImagePeople - The image URL.
     * @property {string} ImageTextLoginH1 - The H1 text for login.
     * @property {string} ImageTextLoginP1 - The P1 text for login.
     * @property {string} ImageTextRegistrH1 - The H1 text for registration.
     * @property {string} ImageTextRegistrP1 - The P1 text for registration.
     * @property {string} LinkLogin - The link text for login
     * @property {string} LinkRegister - The link text for register
     * @private
     */
    #state = {
        ImagePeople: IMAGE_URL,
        ImageTextLoginH1: 'Добрый день! HammyWallet',
        ImageTextLoginP1: 'Рады видеть вас здесь снова',
        ImageTextRegistrH1: 'Привет, это HammyWallet',
        ImageTextRegistrP1: 'Будем рады помочь вам с финансами!',
        LinkLogin: 'У вас нет учетной записи?',
        LinkRegister: 'У вас есть аккаунт?'
    };

    /**
     * Creates an instance of LoginOrSignUp.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the login form will be rendered.
     * @param {Object} form - The form template.
     * @param {boolean} isLogin - The boolean parameter indicating if it's a login form.
     * @param {Object} buttonElement - The button element.
     * @param {Object} [state={}] - The initial state of the login form. (optional)
     */
    constructor(parent, form, isLogin, buttonElement, state = {}) {
        this.#parent = parent;
        this.#buttonElement = buttonElement;
        this.#state = { ...this.#state, ...state };
        this.#form = form;
        this.#isLogin = isLogin;
    }

    /**
     * Renders the login form component.
     * @returns {string} - The rendered HTML template of the login form.
     */
    renderTemplate() {
        const template = Handlebars.templates['login.hbs'];
        const buttonHTML = this.#buttonElement.render();
        const renderedTemplate = template({
            state: this.#state,
            isLogin: this.#isLogin,
            button: buttonHTML

        });

        if (this.#parent) {
            this.#parent.innerHTML = renderedTemplate;
        }

        return renderedTemplate;
    }
}
