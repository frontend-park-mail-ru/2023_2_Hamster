import { API_CONSTANTS, getAccountURL } from '@constants/constants';
import {
    deleteRequest, get, post, put
} from '@ajax';

class AccountApi {
    getAccounts = async () => {
        const url = API_CONSTANTS.GET_ACCOUNTS;
        return await get(url);
    };

    createAccount = async (data) => {
        const url = API_CONSTANTS.CREATE_ACCOUNT;
        return await post(url, data);
    };

    deleteAccount = async (accountId) => {
        const url = getAccountURL(accountId) + API_CONSTANTS.DELETE_ACCOUNT_TAIL;
        return await deleteRequest(url, null);
    };

    updateAccount = async (data) => {
        const url = API_CONSTANTS.UPDATE_ACCOUNT;
        return await put(url, data);
    };

    addUserInAccount = async (data) => {
        const url = API_CONSTANTS.ADD_USER_IN_ACCOUNT;
        return await post(url, data);
    };
}

export const accountApi = new AccountApi();
