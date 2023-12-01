import { BaseComponent } from '@components/baseComponent.js';
import { Image, Button, Menu } from '@atoms';
import { Sidebar } from '@molecules/sidebar/sidebar.js';
import { EVENT_TYPES, ROUTE_CONSTANTS } from '@constants/constants.js';
import { router } from '@router';
import { userStore } from '@stores/userStore';
import { accountStore } from '@stores/accountStore';
import { categoriesStore } from '@stores/categoriesStore';
import { userActions } from '@actions/userActions';

import LOG_OUT_IMAGE from '@icons/logout.svg';

import sidebarTemplate from '@molecules/sidebar/sidebar.hbs';
import layoutTemplate from './layout.hbs';

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
                        {
                            menuItemText: 'Счета',
                            menuItemID: 'accounts',
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
};
const BUTTON_STATE = {
    id: 'logout_button',
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: LOG_OUT_IMAGE,
    buttonText: '',
};

const IMAGE_STATE = {
    id: 'sidebar_avatar',
    imageSize: 'image-container_big',
    withBorder: true,
    isClickable: true,
    avatar: '../images/homyak.png',
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

    #avatar;

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

        this.#avatar = new Image(null, IMAGE_STATE);

        this.#sidebar = new Sidebar(parent, this.getState().sidebar);

        if (context === 'categories') {
            categoriesStore.registerListener(EVENT_TYPES.RERENDER_CATEGORIES, this.renderTemplateToParent.bind(this));
        }

        if (context === 'transactions') {
            categoriesStore.registerListener(EVENT_TYPES.RERENDER_TRANSACTIONS, this.renderTemplateToParent.bind(this));
        }

        if (context === 'accounts') {
            accountStore.registerListener(EVENT_TYPES.RERENDER_ACCOUNTS, this.renderTemplateToParent.bind(this));
        }

        if (context === 'profile') {
            userStore.registerListener(EVENT_TYPES.RERENDER_PROFILE, this.renderTemplateToParent.bind(this));
        }
    }

    /**
     * Render the Layout component's template to the parent element.
     * @async
     */
    async renderTemplateToParent() {
        const { avatarPath } = userStore.storage.user;
        if (avatarPath === '00000000-0000-0000-0000-000000000000') {
            this.#avatar.setState({ avatar: '../images/homyak.png' });
        } else {
            this.#avatar.setState({ avatar: `../images/${avatarPath}.jpg` });
        }

        const { username } = userStore.storage.user;
        this.setState({ sidebar: { profileName: username || 'Имя профиля' } });

        const contentHTML = await this.#contentElement.render();

        const menuHTML = this.#menuElement.render();

        const logoutButtonHTML = this.#button.render();

        const templatesToStateMap = [
            layoutTemplate({
                sidebar: sidebarTemplate({
                    ...this.getState().sidebar,
                    menu: menuHTML,
                    logoutButton: logoutButtonHTML,
                    sidebarAvatar: this.#avatar.render(),
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

        const menuAccounts = document.querySelector('#accounts');
        if (menuAccounts) {
            menuAccounts.addEventListener('click', this.navigateAccounts);
        }

        const avatar = document.querySelector(`#${this.#avatar.getState().id}`);
        if (avatar) {
            avatar.addEventListener('click', this.navigateProfile);
        }

        this.#contentElement.setHandlers();
    }

    navigateHome = async () => {
        await router.navigateTo(ROUTE_CONSTANTS.HOME_ROUTE);
    };

    navigateTransaction = async () => {
        await router.navigateTo(ROUTE_CONSTANTS.TRANSACTIONS);
    };

    navigateProfile = async () => {
        await router.navigateTo(ROUTE_CONSTANTS.PROFILE);
    };

    navigateAccounts = async () => {
        await router.navigateTo(ROUTE_CONSTANTS.ACCOUNTS);
    };
}
