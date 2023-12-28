import { BaseComponent } from '@components/baseComponent.js';
import { Image, Button, Menu } from '@atoms';
import { Sidebar } from '@molecules/sidebar/sidebar.js';
import {
    DEFAULT_AVATAR, EVENT_TYPES, NULL_UUID, ROUTE_CONSTANTS
} from '@constants/constants.js';
import { router } from '@router';
import { userStore } from '@stores/userStore';
import { accountStore } from '@stores/accountStore';
import { categoriesStore } from '@stores/categoriesStore';
import { userActions } from '@actions/userActions';

import LOG_OUT_IMAGE from '@icons/logout.svg';

import sidebarTemplate from '@molecules/sidebar/sidebar.hbs';
import { transactionsStore } from '@stores/transactionsStore';
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
                            menuItemIconPath: '<path d="M8.4 3H4.6C4.03995 3 3.75992 3 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3 3.75992 3 4.03995 3 4.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10H8.4C8.96005 10 9.24008 10 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C10 9.24008 10 8.96005 10 8.4V4.6C10 4.03995 10 3.75992 9.89101 3.54601C9.79513 3.35785 9.64215 3.20487 9.45399 3.10899C9.24008 3 8.96005 3 8.4 3Z" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n'
                                + '<path d="M19.4 3H15.6C15.0399 3 14.7599 3 14.546 3.10899C14.3578 3.20487 14.2049 3.35785 14.109 3.54601C14 3.75992 14 4.03995 14 4.6V8.4C14 8.96005 14 9.24008 14.109 9.45399C14.2049 9.64215 14.3578 9.79513 14.546 9.89101C14.7599 10 15.0399 10 15.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V4.6C21 4.03995 21 3.75992 20.891 3.54601C20.7951 3.35785 20.6422 3.20487 20.454 3.10899C20.2401 3 19.9601 3 19.4 3Z" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n'
                                + '<path d="M19.4 14H15.6C15.0399 14 14.7599 14 14.546 14.109C14.3578 14.2049 14.2049 14.3578 14.109 14.546C14 14.7599 14 15.0399 14 15.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V15.6C21 15.0399 21 14.7599 20.891 14.546C20.7951 14.3578 20.6422 14.2049 20.454 14.109C20.2401 14 19.9601 14 19.4 14Z" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n'
                                + '<path d="M8.4 14H4.6C4.03995 14 3.75992 14 3.54601 14.109C3.35785 14.2049 3.20487 14.3578 3.10899 14.546C3 14.7599 3 15.0399 3 15.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V15.6C10 15.0399 10 14.7599 9.89101 14.546C9.79513 14.3578 9.64215 14.2049 9.45399 14.109C9.24008 14 8.96005 14 8.4 14Z" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
                            menuItemText: 'Доска',
                            menuItemID: 'home',
                        },
                        {
                            menuItemIconPath: '<path d="M6 6L8 4M8 4L6 2M8 4H6C3.79086 4 2 5.79086 2 8M18 18L16 20M16 20L18 22M16 20H18C20.2091 20 22 18.2091 22 16M13.4172 13.4172C14.1994 13.7908 15.0753 14 16 14C19.3137 14 22 11.3137 22 8C22 4.68629 19.3137 2 16 2C12.6863 2 10 4.68629 10 8C10 8.92472 10.2092 9.80057 10.5828 10.5828M14 16C14 19.3137 11.3137 22 8 22C4.68629 22 2 19.3137 2 16C2 12.6863 4.68629 10 8 10C11.3137 10 14 12.6863 14 16Z" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
                            menuItemText: 'Транзакции',
                            menuItemID: 'transactions',
                        },
                        {
                            menuItemIconPath: '<path d="M22 8.5H2M2 12.5H5.54668C6.08687 12.5 6.35696 12.5 6.61813 12.5466C6.84995 12.5879 7.0761 12.6563 7.29191 12.7506C7.53504 12.8567 7.75977 13.0065 8.20924 13.3062L8.79076 13.6938C9.24023 13.9935 9.46496 14.1433 9.70809 14.2494C9.9239 14.3437 10.15 14.4121 10.3819 14.4534C10.643 14.5 10.9131 14.5 11.4533 14.5H12.5467C13.0869 14.5 13.357 14.5 13.6181 14.4534C13.85 14.4121 14.0761 14.3437 14.2919 14.2494C14.535 14.1433 14.7598 13.9935 15.2092 13.6938L15.7908 13.3062C16.2402 13.0065 16.465 12.8567 16.7081 12.7506C16.9239 12.6563 17.15 12.5879 17.3819 12.5466C17.643 12.5 17.9131 12.5 18.4533 12.5H22M2 7.2L2 16.8C2 17.9201 2 18.4802 2.21799 18.908C2.40973 19.2843 2.71569 19.5903 3.09202 19.782C3.51984 20 4.07989 20 5.2 20L18.8 20C19.9201 20 20.4802 20 20.908 19.782C21.2843 19.5903 21.5903 19.2843 21.782 18.908C22 18.4802 22 17.9201 22 16.8V7.2C22 6.0799 22 5.51984 21.782 5.09202C21.5903 4.7157 21.2843 4.40974 20.908 4.21799C20.4802 4 19.9201 4 18.8 4L5.2 4C4.0799 4 3.51984 4 3.09202 4.21799C2.7157 4.40973 2.40973 4.71569 2.21799 5.09202C2 5.51984 2 6.07989 2 7.2Z" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
                            menuItemText: 'Счета',
                            menuItemID: 'accounts',
                        },
                    ],
                },
                {
                    menuSectionHeading: 'Настройки',
                    menuItems: [
                        {
                            menuItemIconPath: '<path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
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

        this.notifier = {};

        switch (context) {
        case 'categories':
            categoriesStore.registerListener(EVENT_TYPES.RERENDER_CATEGORIES, this.renderTemplateToParent.bind(this));
            this.notifier = categoriesStore;
            break;

        case 'transactions':
            transactionsStore.registerListener(EVENT_TYPES.RERENDER_TRANSACTIONS, this.renderTemplateToParent.bind(this));
            this.notifier = transactionsStore;
            break;

        case 'accounts':
            accountStore.registerListener(EVENT_TYPES.RERENDER_ACCOUNTS, this.renderTemplateToParent.bind(this));
            this.notifier = accountStore;
            break;

        case 'profile':
            userStore.registerListener(EVENT_TYPES.RERENDER_PROFILE, this.renderTemplateToParent.bind(this));
            this.notifier = userStore;
            break;

        case 'share':
            userStore.registerListener(EVENT_TYPES.RERENDER_SHARE, this.renderTemplateToParent.bind(this));
            this.notifier = userStore;
            break;

        default:
        }
    }

    /**
     * Render the Layout component's template to the parent element.
     * @async
     */
    async renderTemplateToParent() {
        const { avatarPath, username } = userStore.storage.user;
        if (avatarPath === NULL_UUID) {
            this.#avatar.setState({ avatar: DEFAULT_AVATAR });
        } else {
            this.#avatar.setState({ avatar: `../images/${avatarPath}.jpg` });
        }

        const contentHTML = await this.#contentElement.render();

        const menuHTML = this.#menuElement.render();

        const logoutButtonHTML = this.#button.render();

        const templatesToStateMap = [
            layoutTemplate({
                sidebar: sidebarTemplate({
                    ...this.getState().sidebar,
                    profileName: username,
                    menu: menuHTML,
                    logoutButton: logoutButtonHTML,
                    sidebarAvatar: this.#avatar.render(),
                }),
                content: contentHTML,
                ...this.notifier.notify,
            }),
        ];

        this.notifier.notify = {
            notifierText: null,
            error: null,
            warning: null,
            success: null,
        };

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
