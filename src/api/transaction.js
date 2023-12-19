import { API_CONSTANTS, getTransactionURL } from '@constants/constants';
import {
    deleteRequest, get, post, put
} from '@ajax';

class TransactionApi {

    createTransaction = async (data) => {
        const url = API_CONSTANTS.CREATE_TRANSACTION;
        return await post(url, data);
    };

    getTransaction = async (qString) => {
        if (!qString) {
            const url = API_CONSTANTS.GET_TRANSACTIONS;
            return await get(url);
        }
        const url = API_CONSTANTS.GET_TRANSACTIONS + qString;
        return await get(url);
    };

    deleteTransaction = async (transactionId) => {
        const url = getTransactionURL(transactionId) + API_CONSTANTS.DELETE_TRANSACTION_TAIL;
        return await deleteRequest(url, null);
    };

    updateTransaction = async (data) => {
        const url = API_CONSTANTS.UPDATE_TRANSACTION;
        return await put(url, data);
    };
}

export const transactionsApi = new TransactionApi();
