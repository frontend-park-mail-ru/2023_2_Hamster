import { API_CONSTANTS, getBaseURL } from '@constants/constants';
import { get, post, put } from '@ajax';

class UserApi {
    /**
     * Retrieves the balance for a specified id.
     *
     * @async
     * @function getBalance
     * @param {string} id - The id for which the balance will be retrieved.
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getBalance = (id) => {
        const url = getBaseURL(id) + API_CONSTANTS.BALANCE_TAIL;
        return get(url);
    };

    /**
     * Retrieves the accounts for a specified id.
     *
     * @async
     * @function getAccounts
     * @param {string} id - The id for which the accounts will be retrieved.
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getAccounts = (id) => {
        const url = getBaseURL(id) + API_CONSTANTS.ACCOUNTS_TAIL;
        return get(url);
    };

    /**
     * Retrieves the actual budget for a specified id.
     *
     * @async
     * @function getActualBudget
     * @param {string} id - The id for which the actual budget will be retrieved.
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getActualBudget = (id) => {
        const url = getBaseURL(id) + API_CONSTANTS.ACTUAL_BUDGET_TAIL;
        return get(url);
    };

    /**
     * Retrieves the planned budget for a specified id.
     *
     * @async
     * @function getPlannedBudget
     * @param {string} id - The id for which the planned budget will be retrieved.
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getPlannedBudget = (id) => {
        const url = getBaseURL(id) + API_CONSTANTS.PLANNED_BUDGET_TAIL;
        return get(url);
    };

    /**
     * Retrieves the feed for a specified id.
     *
     * @async
     * @function getFeed
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getFeed = (id) => {
        const url = getBaseURL + API_CONSTANTS.FEED_TAIL;
        return get(url);
    };

    putUpdate = (userInfo) => {
        const url = getBaseURL + API_CONSTANTS.UPDATE_TAIL;
        return put(url, userInfo);
    };
}

export const userApi = new UserApi();
