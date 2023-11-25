import { API_CONSTANTS } from '@constants/constants';
import { get, post } from '@ajax';

class CsatAPI{
    /**
     * Makes a GET request to the csat endpoint.
     *
     * @async
     * @function
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getStats = async () => {
        const url = API_CONSTANTS.GET_CSAT;
        return await get(url);
    };

    /**
     * Makes a POST request to the post csat endpoint.
     *
     * @async
     * @function checkAuth
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    postCsat = async (data) => {
        const url = API_CONSTANTS.POST_CSAT;
        return await post(url, data);
    };
}

export const csatApi = new CsatAPI();
