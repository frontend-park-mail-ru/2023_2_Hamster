import { API_CONSTANTS, getTransactionURL } from '@constants/constants';
import { deleteRequest, get, post, put } from '@ajax';

class TransactionApi {

    // TODO: remove hardcode url
    getTransaction = () => {
        const url = API_CONSTANTS.GET_TRANSACTIONS + '?page=1&page_size=10';
        return get(url);
    };

    createTransaction = (data) => {
        const url = API_CONSTANTS.CREATE_TRANSACTION;
        return post(url, data);
    };

    deleteTransaction = (id) => {
        const url = getTransactionURL(id) + API_CONSTANTS.DELETE_TRANSACTION_TAIL;
        return deleteRequest(url, null);
    };

    updateTransaction = (data) => {
        const url = API_CONSTANTS.UPDATE_TRANSACTION;
        return put(url, data);
    };
}

export const transactionsApi = new TransactionApi();
