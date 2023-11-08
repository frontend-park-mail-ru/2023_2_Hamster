import { CATEGORY_ACTIONS } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const categoryActions = {
    getCategories() {
        dispatcher.dispatch({
            type: CATEGORY_ACTIONS.GET_CATEGORIES,
            data: {},
        });
    },

    createCategory(name) {
        dispatcher.dispatch({
            type: CATEGORY_ACTIONS.CREATE_CATEGORY,
            data: {
                name,
            },
        });
    },

    updateCategory(id, name) {
        dispatcher.dispatch({
            type: CATEGORY_ACTIONS.UPDATE_CATEGORY,
            data: {
                id,
                name,
            },
        });
    },

    deleteCategory(id) {
        dispatcher.dispatch({
            type: CATEGORY_ACTIONS.DELETE_CATEGORY,
            data: {
                id,
            },
        });
    },

};
