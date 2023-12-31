import { BaseComponent } from '@components/baseComponent.js';

import { Button, Category, Input } from '@atoms';
import { categoriesStore } from '@stores/categoriesStore';
import { categoryActions } from '@actions/categoryActions';
import { userStore } from '@stores/userStore';
import { Checkbox } from '@atoms/checkbox/checkbox';
import template from './categories.hbs';

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

const INCOME = {
    id: 'income',
    label: 'В доходах',
};

const OUTCOME = {
    id: 'outcome',
    label: 'В расходах',
};

/**
 * CategoriesView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class CategoriesView extends BaseComponent {

    constructor(parent) {
        super(undefined, template, parent);

        this.name = new Input(null, INPUT_STATE);
        this.button = new Button(null, BUTTON_STATE);
        this.incomeCheckbox = new Checkbox(null, INCOME, null);
        this.outcomeCheckbox = new Checkbox(null, OUTCOME, null);
    }

    /**
     * Renders the CategoriesView template to the parent element.
     * This method is responsible for rendering the categories page.
     *
     * @function
     */
    async render() {
        if (!categoriesStore.storage.states) {
            await categoryActions.getCategories();
        }

        this.categories = this.createCategories(categoriesStore.storage.states);
        if (categoriesStore.nameInput) {
            if (categoriesStore.nameInput.idError) {
                const category = this.categories.find((tag) => tag.getState().raw === categoriesStore.nameInput.idError);
                category.setState({ settingsOpen: true });
                category.input.setState(categoriesStore.nameInput);
            } else {
                this.name.setState(categoriesStore.nameInput);
            }
        }
        this.renderedCategories = this.renderCategories(this.categories);

        const templates = [
            template({
                name: this.name.render(),
                button: this.button.render(),
                // income: this.incomeCheckbox.render(),
                // outcome: this.outcomeCheckbox.render(),
                categoriesList: this.renderedCategories,
            }),
        ];

        return super.render(templates);
    }

    createCategories = (arr) => {
        if (arr) {
            return arr.map((item) => new Category(null, item, null));
        }

        return [];
    };

    renderCategories = (arr) => {
        if (arr) {
            return arr.map((item) => ({ category: item.render() }));
        }

        return [];
    };

    // TODO: add input validation
    setHandlers() {
        if (this.categories) {
            this.categories.forEach((category) => {
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

        const createButton = document.querySelector('#button');
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

    createButtonHandler = async () => {
        const inputValue = document.querySelector(this.name.getState().id).value;
        if (inputValue) {
            await categoryActions.createCategory(inputValue, userStore.storage.user.id);
        }
    };
}
