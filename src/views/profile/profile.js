import { BaseComponent } from '@components/baseComponent.js';
import { userStore } from '@stores/userStore';
import { Button, ButtonCard, Image, Input } from '@atoms';
import { userActions } from '@actions/userActions';

import template from './profile.hbs';
import { PROFILE_STATE, ROUTE_CONSTANTS } from '@constants/constants';
import { router } from '@router';

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

        // currently no handlers on backend server
        // this.#currentPasswordInput = new Input(null, PROFILE_STATE.CURRENT_PASSWORD_INPUT_STATE, null);
        // this.#newPasswordInput = new Input(null, PROFILE_STATE.NEW_PASSWORD_INPUT_STATE, null);
        // this.#repeatPasswordInput = new Input(null, PROFILE_STATE.REPEAT_PASSWORD_INPUT_STATE, null);

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
                // currentPasswordInput: this.#currentPasswordInput.render(),
                // newPasswordInput: this.#newPasswordInput.render(),
                // repeatPasswordInput: this.#repeatPasswordInput.render(),
                budgetInput: this.#budgetInput.render(),
                login: userStore.storage.user.login,
                avatar: this.#avatar.render(),
                saveButton: this.#saveButton.render(),
            }),
        ];

        return super.renderTemplateToParent(templates);
    };

    /**
     * Remove listeners from inputs and then set them up.
     *
     * @function
     */
    cleanUp() {
        const categoriesCard = document.querySelector('#categories_card');
        if (categoriesCard) {
            categoriesCard.removeEventListener('click', this.#buttonCardCategories.getHandler());
        }

        const profileNameInput = document.querySelector('#username_input');
        if (profileNameInput) {
            profileNameInput.removeEventListener('blur', this.#profileNameInput.getHandler());
        }

        // const currentPasswordInput = document.querySelector('#current_password_input');
        // if (currentPasswordInput) {
        //     currentPasswordInput.removeEventListener('blur', this.#currentPasswordInput.getHandler);
        // }
        //
        // const newPasswordInput = document.querySelector('#new_password_input');
        // if (newPasswordInput) {
        //     newPasswordInput.removeEventListener('blur', this.#newPasswordInput.getHandler);
        // }
        //
        // const repeatPasswordInput = document.querySelector('#repeat_password_input');
        // if (repeatPasswordInput) {
        //     repeatPasswordInput.removeEventListener('blur', this.#repeatPasswordInput.getHandler);
        // }

        const budgetInput = document.querySelector('#budget_input');
        if (budgetInput) {
            budgetInput.removeEventListener('blur', this.#budgetInput.getHandler());
        }

        const saveProfileButton = document.querySelector('#save_profile_button');
        if (saveProfileButton) {
            saveProfileButton.removeEventListener('click', this.#saveButton.getHandler());
        }

        this.setHandlers();
    }

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
                // currentPasswordInput: this.#currentPasswordInput.render(),
                // newPasswordInput: this.#newPasswordInput.render(),
                // repeatPasswordInput: this.#repeatPasswordInput.render(),
                budgetInput: this.#budgetInput.render(),
                login: userStore.storage.user.login,
                avatar: this.#avatar.render(),
                saveButton: this.#saveButton.render(),
            }),
        ];

        this.setHandlers();

        return super.render(templates);
    }

    /**
     * Rerender password input without loosing it value.
     *
     * @function
     */
    // renderNewPassword = () => {
    //     this.cleanUp();
    //
    //     this.#newPasswordInput.setState(userStore.storage.passwordState);
    //
    //     const newPasswordContainer = document.querySelector('#new_password_input_container');
    //     newPasswordContainer.innerHTML = this.#newPasswordInput.render();
    //
    //     const passwordInput = document.querySelector('#new_password_input');
    //     passwordInput.addEventListener('blur', this.newPasswordInputHandler);
    //
    //     document.querySelector('#new_password_input').value = userStore.storage.passwordState.password;
    // };

    /**
     * Rerender password repeat input without loosing it value.
     *
     * @function
     */
    // renderRepeatPassword = () => {
    //     this.cleanUp();
    //
    //     this.#repeatPasswordInput.setState(userStore.storage.repeatState);
    //
    //     const repeatPasswordContainer = document.querySelector('#repeat_password_input_container');
    //     repeatPasswordContainer.innerHTML = this.#repeatPasswordInput.render();
    //
    //     const repeatPasswordInput = document.querySelector('#repeat_password_input');
    //     repeatPasswordInput.addEventListener('blur', this.repeatPasswordInputHandler);
    //
    //     document.querySelector('#repeat_password_input').value = userStore.storage.repeatState.passwordRepeat;
    // };

    setHandlers() {
        const categoriesCard = document.querySelector('#categories_card');
        if (categoriesCard) {
            this.#buttonCardCategories.setHandler(this.categoriesButtonHandler);
            categoriesCard.addEventListener('click', this.#buttonCardCategories.getHandler());
        }

        // TODO: maybe add validation if necessary (now it can be even smiles, i think it's normal behaviour)
        const profileNameInput = document.querySelector('#username_input');
        if (profileNameInput) {
            this.#profileNameInput.setHandler();
            profileNameInput.addEventListener('blur', this.#profileNameInput.getHandler());
        }

        // const currentPasswordInput = document.querySelector('#current_password_input');
        // if (currentPasswordInput) {
        //     this.#currentPasswordInput.setHandlers();
        //     currentPasswordInput.addEventListener('blur', this.#currentPasswordInput.getHandler);
        // }
        //
        // const newPasswordInput = document.querySelector('#new_password_input');
        // if (newPasswordInput) {
        //     this.#newPasswordInput.setHandler();
        //     newPasswordInput.addEventListener('blur', this.#newPasswordInput.getHandler);
        // }
        //
        // const repeatPasswordInput = document.querySelector('#repeat_password_input');
        // if (repeatPasswordInput) {
        //     this.#repeatPasswordInput.setHandler();
        //     repeatPasswordInput.addEventListener('blur', this.#repeatPasswordInput.getHandler);
        // }

        // can be only number, so not sure about validation of this handler
        const budgetInput = document.querySelector('#budget_input');
        if (budgetInput) {
            this.#budgetInput.setHandler();
            budgetInput.addEventListener('blur', this.#budgetInput.getHandler());
        }

        const saveProfileButton = document.querySelector('#save_profile_button');
        if (saveProfileButton) {
            this.#saveButton.setHandler(this.saveButtonHandler);
            saveProfileButton.addEventListener('click', this.#saveButton.getHandler());
        }
    }

    categoriesButtonHandler = () => {
        router.navigateTo(ROUTE_CONSTANTS.CATEGORIES)
    };

    saveButtonHandler = () => {
        console.log(12);
        const username = document.querySelector('#username_input').value;
        const budget = document.querySelector('#budget_input').value;
        userActions.updateProfile(budget, username);
    }
}
