import { BaseComponent } from '@components/baseComponent.js';
import { userStore } from '@stores/userStore';
import { Button, ButtonCard, Image, Input } from '@atoms';
import { SVG_ICONS } from '@icons/icons';
import { userActions } from '@actions/userActions';

import template from './profile.hbs';
import { PROFILE_STATE } from '@constants/constants';

/**
 * ProfileView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class ProfileView extends BaseComponent {

    #buttonCardPlan;

    #buttonCardShare;

    #buttonCardCategories;

    #profileNameInput;

    #currentPasswordInput;
    #newPasswordInput;
    #repeatPasswordInput;

    #budgetInput;

    #avatar;

    #saveButton;

    constructor(parent) {
        super(undefined, template, parent);

        this.#buttonCardPlan = new ButtonCard(null, PROFILE_STATE.PLAN_CARD_STATE, null);
        this.#buttonCardShare = new ButtonCard(null, PROFILE_STATE.SHARE_CARD_STATE, null);
        this.#buttonCardCategories = new ButtonCard(null, PROFILE_STATE.CATEGORIES_CARD_STATE, null);

        this.#profileNameInput = new Input(null, PROFILE_STATE.USERNAME_INPUT_STATE, null);

        this.#currentPasswordInput = new Input(null, PROFILE_STATE.CURRENT_PASSWORD_INPUT_STATE, null);
        this.#newPasswordInput = new Input(null, PROFILE_STATE.NEW_PASSWORD_INPUT_STATE, null);
        this.#repeatPasswordInput = new Input(null, PROFILE_STATE.REPEAT_PASSWORD_INPUT_STATE, null);

        this.#budgetInput = new Input(null, PROFILE_STATE.BUDGET_INPUT_STATE, null);

        this.#avatar = new Image(null, PROFILE_STATE.AVATAR, null);

        this.#saveButton = new Button(null, PROFILE_STATE.BUTTON_STATE, null);
    }

    /**
     * Renders the Profile template to the parent element.
     * This method is responsible for rendering the profile setting page to the parent element.
     *
     * @function
     */
    renderTemplateToParent = () => {
        const templates = [
            template({
                planCard: this.#buttonCardPlan.render(),
                shareCard: this.#buttonCardShare.render(),
                categoriesCard: this.#buttonCardCategories.render(),
                profileNameInput: this.#profileNameInput.render(),
                currentPasswordInput: this.#currentPasswordInput.render(),
                newPasswordInput: this.#newPasswordInput.render(),
                repeatPasswordInput: this.#repeatPasswordInput.render(),
                budgetInput: this.#budgetInput.render(),
                login: 'bebra',
                avatar: this.#avatar.render(),
                saveButton: this.#saveButton.render(),
            }),
        ];

        return super.renderTemplateToParent(templates);
    };

    /**
     * Renders the Profile template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    render() {
        const templates = [
            template({
                planCard: this.#buttonCardPlan.render(),
                shareCard: this.#buttonCardShare.render(),
                categoriesCard: this.#buttonCardCategories.render(),
                profileNameInput: this.#profileNameInput.render(),
                currentPasswordInput: this.#currentPasswordInput.render(),
                newPasswordInput: this.#newPasswordInput.render(),
                repeatPasswordInput: this.#repeatPasswordInput.render(),
                budgetInput: this.#budgetInput.render(),
                login: userStore.storage.user.login,
                avatar: this.#avatar.render(),
                saveButton: this.#saveButton.render(),
            }),
        ];

        return super.render(templates);
    }

}
