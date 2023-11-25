import { API_CONSTANTS, getBaseURL } from '@constants/constants';
import { get, post, put } from '@ajax';

class UserApi {
    /**
     * Retrieves the feed for a specified id.
     *
     * @async
     * @function getFeed
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    getFeed = async () => {
        const url = API_CONSTANTS.FEED;
        return await get(url);
    };

    putUpdate = async (userInfo) => {
        const url = API_CONSTANTS.UPDATE;
        return await put(url, userInfo);
    };
}

export const userApi = new UserApi();
