import { API_CONSTANTS, getBaseURL } from '../constants.js';

/**
 * Executes a GET request to the provided URL and returns the data in JSON format.
 *
 * @async
 * @param {string} url - The URL to which the request will be made.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} - If an error occurs during the request, an error object is thrown.
 */
export const get = async (url) => {
    const response = await fetch(url, { credentials: 'include' });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    return await response.json();
};

/**
 * Executes a POST request to the provided URL with the provided data and returns the data in JSON format.
 *
 * @async
 * @param {string} url - The URL to which the request will be made.
 * @param {Object} data - The data to be sent in the body of the request.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} - If an error occurs during the request, an error object is thrown.
 */
export const post = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    return await response.json();
};

/**
 * Executes a PATCH request to the provided URL with the provided data and returns the data in JSON format.
 *
 * @async
 * @param {string} url - The URL to which the request will be made.
 * @param {Object} data - The data to be sent in the body of the request.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} - If an error occurs during the request, an error object is thrown.
 */
export const patch = async (url, data) => {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    return await response.json();
};

/**
 * Executes a DELETE request to the provided URL and returns the data in JSON format.
 *
 * @async
 * @param {string} url - The URL to which the request will be made.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} - If an error occurs during the request, an error object is thrown.
 */
export const deleteRequest = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

/**
 * Executes a PUT request to the provided URL with the provided data and returns the data in JSON format.
 *
 * @async
 * @param {string} url - The URL to which the request will be made.
 * @param {Object} data - The data to be sent in the body of the request.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} - If an error occurs during the request, an error object is thrown.
 */
export const put = async (url, data) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    return await response.json();
};

/**
 * Makes a POST request to the sign in endpoint with the user's input.
 *
 * @async
 * @function signIn
 * @param {Object} userInput - An object containing the user's username and password.
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 * @example
 * signIn({username: 'test', password: 'password'})
 */
export const signIn = (userInput) => {
    const url = API_CONSTANTS.SIGN_IN;
    return post(url, userInput);
};

/**
 * Makes a POST request to the sign up endpoint with the user's information.
 *
 * @async
 * @function signUp
 * @param {Object} userInput - An object containing the user's information.
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 * @example
 * signUp({username: 'test', password: 'password'})
 */
export const signUp = (userInput) => {
    const url = API_CONSTANTS.SIGN_UP;
    return post(url, userInput);
};

/**
 * Makes a POST request to the log out endpoint.
 *
 * @async
 * @function logOut
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 */
export const logOut = () => {
    const url = API_CONSTANTS.LOG_OUT;
    return post(url, {});
};

/**
 * Makes a POST request to the check auth endpoint.
 *
 * @async
 * @function checkAuth
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 */
export const checkAuth = () => {
    const url = API_CONSTANTS.CHECK_AUTH;
    return post(url, null);
};

/**
 * Retrieves the balance for a specified id.
 *
 * @async
 * @function getBalance
 * @param {string} id - The id for which the balance will be retrieved.
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 */
export const getBalance = (id) => {
    const url = getBaseURL(id) + API_CONSTANTS.BALANCE_TAIL;
    return get(url);
};

/**
 * Retrieves the accounts for a specified id.
 *
 * @async
 * @function getAccounts
 * @param {string} id - The id for which the accounts will be retrieved.
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 */
export const getAccounts = (id) => {
    const url = getBaseURL(id) + API_CONSTANTS.ACCOUNTS_TAIL;
    return get(url);
};

/**
 * Retrieves the actual budget for a specified id.
 *
 * @async
 * @function getActualBudget
 * @param {string} id - The id for which the actual budget will be retrieved.
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 */
export const getActualBudget = (id) => {
    const url = getBaseURL(id) + API_CONSTANTS.ACTUAL_BUDGET_TAIL;
    return get(url);
};

/**
 * Retrieves the planned budget for a specified id.
 *
 * @async
 * @function getPlannedBudget
 * @param {string} id - The id for which the planned budget will be retrieved.
 * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} If an error occurs during the request, an error object is thrown.
 */
export const getPlannedBudget = (id) => {
    const url = getBaseURL(id) + API_CONSTANTS.PLANNED_BUDGET_TAIL;
    return get(url);
};
