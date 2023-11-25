import { API_CONSTANTS } from '@constants/constants';
import { post } from '@ajax';

class AuthApi {
    /**
     * Makes a POST request to the check auth endpoint.
     *
     * @async
     * @function checkAuth
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    checkAuth = async () => {
        const url = API_CONSTANTS.CHECK_AUTH;
        return await post(url, null);
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
    signIn = async (userInput) => {
        const url = API_CONSTANTS.SIGN_IN;
        return await post(url, userInput);
    };

    /**
     * Makes a POST request to the signup endpoint with the user's information.
     *
     * @async
     * @function signUp
     * @param {Object} userInput - An object containing the user's information.
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     * @example
     * signUp({username: 'test', password: 'password'})
     */
    signUp = async (userInput) => {
        const url = API_CONSTANTS.SIGN_UP;
        return await post(url, userInput);
    };

    /**
     * Makes a POST request to the logout endpoint.
     *
     * @async
     * @function logOut
     * @returns {Promise<Object>} Returns a Promise that resolves to the data in JSON format.
     * @throws {Error} If an error occurs during the request, an error object is thrown.
     */
    logOut = () => {
        const url = API_CONSTANTS.LOG_OUT;
        return post(url, {});
    };
}

export const authApi = new AuthApi();
