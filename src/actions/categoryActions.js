import { CATEGORY_ACTIONS } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const categoryActions = {
    async getCategories() {
        await dispatcher.dispatch({
            type: CATEGORY_ACTIONS.GET_CATEGORIES,
            data: {},
        });
    },

    async createCategory(name, userId) {
        await dispatcher.dispatch({
            type: CATEGORY_ACTIONS.CREATE_CATEGORY,
            data: {
                name,
                parent_id: '00000000-0000-0000-0000-000000000000',
                regular: false,
                show_income: true,
                show_outcome: true,
                user_id: userId,
            },
        });
    },

    async updateCategory(id, name, userId) {
        await dispatcher.dispatch({
            type: CATEGORY_ACTIONS.UPDATE_CATEGORY,
            data: {
                id,
                name,
                parent_id: '00000000-0000-0000-0000-000000000000',
                regular: false,
                show_income: true,
                show_outcome: true,
                user_id: userId,
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
