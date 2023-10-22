import { BaseComponent } from '@components/baseComponent.js';

import template from './menu.hbs';

const DEFAULT_LIST = {
    menuSections: [
        {
            menuSectionHeading: 'Heading',
            menuItems: [
                {
                    menuItemIcon: '',
                    menuItemAlt: '',
                    menuItemText: 'Menu button',
                    menuItemID: '',
                }
            ]
        }
    ]
};

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
        super.renderTemplateToParent([template(this.getState())]);
    }

    /**
     * Render the Menu component.
     * @returns {HTMLElement} The rendered Menu element.
     */
    render() {
        return super.render([template(this.getState())]);
    }
}
