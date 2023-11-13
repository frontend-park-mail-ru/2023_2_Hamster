import { API_CONSTANTS, getBaseURL } from '@constants/constants';
import { get, post, put, putMulti } from '@ajax';

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

    putUpdate = (userInfo) => {
        const url = API_CONSTANTS.UPDATE;
        return put(url, userInfo);
    };

    putAvatar = (photo) => {
        const url = API_CONSTANTS.UPDATE_AVATAR
        return putMulti(url, photo)
    }
}

export const userApi = new UserApi();
