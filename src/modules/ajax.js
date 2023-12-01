import { API_CONSTANTS } from '@constants/constants.js';
import { csrfApi } from '@api/csrf';

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
    let response;
    if(url === API_CONSTANTS.SIGN_IN || url === API_CONSTANTS.SIGN_UP || url === API_CONSTANTS.CHECK_AUTH) {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
    } else {
        const csrfToken = await csrfApi.getCsrfToken();

        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRF-Token': csrfToken.body.csrf,
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
    }

    // if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    // }

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
    const csrfToken = await csrfApi.getCsrfToken();

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-CSRF-Token': csrfToken.body.csrf,
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
 * @param {Object} data - The data to be sent in the body of the request.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the data in JSON format.
 * @throws {Error} - If an error occurs during the request, an error object is thrown.
 */
export const deleteRequest = async (url, data) => {
    const csrfToken = await csrfApi.getCsrfToken();

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'X-CSRF-Token': csrfToken.body.csrf,
        },
        body: JSON.stringify(data),
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
    const csrfToken = await csrfApi.getCsrfToken();

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-CSRF-Token': csrfToken.body.csrf,
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


export const putMulti = async (url, data) => {
    console.log(data)
    const csrfToken = await csrfApi.getCsrfToken();

    let body;
    const boundary = String(Math.random()).slice(2);
    const boundaryMiddle = `--${boundary}\r\n`;
    const boundaryLast = `--${boundary}--\r\n`;
    body = ['\r\n'];
    for (let key in data.filename) {
        body.push(`Content-Disposition: form-data; name="${key}"\r\n\r\n${data[key]}\r\n`);
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': `multipart/form-data; boundary=${boundary}`,
            'X-CSRF-Token': csrfToken.body.csrf,
        },
        body: data,
        credentials: 'include',
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    return await response.json();
}

