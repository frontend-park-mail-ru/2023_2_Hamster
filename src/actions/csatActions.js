import { CATEGORY_ACTIONS, CSAT_ACTIONS } from '@constants/actions';
import { dispatcher } from '../modules/dispatcher.js';

export const categoryActions = {
    async getStats() {
        await dispatcher.dispatch({
            type: CSAT_ACTIONS.GET,
            data: {},
        });
    },

    async postCsat(name, rating) {
        await dispatcher.dispatch({
            type: CSAT_ACTIONS.POST,
            data: {
                name,
                rating,
            },
        });
    },
};
