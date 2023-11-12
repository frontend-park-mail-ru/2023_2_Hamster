import { BaseComponent } from '@components/baseComponent.js';

import template from './categories.hbs';
import { Button, Category, Input } from '@atoms';
import { categoriesStore } from '@stores/categoriesStore';
import { EVENT_TYPES } from '@constants/constants';
import { categoryActions } from '@actions/categoryActions';
import { userStore } from '@stores/userStore';

const BUTTON_STATE = {
    id: 'button',
    buttonText: 'Создать',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const INPUT_STATE = {
    id: 'input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Название категории',
};

/**
 * CategoriesView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class CategoriesView extends BaseComponent {

    constructor(parent) {
        super(undefined, template, parent);

        this.input = new Input(null, INPUT_STATE);
        this.button = new Button(null, BUTTON_STATE);

        categoriesStore.registerListener(EVENT_TYPES.RERENDER_CATEGORIES, this.render.bind(this));
    }

    /**
     * Renders the CategoriesView template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    async render() {
        if (!categoriesStore.storage.states) {
            await categoryActions.getCategories();
        }

        this.categories = this.createCategories(categoriesStore.storage.states);
        this.renderedCategories = this.renderCategories(this.categories);

        const templates = [
            template({
                input: this.input.render(),
                button: this.button.render(),
                categoriesList: this.renderedCategories,
            }),
        ];

        return super.render(templates);
    }

    createCategories = (arr) => {
        if (arr) {
            return arr.map(item => {
                return new Category(null, item, null);
            });
        }
    };

    renderCategories = (arr) => {
        if (arr) {
            return arr.map(item => {
                return { category: item.render() };
            });
        }
    };

    // TODO: add input validation
    setHandlers() {
        if (this.categories) {
            this.categories.forEach(category => {
                const categoryCard = document.querySelector(`#${category.getState().cardId}`);
                if (categoryCard) {
                    categoryCard.addEventListener('click', this.handleCardClick.bind(this, category));
                }

                const button = document.querySelector(`#${category.button.getState().id}`);
                if (button) {
                    button.addEventListener('click', this.updateButtonHandler.bind(this, category));
                }

                const deleteButton = document.querySelector(`#${category.getState().deleteId}`);
                if (deleteButton) {
                    deleteButton.addEventListener('click', this.deleteButtonHandler.bind(this, category));
                }
            });
        }

        const createButton = document.querySelector(this.button.getState().id);
        if (createButton) {
            createButton.addEventListener('click', this.createButtonHandler.bind(this));
        }
    }

    handleCardClick = (category, event) => {
        if (event.target.classList.contains('category__delete')) {
            return;
        }

        const isSettingsOpen = category.getState().settingsOpen;
        category.setState({ settingsOpen: !isSettingsOpen });

        const categoryCard = document.querySelector(`#${category.getState().id}`);
        categoryCard.outerHTML = category.render();

        this.setHandlers();
    };

    updateButtonHandler = async (category) => {
        const inputValue = document.querySelector(`#${category.input.getState().id}`).value;
        if (inputValue) {
            await categoryActions.updateCategory(category.getState().id.slice(2), inputValue, userStore.storage.user.id);
        }
    };

    deleteButtonHandler = async (category) => {
        await categoryActions.deleteCategory(category.getState().id.slice(2));
    };

    createButtonHandler = () => {
        const inputValue = document.querySelector(this.input.getState().id).value;
        if (inputValue) {
            categoryActions.createCategory(inputValue);
        }
    };
}
