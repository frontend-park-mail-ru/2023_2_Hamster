import { categoryApi } from '@api/category';
import { EVENT_TYPES } from '@constants/constants';
import { CATEGORY_NAME_RULES } from '@constants/validation';
import { SVG_ICONS } from '@icons/icons';
import { validator } from '../modules/validator';

import BaseStore from './baseStore.js';

/**
 *
 * @class
 * @extends BaseStore
 */
class CategoriesStore extends BaseStore {

    /**
     * Creates an instance of UserStore.
     *
     * @constructor
     * @property {Object} storage - An object that contains the state of the user.
     * @property {string|null} storage.error - An error message, if any.
     */
    constructor() {
        super();
        this.storage = {};
    }

    /**
     * Get all categories.
     *
     * @async
     * @function
     */
    getTags = async () => {
        try {
            const response = await categoryApi.getTags();

            if (response.body) {
                this.storage.states = this.transformArray(response.body);
                this.storage.tags = response.body;

                this.categoriesValues = this.storage.tags.map((item) => ({
                    value: item.id,
                    valueName: item.name,
                }));
            }
        } catch (error) {
            this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, категории не были загружены' };
        }
    };

    transformArray = (arr) => arr.map((data) => ({
        raw: data.id,
        id: `id${data.id}`,
        categoryName: data.name,
        deleteId: `delete_${data.id}`,
        cardId: `card_${data.id}`,
        path: Object.values(SVG_ICONS)[data.image_id].path,
    }));

    createTag = async (data) => {
        if (!this.isError(data)) {
            try {
                const response = await categoryApi.createTag(data);

                this.storage.states.push({
                    raw: response.body.category_id,
                    id: `id${response.body.category_id}`,
                    categoryName: data.name,
                    deleteId: `delete_${response.body.category_id}`,
                    cardId: `card_${response.body.category_id}`,
                    path: Object.values(SVG_ICONS)[data.image_id].path,
                });

                this.notify = { success: true, notifierText: 'Категория была создана' };
            } catch (error) {
                this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не удалось создать категорию' };
            }
        }

        this.emitChange(EVENT_TYPES.RERENDER_CATEGORIES);
        this.clearError();
    };

    deleteTag = async (data) => {
        try {
            await categoryApi.deleteTag(data);

            this.storage.states = this.storage.states.filter((item) => item.raw !== data.id);

            this.notify = { success: true, notifierText: 'Категория удалена' };
        } catch (error) {
            this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не удалось удалить категорию' };
        }

        this.emitChange(EVENT_TYPES.RERENDER_CATEGORIES);
    };

    updateTag = async (data) => {
        if (!this.isError(data)) {
            try {
                const response = await categoryApi.updateTag(this.storage.tags[0].id, data);

                this.storage.states = this.storage.states.map((item) => {
                    if (item.raw === response.body.id) {
                        return {
                            raw: response.body.id,
                            id: `id${response.body.id}`,
                            categoryName: response.body.name,
                            deleteId: `delete_${response.body.id}`,
                            cardId: `card_${response.body.id}`,
                            path: Object.values(SVG_ICONS)[data.image_id].path,
                        };
                    }
                    return item;
                });
                this.updated = true;
                this.notify = { success: true, notifierText: 'Категория изменена' };
            } catch (error) {
                this.notify = { error: true, notifierText: 'Возникла непредвиденная ошибка, не удалось обновить категорию' };
            }
        }

        this.emitChange(EVENT_TYPES.RERENDER_CATEGORIES);
        this.clearError();
    };

    isError = (data) => {
        const nameValidation = validator(data.name, CATEGORY_NAME_RULES);

        this.nameInput = {
            idError: data.id,
            value: data.name,
            isError: nameValidation.isError,
            inputHelperText: nameValidation.message,
        };

        return nameValidation.isError;
    };

    clearError = () => {
        this.nameInput = { idError: null, isError: null, inputHelperText: null };
    };

}

export const categoriesStore = new CategoriesStore();
