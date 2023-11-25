import {BaseComponent} from '@components/baseComponent.js';

import template from './stats.hbs';

/**
 * CategoriesView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class StatsView extends BaseComponent {

    constructor(parent) {
        super(undefined, template, parent);
    }

    /**
     * Renders the StatsView template to the parent element.
     * This method is responsible for rendering the csat stats page.
     *
     * @function
     */
    async render() {
        const templates = [
            template({
                questions:[
                    {
                        text: 'Насколько вам удобно пользоваться сервисом?',
                        result: 12,
                    },
                    {
                        text: 'Порекомендуете ли наш сервис своим друзьям и знакомым?',
                        result: 1,
                    }
                ]
            }),
        ];

        return super.render(templates);
    }
}
