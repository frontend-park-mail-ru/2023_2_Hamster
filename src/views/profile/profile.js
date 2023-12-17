import { BaseComponent } from '@components/baseComponent.js';
import { userStore } from '@stores/userStore';
import {
    Button, ButtonCard, Image, Input
} from '@atoms';
import { userActions } from '@actions/userActions';

import {
    DEFAULT_AVATAR, NULL_UUID, PROFILE_STATE, ROUTE_CONSTANTS
} from '@constants/constants';
import { categoryActions } from '@actions/categoryActions';
import { router } from '@router';
import template from './profile.hbs';

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

    #imageInput;

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

        this.#imageInput = new Input(null, PROFILE_STATE.IMAGE_INPUT_STATE, null);

        this.#saveButton = new Button(null, PROFILE_STATE.BUTTON_STATE, null);
    }

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

        const imageInput = document.querySelector('#image_profile_input');
        if (imageInput) {
            imageInput.removeEventListener('blur', this.#imageInput.getHandler());
        }
    }

    /**
     * Renders the Profile template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    render = async () => {
        if (!userStore.storage.feed) {
            await userStore.feed();
        }

        const { avatarPath } = userStore.storage.user;
        if (avatarPath === NULL_UUID) {
            this.#avatar.setState({ avatar: DEFAULT_AVATAR });
        } else {
            this.#avatar.setState({ avatar: `../images/${avatarPath}.jpg` });
        }

        this.#profileNameInput.setState({ value: userStore.storage.user.username });

        if (userStore.storage.feed.plannedBudget) {
            this.#budgetInput.setState({ value: userStore.storage.feed.plannedBudget });
        }

        const inputMapping = {
            nameInput: this.#profileNameInput,
            budgetInput: this.#budgetInput,
            oldPasswordInput: this.#currentPasswordInput,
            newPasswordInput: this.#newPasswordInput,
            repeatPasswordInput: this.#repeatPasswordInput
        };

        if (userStore.inputs) {
            Object.keys(inputMapping).forEach((inputElement) => {
                if (userStore.inputs[inputElement]) {
                    inputMapping[inputElement].setState(userStore.inputs[inputElement]);
                    console.log(userStore.inputs[inputElement]);
                }
            });
        }

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
                imageInput: this.#imageInput.render(),
                saveButton: this.#saveButton.render(),
            }),
        ];

        this.setHandlers();

        return super.render(templates);
    };

    setHandlers() {
        const categoriesCard = document.querySelector('#categories_card');
        if (categoriesCard) {
            this.#buttonCardCategories.setHandler(this.categoriesButtonHandler);
            categoriesCard.addEventListener('click', this.#buttonCardCategories.getHandler().bind(this));
        }

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

        const imageInput = document.querySelector('#upload-form');
        if (imageInput) {
            this.#imageInput.setHandler(this.changeImageHandler);
            imageInput.addEventListener('click', this.#imageInput.getHandler());
        }
    }

    categoriesButtonHandler = async () => {
        await categoryActions.getCategories();
        await router.navigateTo(ROUTE_CONSTANTS.CATEGORIES, false);
    };

    saveButtonHandler = () => {
        const username = document.querySelector('#username_input').value;
        const budget = document.querySelector('#budget_input').value;

        const newPassword = document.querySelector(`#${this.#newPasswordInput.getState().id}`).value;
        const oldPassword = document.querySelector(`#${this.#currentPasswordInput.getState().id}`).value;
        const repeatPassword = document.querySelector(`#${this.#repeatPasswordInput.getState().id}`).value;

        userActions.updateProfile(budget, username, newPassword, oldPassword, repeatPassword);
    };

    changeImageHandler = () => {
        const fileInput = document.getElementById('image_profile_input');
        fileInput.click();
        fileInput.onchange = () => {
            const file = fileInput.files[0];
            const selectName = document.getElementsByClassName('upload-form__filename')[0];
            selectName.innerHTML = file.name;
            userActions.updateAvatar(file);
        };
    };
}
