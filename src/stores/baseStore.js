import { NULL } from 'sass';
import { eventBus } from '../modules/eventBus';

/**
 * BaseStore class for managing application state.
 *
 * @class
 * @property {Object} storage - An object for storing state.
 */
export default class BaseStore {
    storage;

    /**
     * Creates a new instance of BaseStore.
     *
     * @constructor
     */
    constructor() {
        this.storage = {};
        this.notify = {
            notifierText: null,
            error: null,
            warning: null,
            success: null,
        };
    }

    /**
     * Registers a listener for a given event.
     *
     * @param {string} event - The name of the event.
     * @param {Function} callback - The callback to be called when the event is triggered.
     */
    registerListener(event, callback) {
        eventBus.on(event, callback);
    }

    /**
     * Emits a change event.
     *
     * @param {string} event - The name of the event to emit.
     * @throws {Error} If the store was not found
     */
    emitChange(event) {
        try {
            eventBus.emit(event);
        } catch (e) {
            throw new Error('Store: emitChange method should call existing events');
        }
    }
}
