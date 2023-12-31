import { API_CONSTANTS } from '@constants/constants';
import { get, put, putMulti } from '@ajax';

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

    getUser = async () => {
        const url = API_CONSTANTS.GET_USER;
        return await get(url);
    };

    putUpdate = async (userInfo) => {
        const url = API_CONSTANTS.UPDATE;
        return await put(url, userInfo);
    };

    putAvatar = async (photo, avatarPath) => {
        const url = API_CONSTANTS.UPDATE_AVATAR;

        const formData = new FormData();
        formData.append('upload', photo);
        formData.append('path', avatarPath);

        return await putMulti(url, formData);
    };
}

export const userApi = new UserApi();
