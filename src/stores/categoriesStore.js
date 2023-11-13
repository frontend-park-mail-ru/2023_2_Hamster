import BaseStore from './baseStore.js';
import { categoryApi } from '@api/category';
import { EVENT_TYPES, ROUTE_CONSTANTS } from '@constants/constants';
import { router } from '@router';

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
                console.log(response.body);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    transformArray = (arr) => {
        return arr.map(data => {
            return {
                raw: data.id,
                id: 'id' + data.id,
                categoryName: data.name,
                deleteId: 'delete_' + data.id,
                cardId: 'card_' + data.id,
            };
        });
    };

    createTag = async (data) => {
        try {
            const response = await categoryApi.createTag(data);

            this.storage.states.push({
                id: 'id' + response.category_id,
                categoryName: data.name,
                deleteId: 'delete_' + response.category_id,
                cardId: 'card_' + response.category_id,
            });
            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_CATEGORIES);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    deleteTag = async (data) => {
        try {
            await categoryApi.deleteTag(data);

            this.storage.states = this.storage.states.filter(item => item.raw !== data.id);
            console.log(this.storage.states);
            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_CATEGORIES);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    updateTag = async (data) => {
        try {
            const response = await categoryApi.updateTag(this.storage.tags[0].id, data);

            this.storage.states.map(item => {
                if (item.id === response.id) {
                    return {
                        id: 'id' + response.id,
                        categoryName: response.name,
                        deleteId: 'delete_' + response.id,
                        cardId: 'card_' + response.id,
                    };
                }
                return item;
            });
            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_CATEGORIES);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };
}

export const categoriesStore = new CategoriesStore();
