'use strict';

import {BaseComponent} from "../../components/baseComponent.js";
import {Menu} from "../../components/atoms/menu/menu.js";
import {Sidebar} from "../../components/molecules/sidebar/sidebar.js";

/**
 * The default state for the Layout component.
 * @typedef {Object} DefaultState
 * @property {string} sidebar - The sidebar of the Layout.
 * @property {string} layout - The layout of the Layout.
 */
const DEFAULT_STATE = {
    sidebar: "",
    layout: "",
};

/**
 * Represents a Layout component that combines a Sidebar and content.
 * @extends BaseComponent
 */
export class Layout extends BaseComponent {

    #menuElement

    #sidebar

    /**
     * Create a Layout component.
     * @param {HTMLElement} parent - The parent HTML element where the Layout will be rendered.
     * @param {Object} [state=DEFAULT_STATE] - The initial state of the Layout component. (optional)
     */
    constructor(parent, state = DEFAULT_STATE) {
        super(state, parent);

        /**
         * The Menu element associated with the Layout.
         * @type {Menu}
         * @private
         */
        this.#menuElement = new Menu();

        /**
         * The Sidebar element associated with the Layout.
         * @type {Sidebar}
         * @private
         */
        this.#sidebar = new Sidebar(parent, this.#menuElement);
    }

    /**
     * Render the Layout component's template to the parent element.
     */
    renderTemplateToParent() {
        /**
         * HTML representation of the Menu element.
         * @type {string}
         */
        const menuHTML = this.#menuElement.render();

        const templatesToStateMap = {
            'sidebar.hbs': {
                ...this.getState(),
                menu: menuHTML,
            },
            'layout.hbs': {},
        };

        super.renderTemplateToParent(templatesToStateMap);
    }
}
