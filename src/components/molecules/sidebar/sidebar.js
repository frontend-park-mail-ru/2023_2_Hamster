'use strict';

import {BaseComponent} from "../../baseComponent.js";
import {Button} from "../../atoms/button/button.js";
import {logOut} from "../../../modules/ajax.js";

/**
 * The default state for the Sidebar component.
 * @typedef {Object} SidebarDefaultState
 * @property {string} siteLogo - The site logo.
 * @property {string} profilePic - The profile picture.
 * @property {string} profileName - The profile name.
 */
const DEFAULT_STATE = {
    siteLogo: "",
    profilePic: "",
    profileName: "Profile name",
};

const BUTTON_STATE = {
    id: "logout_button",
    buttonText: 'Выйти',
    buttonSize: 'button_small',
    buttonColor: 'button_secondary-color',
}

/**
 * Represents a Sidebar component that is a subclass of the BaseComponent.
 * @extends BaseComponent
 */
export class Sidebar extends BaseComponent {

    /**
     * Logout button.
     * @type {Button}
     */
    #button

    #menuElement

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

        const templatesToStateMap = {
            'sidebar.hbs': {
                ...this.getState(),
                menu: menuHTML,
                logoutButton: logoutButtonHTML,
            },
        };

        super.renderTemplateToParent(templatesToStateMap);
    }

    onLogout() {
        return logOut();
    }

    setHandlers() {
        const button = document.querySelector('#logout_button');
        button.addEventListener('click', this.#button.getHandler());
    }
}
