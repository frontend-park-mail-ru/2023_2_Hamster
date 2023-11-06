import { BaseComponent } from '@components/baseComponent.js';
import { userStore } from '@stores/userStore';
import { userActions } from '@actions/userActions';

import template from './profile.hbs';
import { Button, ButtonCard, Image, Input } from '@atoms';
import { SVG_ICONS } from '@icons/icons';

const PLAN_CARD_STATE = {
    cardColor: 'button-card_accent-color',
    description: 'Ваш план',
    text: 'Базовый',
    path: SVG_ICONS.box.path,
}

const SHARE_CARD_STATE = {
    cardColor: 'button-card_default-color',
    text: 'Совместный доступ',
    path: SVG_ICONS.people.path,
}

const CATEGORIES_CARD_STATE = {
    cardColor: 'button-card_default-color',
    description: 'Настройте свои',
    text: 'категории',
    path: SVG_ICONS.bookmark.path,
}

const USERNAME_INPUT_STATE = {
    isError: '',
    id: 'username_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Имя пользователя',
};

const CURRENT_PASSWORD_INPUT_STATE = {
    isError: '',
    id: 'current_password_input',
    inputSize: 'input_small',
    typeOfInput: 'password',
    inputPlaceholder: 'Текущий пароль',
};

const NEW_PASSWORD_INPUT_STATE = {
    isError: '',
    id: 'new_password_input',
    inputSize: 'input_small',
    typeOfInput: 'password',
    inputPlaceholder: 'Новый пароль',
};

const REPEAT_PASSWORD_INPUT_STATE = {
    isError: '',
    id: 'repeat_password_input',
    inputSize: 'input_small',
    typeOfInput: 'password',
    inputPlaceholder: 'Повтор пароля',
};

const BUDGET_INPUT_STATE = {
    isError: '',
    id: 'budget_input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Ваш бюджет на месяц',
};

const BUTTON_STATE = {
    buttonText: 'Сохранить изменения',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

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

        this.#buttonCardPlan = new ButtonCard(null, PLAN_CARD_STATE, null);
        this.#buttonCardShare = new ButtonCard(null, SHARE_CARD_STATE, null);
        this.#buttonCardCategories = new ButtonCard(null, CATEGORIES_CARD_STATE, null);

        this.#profileNameInput = new Input(null, USERNAME_INPUT_STATE, null);

        this.#currentPasswordInput = new Input(null, CURRENT_PASSWORD_INPUT_STATE, null);
        this.#newPasswordInput = new Input(null, NEW_PASSWORD_INPUT_STATE, null);
        this.#repeatPasswordInput = new Input(null, REPEAT_PASSWORD_INPUT_STATE, null);

        this.#budgetInput = new Input(null, BUDGET_INPUT_STATE, null);

        this.#avatar = new Image(null, {
            avatar: true,
            svg: null,
            imageSize: 'image-container_large',
        }, null);

        this.#saveButton = new Button(null, BUTTON_STATE, null);
    }

    /**
     * Renders the Dashboard template to the parent element.
     * This method is responsible for rendering the card balance list, cards for planned and actual budget,
     * and then mapping these rendered HTML strings to their corresponding state keys.
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
                login: 'bebra',
                avatar: this.#avatar.render(),
                saveButton: this.#saveButton.render(),
            }),
        ];

        return super.render(templates);
    }

}
