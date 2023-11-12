import { API_CONSTANTS, getTagURL } from '@constants/constants';
import { deleteRequest, get, post, put } from '@ajax';

class CategoryApi {
    getTags = () => {
        const url = API_CONSTANTS.GET_TAGS;
        return get(url);
    };

    createTag = (data) => {
        const url = API_CONSTANTS.CREATE_TAG;
        return post(url, data);
    };

    deleteTag = (id) => {
        const url = API_CONSTANTS.DELETE_TAG;
        return deleteRequest(url, id)
    }

    updateTag = async (id, data) => {
        const url = getTagURL(id) + API_CONSTANTS.UPDATE_TAG_TAIL;
        console.log(url, data);
        return await put(url, data);
    }
}

export const categoryApi = new CategoryApi();
