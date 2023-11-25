import { API_CONSTANTS, getTagURL } from '@constants/constants';
import { deleteRequest, get, post, put } from '@ajax';

class CategoryApi {
    getTags = async () => {
        const url = API_CONSTANTS.GET_TAGS;
        return await get(url);
    };

    createTag = async (data) => {
        const url = API_CONSTANTS.CREATE_TAG;
        return await post(url, data);
    };

    deleteTag = async (id) => {
        const url = API_CONSTANTS.DELETE_TAG;
        return await deleteRequest(url, id)
    }

    updateTag = async (id, data) => {
        const url = getTagURL(id) + API_CONSTANTS.UPDATE_TAG_TAIL;
        return await put(url, data);
    }
}

export const categoryApi = new CategoryApi();
