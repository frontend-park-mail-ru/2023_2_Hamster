import { BaseComponent } from '@components/baseComponent.js';
import { Menu } from '@atoms/menu/menu.js';
import { Sidebar } from '@molecules/sidebar/sidebar.js';
import { Button } from '@atoms/button/button.js';
import { router } from '@router';
import { API_CONSTANTS, EVENT_TYPES, ROUTE_CONSTANTS } from '@constants/constants.js';

import sidebarTemplate from '@molecules/sidebar/sidebar.hbs';

import LOG_OUT_IMAGE from '@icons/logout.svg';
import layoutTemplate from './layout.hbs';
import { userStore } from '@stores/userStore';
import { userActions } from '@actions/userActions';
import { transactionActions } from '@actions/transactionActions';
import { categoriesStore } from '@stores/categoriesStore';

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
                                menuItemID: 'home',
                            },
                            {
                                menuItemText: 'Транзакции',
                                menuItemID: 'transactions',
                            },
                        ],
                    },
                    {
                        menuSectionHeading: 'Настройки',
                        menuItems: [
                            {
                                menuItemText: 'Профиль',
                                menuItemID: 'profile',
                            },
                        ],
                    },
                ],
            },
        },
    }
;

const BUTTON_STATE = {
    id: 'logout_button',
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: LOG_OUT_IMAGE,
    buttonText: '',
};

/**
 * Represents a Layout component that combines a Sidebar and content.
 * @extends BaseComponent
 */
export class Layout extends BaseComponent {
    /**
     * Logout button.
     * @private
     * @type {Button}
     */
    #button;

    /**
     * The Menu element of the sidebar.
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
    constructor(parent, state = DEFAULT_STATE, contentElement, context) {
        super(state, layoutTemplate, parent);

        this.#menuElement = new Menu(this.getState().sidebar.menu);

        this.#button = new Button(null, BUTTON_STATE, this.onLogout);

        this.#contentElement = contentElement;

        this.#sidebar = new Sidebar(parent, this.getState().sidebar);

        if (context === 'categories') {
            categoriesStore.registerListener(EVENT_TYPES.RERENDER_CATEGORIES, this.renderTemplateToParent.bind(this));
        }
    }

    /**
     * Render the Layout component's template to the parent element.
     * @async
     */
    async renderTemplateToParent() {
        const username = userStore.storage.user.username;
        console.log('layout: ', userStore.storage.user.username);
        this.setState({ sidebar: { profileName: username ? username : 'Имя профиля' } });

        const contentHTML = await this.#contentElement.render();

        const menuHTML = this.#menuElement.render();

        const logoutButtonHTML = this.#button.render();

        const templatesToStateMap = [
            layoutTemplate({
                sidebar: sidebarTemplate({
                    ...this.getState().sidebar,
                    menu: menuHTML,
                    logoutButton: logoutButtonHTML,
                }),
                content: contentHTML,
            }),
        ];

        return await super.renderTemplateToParent(templatesToStateMap);
    }

    cleanUp() {
        super.cleanUp();

        const button = document.querySelector('#logout_button');
        if (button) {
            button.removeEventListener('click', this.#button.getHandler());
        }
    }

    /**
     * Handle logout event.
     */
    onLogout = async () => {
        userActions.logout();
    };

    /**
     * Set event handlers for the Layout component.
     */
    setHandlers() {
        const button = document.querySelector('#logout_button');
        if (button) {
            button.addEventListener('click', this.#button.getHandler());
        }

        const menuHome = document.querySelector('#home');
        if (menuHome) {
            menuHome.addEventListener('click', this.navigateHome);
        }

        const menuTransactions = document.querySelector('#transactions');
        if (menuTransactions) {
            menuTransactions.addEventListener('click', this.navigateTransaction);
        }

        const menuProfile = document.querySelector('#profile');
        if (menuProfile) {
            menuProfile.addEventListener('click', this.navigateProfile);
        }

        this.#contentElement.setHandlers();
    }

    navigateHome = () => {
        router.navigateTo(ROUTE_CONSTANTS.HOME_ROUTE);
    };

    navigateTransaction = () => {
        transactionActions.getTransactions();
        router.navigateTo(ROUTE_CONSTANTS.TRANSACTIONS);
    };

    navigateProfile = () => {
        router.navigateTo(ROUTE_CONSTANTS.PROFILE);
    };
}
