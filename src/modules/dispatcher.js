import { actions } from '@constants/actions.js';

/**
 * Dispatcher class for registering, unregistering and dispatching actions.
 * singleton.
 *
 * @class
 * @property {Object} callbacks - An object where keys are action types and values are corresponding callbacks.
 * @property {boolean} isDispatching - A flag indicating whether the dispatcher is currently dispatching an action.
 */
class Dispatcher {
    callbacks;

    isDispatching;

    /**
     * Creates a new instance of Dispatcher.
     *
     * @constructor
     */
    constructor() {
        this.callbacks = {};
        this.isDispatching = false;

        actions.forEach((action) => this.register(action));
    }

    /**
     * Registers a callback for a given action type.
     *
     * @param {Object} action - The action to register.
     * @param {string} action.type - The type of the action.
     * @param {Function} action.method - The callback to be called when the action is dispatched.
     */
    register(action) {
        this.callbacks[action.type] = action.method;
    }

    /**
     * Unregisters a callback for a given action type.
     *
     * @param {string} type - The type of the action to unregister.
     */
    unregister(type) {
        if (this.callbacks.hasOwnProperty(type)) {
            delete this.callbacks[type];
        }
    }

    /**
     * Dispatches an action.
     * If the dispatcher is currently dispatching, it throws an error.
     *
     * @async
     * @param {Object} action - The action to dispatch.
     * @param {string} action.type - The type of the action to dispatch.
     * @param {Object} action.data - The data to be passed to the action's callback.
     * @throws {Error} If the dispatcher is currently dispatching.
     * @returns {undefined} Returns undefined if the action does not have a reducer or the action does not have a value.
     */
    async dispatch(action) {
        console.log('dispatch',action.data.password, action.data.repeatPassword);

        if (this.isDispatching) {
            throw new Error('Dispatcher: dispatch method must be run when Dispatcher is off');
        }

        this.isDispatching = true;

        try {
            const reducer = this.callbacks[action.type];

            if (!reducer) {
                return;
            }

            await reducer(action.data);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            this.isDispatching = false;
        }
    }
}

export const dispatcher = new Dispatcher();
