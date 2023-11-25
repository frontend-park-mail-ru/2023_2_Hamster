import BaseStore from './baseStore.js';
import { csatApi } from '@api/csat';
import { EVENT_TYPES } from '@constants/constants';

/**
 *
 * @class
 * @extends BaseStore
 */
class CsatStore extends BaseStore {

    /**
     * Creates an instance of csatStore.
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
    getStats = async () => {
        try {
            const response = await csatApi.getStats();

            if (response.body) {
                this.storage.results = response.body;
                this.storeChanged = true;
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    post = async (data) => {
        try {
            const response = await csatApi.postCsat(data);

            this.storeChanged = true;
            this.emitChange(EVENT_TYPES.NEXT_QUESTION);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

}

export const csatStore = new CsatStore();
