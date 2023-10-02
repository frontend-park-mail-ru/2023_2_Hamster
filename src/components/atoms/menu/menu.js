'use strict';

import {BaseComponent} from "../../baseComponent.js";

const DEFAULT_LIST = {
    menuSections: [
        {
            menuSectionHeading: "Heading",
            menuItems: [
                {
                    menuItemIcon: "",
                    menuItemAlt: "",
                    menuItemText: "Menu button",
                    menuItemID: "",
                }
            ]
        }
    ]
}

/**
 * Class representing a Menu component.
 * @extends BaseComponent
 */
export class Menu extends BaseComponent {

    /**
     * Create a Menu component.
     * @param {Object} [state=DEFAULT_LIST] - The initial state of the Menu component.
     * @param {HTMLElement} parent - The parent HTML element where the Menu will be rendered.
     */
    constructor(state = DEFAULT_LIST, parent) {
        super(state, parent);
    }

    /**
     * Render the Menu component's template to the parent element.
     */
    renderTemplateToParent() {
        const templatesToStateMap = {
            'menu.hbs': this.getState(),
        };

        super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Render the Menu component.
     * @returns {HTMLElement} The rendered Menu element.
     */
    render() {
        const templatesToStateMap = {
            'menu.hbs': this.getState(),
        };

        return super.render(templatesToStateMap);
    }
}
