'use strict';

/**
 * Executes a GET request to the provided URL and returns the data in JSON format.
 *
 * @async
 * @param {string} url - The URL to which the request will be made.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} - If an error occurs during the request, an error object is thrown.
 */
export const get = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

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
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

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
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

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
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

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
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
