import { BaseComponent } from '@components/baseComponent.js';
import { Menu } from '@atoms/menu/menu.js';
import { Sidebar } from '@molecules/sidebar/sidebar.js';
import { Button } from '@atoms/button/button.js';
import { getAccounts, getActualBudget, getBalance, getPlannedBudget, logOut } from '@ajax';
import { router } from '@router';
import { ROUTE_CONSTANTS } from '@constants';

import layoutTemplate from './layout.hbs';
import sidebarTemplate from '@molecules/sidebar/sidebar.hbs';

import LOG_OUT_IMAGE from '@icons/logout.svg';

/**
 * The default state for the Layout component.
 * @typedef {Object} DefaultState
 * @property {string} sidebar - The sidebar of the Layout.
 * @property {string} layout - The layout of the Layout.
 */
const DEFAULT_STATE = {
    sidebar: {
        profileName: 'Имя профиля',
        menu: {
            menuSections: [
                {
                    menuSectionHeading: 'Главное',
                    menuItems: [
                        {
                            menuItemText: 'Доска',
                        },
                    ],
                },
            ],
        },
    },
};

const BUTTON_STATE = {
    id: 'logout_button',
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: LOG_OUT_IMAGE,
};

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
    #userId;

    /**
     * Logout button.
     * @private
     * @type {Button}
     */
    #button;

    /**
     * The Menu element associated with the Layout.
     * @private
     * @type {Menu}
     */
    #menuElement;

    /**
     * The content element associated with the Layout.
     * @private
     * @type {Object}
     */
    #contentElement;

    /**
     * The Sidebar element associated with the Layout.
     * @private
     * @type {Sidebar}
     */
    #sidebar;

    /**
     * Create a Layout component.
     * @param {HTMLElement} parent - The parent HTML element where the Layout will be rendered.
     * @param {Object} [state=DEFAULT_STATE] - The initial state of the Layout component. (optional)
     * @param {Object} contentElement - The content element associated with the Layout.
     */
    constructor(parent, state = DEFAULT_STATE, contentElement) {
        super(state, parent);

        this.#menuElement = new Menu(this.getState().sidebar.menu);

        this.#button = new Button(null, BUTTON_STATE, this.onLogout);

        this.#contentElement = contentElement;

        this.#sidebar = new Sidebar(parent, this.getState().sidebar);

    }

    /**
     * Render the Layout component's template to the parent element.
     * @async
     */
    async renderTemplateToParent() {
        this.setState({ sidebar: { profileName: router.username ? router.username : 'Имя профиля' } });
        this.#userId = router.id;

        if (!this.data) {
            this.#contentElement.setState(await this.getData());
        }

        const contentHTML = this.#contentElement.render();

        const menuHTML = this.#menuElement.render();

        const logoutButtonHTML = this.#button.render();

        const templatesToStateMap = [
            sidebarTemplate({
                ...this.getState().sidebar,
                menu: menuHTML,
                logoutButton: logoutButtonHTML,
            }),
            layoutTemplate({
                content: contentHTML,
            }),
        ];

        return super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Handle logout event.
     */
    onLogout = async () => {
        try {
            await logOut();
            router.isAuthorised = false;
            router.navigateTo(ROUTE_CONSTANTS.LOGIN_ROUTE);
        } catch (e) {
            router.isAuthorised = false;
            console.log('Error: ', e);
        }
    };

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
        try {
            const balance = await getBalance(id);
            const accounts = await getAccounts(id);
            const plannedBudget = await getPlannedBudget(id);
            const actualBudget = await getActualBudget(id);

            if (accounts != null) {
                return {
                    cardBalance: {
                        cardSize: 'card_small',
                        cardHeadline: balance.balance,
                        cardSubhead: 'Баланс',
                        cardList: {
                            listItems: accounts.Account.map((account) => ({
                                listItemTitle: account.mean_payment,
                                listItemValue: account.balance,
                                valueUnits: '₽',
                            })),
                        },
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
                };
            }

            return null;
        } catch (e) {
            console.error('some error occurred while connecting to server');
        }
    };
}
