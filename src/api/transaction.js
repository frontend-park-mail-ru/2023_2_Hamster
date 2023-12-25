import { API_CONSTANTS, getTransactionURL } from '@constants/constants';
import {
    deleteRequest, get, post, postMulti, put
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

    csvExport = async () => {
        const url = API_CONSTANTS.CSV_EXPORT;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    };

    csvImport = async (data) => {
        const url = API_CONSTANTS.CSV_IMPORT;
        const formData = new FormData();
        formData.append('csvFile', data.file);

        return postMulti(url, formData);
    };
}

export const transactionsApi = new TransactionApi();
