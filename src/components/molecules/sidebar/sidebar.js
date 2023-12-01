import { BaseComponent } from '@components';
import { Button } from '@atoms';

import LOG_OUT_IMAGE from '@icons/logout.svg';
import template from './sidebar.hbs';
import { Image } from '../../atoms/image/image';

/**
 * The default state for the Sidebar component.
 * @typedef {Object} SidebarDefaultState
 * @property {string} profilePic - The profile picture.
 * @property {string} profileName - The profile name.
 */
const DEFAULT_STATE = {
    profileName: 'Имя пользователя',
};

const BUTTON_STATE = {
    id: 'logout_button',
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: LOG_OUT_IMAGE,
};

const IMAGE_STATE = {
    id: 'sidebar_avatar',
    imageSize: 'image-conteiner_small',
    withBorder: true,
    isClickable: true,
    avatar: '../images/homyak.png',
};

/**
 * Represents a Sidebar component that is a subclass of the BaseComponent.
 * @extends BaseComponent
 */
export class Sidebar extends BaseComponent {

    /**
     * Logout button.
     * @type {Button}
     */
    #button;

    #menuElement;

    #avatar;
    /**
     * Create a Sidebar component.
     * @param {HTMLElement} parent - The parent HTML element where the Sidebar will be rendered.
     * @param {Object} menuElement - The Menu element associated with the Sidebar.
     * @param {SidebarDefaultState} [state=DEFAULT_STATE] - The initial state of the Sidebar component.
     */
    constructor(parent, menuElement, state = DEFAULT_STATE) {
        super(state, parent);

        /**
         * The Menu element associated with the Sidebar.
         * @type {Object}
         * @private
         */
        this.#menuElement = menuElement;

        this.#button = new Button(null, BUTTON_STATE, this.onLogout);

        this.#avatar = new Image(null, IMAGE_STATE)
    }

    /**
     * Render the Sidebar component's template to the parent element.
     */
    renderTemplateToParent() {
        /**
         * HTML representation of the Menu element.
         * @type {string}
         */
        const menuHTML = this.#menuElement.render();
        const logoutButtonHTML = this.#button.render();

        const templates = [
            template({
                ...this.getState(),
                menu: menuHTML,
                logoutButton: logoutButtonHTML,
                sidebarAvatar: this.#avatar.render(),
            }),
        ];

        super.renderTemplateToParent(templates);
    }

    onLogout() {
        // return logOut();
    }

    setHandlers() {
        const button = document.querySelector('#logout_button');
        button.addEventListener('click', this.#button.getHandler());
    }
}
