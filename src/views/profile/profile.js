import { BaseComponent } from '@components/baseComponent.js';
import { userStore } from '@stores/userStore';
import { userActions } from '@actions/userActions';

import template from './profile.hbs';
import { ButtonCard, Image, Input } from '@atoms';

const BEBRA = {
    planCard: 'okaaay',
}

/**
 * ProfileView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class ProfileView extends BaseComponent {

    #buttonCardPlan;

    #buttonCardShare;

    #buttonCardCategories;

    constructor(parent) {
        super(undefined, template, parent);

        this.#buttonCardPlan = new ButtonCard(null,undefined,null);
    }

    /**
     * Renders the Dashboard template to the parent element.
     * This method is responsible for rendering the card balance list, cards for planned and actual budget,
     * and then mapping these rendered HTML strings to their corresponding state keys.
     */
    renderTemplateToParent = () => {

        const card1 = this.#buttonCardPlan.render();

        const card2 = new ButtonCard(null, {text: 'Совместный доступ', description: ''}, null)

        const input = new Input();

        const avatar = new Image(null, {avatar: true, svg:null, imageSize: 'image-container_large'})

        const templates = [
            template({
                planCard: card1,
                shareCard: card2.render(),
                categoriesCard: card1,
                profileInput: input.render(),
                avatar: avatar.render(),
            }),
        ];

       return super.renderTemplateToParent(templates);
    };

}
