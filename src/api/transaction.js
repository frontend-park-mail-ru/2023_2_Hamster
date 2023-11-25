import { API_CONSTANTS, getTransactionURL } from '@constants/constants';
import { deleteRequest, get, post, put } from '@ajax';

class TransactionApi {

    // TODO: remove hardcode url
    getTransaction = async () => {
        const url = API_CONSTANTS.GET_TRANSACTIONS + '?page=1&page_size=10';
        return await get(url);
    };

    createTransaction = async (data) => {
        const url = API_CONSTANTS.CREATE_TRANSACTION;
        return await post(url, data);
    };

    deleteTransaction = async (transaction_id) => {
        const url = getTransactionURL(transaction_id) + API_CONSTANTS.DELETE_TRANSACTION_TAIL;
        return await deleteRequest(url, null);
    };

    updateTransaction = async (data) => {
        const url = API_CONSTANTS.UPDATE_TRANSACTION;
        return await put(url, data);
    };
}

export const transactionsApi = new TransactionApi();
