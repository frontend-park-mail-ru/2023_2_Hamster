'use strict';

import {BaseComponent} from "../../components/baseComponent.js";
import {Menu} from "../../components/atoms/menu/menu.js";
import {Sidebar} from "../../components/molecules/sidebar/sidebar.js";
import {Button} from "../../components/atoms/button/button.js";
import {checkAuth, getAccounts, getActualBudget, getBalance, getPlannedBudget, logOut} from "../../modules/ajax.js";
import {router} from "../../modules/router.js";
import {ROUTE_CONSTANTS} from "../../constants.js";

/**
 * The default state for the Layout component.
 * @typedef {Object} DefaultState
 * @property {string} sidebar - The sidebar of the Layout.
 * @property {string} layout - The layout of the Layout.
 */
const DEFAULT_STATE = {
    sidebar: {
        siteLogo: "",
        profilePic: "",
        profileName: "Имя профиля",
    },
    layout: "",
};

const BUTTON_STATE = {
    id: "logout_button",
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: '../../assets/icons/logout.svg',
}

/**
 * Represents a Layout component that combines a Sidebar and content.
 * @extends BaseComponent
 */
export class Layout extends BaseComponent {

    /**
     * The data associated with the Layout.
     * @private
     * @type {any}
     */
    #data = null;

    /**
     * The id associated with the Layout.
     * @private
     * @type {string}
     */
    #userId

    /**
     * Logout button.
     * @private
     * @type {Button}
     */
    #button

    /**
     * The Menu element associated with the Layout.
     * @private
     * @type {Menu}
     */
    #menuElement

    /**
     * The content element associated with the Layout.
     * @private
     * @type {HTMLElement}
     */
    #contentElement

    /**
     * The Sidebar element associated with the Layout.
     * @private
     * @type {Sidebar}
     */
    #sidebar

    /**
     * Create a Layout component.
     * @param {HTMLElement} parent - The parent HTML element where the Layout will be rendered.
     * @param {Object} [state=DEFAULT_STATE] - The initial state of the Layout component. (optional)
     * @param {HTMLElement} contentElement - The content element associated with the Layout.
     */
    constructor(parent, state = DEFAULT_STATE, contentElement) {
        super(state, parent);

        /**
         * The Menu element associated with the Layout.
         * @type {Menu}
         * @private
         */
        this.#menuElement = new Menu(this.getState().sidebar.menu);

        this.#button = new Button(null, BUTTON_STATE, this.onLogout);

        this.#contentElement = contentElement;

        /**
         * The Sidebar element associated with the Layout.
         * @type {Sidebar}
         * @private
         */
        this.#sidebar = new Sidebar(parent, this.#menuElement);

    }

    /**
     * Render the Layout component's template to the parent element.
     * @async
     */
    async renderTemplateToParent() {
        const {username, id: userId} = await checkAuth();

        this.setState({sidebar: {profileName: username}});
        this.#userId = userId;

        if (!this.data) {
            this.#contentElement.setState(await this.getData());
        }

        const contentHTML = this.#contentElement.render();

        const menuHTML = this.#menuElement.render();

        const logoutButtonHTML = this.#button.render();

        const templatesToStateMap = {
            'sidebar.hbs': {
                ...this.getState().sidebar,
                menu: menuHTML,
                logoutButton: logoutButtonHTML,
            },
            'layout.hbs': {
                content: contentHTML,
            },
        };

        return super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Handle logout event.
     */
    onLogout() {
        logOut();
        router.navigateTo(ROUTE_CONSTANTS.LOGIN_ROUTE);
    }

    /**
     * Set event handlers for the Layout component.
     */
    setHandlers() {
        const button = document.querySelector('#logout_button');
        button.addEventListener('click', this.#button.getHandler());
    }

    /**
     * Get data for the dashboard component.
     * @async
     */
    getData = async () => {
        const id = this.#userId;
        const balance = await getBalance(id);
        const accounts = await getAccounts(id);
        const plannedBudget = await getPlannedBudget(id);
        const actualBudget = await getActualBudget(id);

        if (accounts.Account) {
            return {
                cardBalance: {
                    cardSize: 'card_small',
                    cardHeadline: balance.balance,
                    cardSubhead: 'Баланс',
                    cardList: {
                        listItems: accounts.Account.map(account => {
                            return {
                                listItemTitle: account.mean_payment,
                                listItemValue: account.balance,
                                valueUnits: 'Р',
                            }
                        })
                    }
                },
                cardPlannedBudget: {
                    cardSize: 'card_small',
                    cardHeadline: plannedBudget.planned_balance,
                    cardSubhead: 'Запланнированный бюджет',
                },
                cardActualBudget: {
                    cardSize: 'card_small',
                    cardHeadline: actualBudget.actual_balance,
                    cardSubhead: 'Актуальный бюджет',
                },
            }
        }

        return null;
    }
}
