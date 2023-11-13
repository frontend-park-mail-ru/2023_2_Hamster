import { API_CONSTANTS } from '@constants/constants';
import { get } from '@ajax';

class CsrfAPI{
    /**
     * Makes a GET request to the get csrf token endpoint.
     *
     * @async
     * @function
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getCsrfToken = () => {
        const url = API_CONSTANTS.CSRF;
        return get(url);
    };
}

export const csrfApi = new CsrfAPI();
