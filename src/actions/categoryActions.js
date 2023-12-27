import { CATEGORY_ACTIONS } from '@constants/actions';
import { NULL_UUID } from '@constants/constants';
import { dispatcher } from '../modules/dispatcher.js';

export const categoryActions = {
    async getCategories() {
        await dispatcher.dispatch({
            type: CATEGORY_ACTIONS.GET_CATEGORIES,
            data: {},
        });
    },

    async createCategory(name, userId, imageId) {
        await dispatcher.dispatch({
            type: CATEGORY_ACTIONS.CREATE_CATEGORY,
            data: {
                name,
                parent_id: NULL_UUID,
                regular: false,
                show_income: true,
                show_outcome: true,
                user_id: userId,
                image_id: imageId,
            },
        });
    },

    async updateCategory(id, name, userId, imageId) {
        await dispatcher.dispatch({
            type: CATEGORY_ACTIONS.UPDATE_CATEGORY,
            data: {
                id,
                name,
                parent_id: NULL_UUID,
                regular: false,
                show_income: true,
                show_outcome: true,
                user_id: userId,
                image_id: imageId,
            },
        });
    },

    async deleteCategory(id) {
        await dispatcher.dispatch({
            type: CATEGORY_ACTIONS.DELETE_CATEGORY,
            data: {
                id,
            },
        });
    },

};
