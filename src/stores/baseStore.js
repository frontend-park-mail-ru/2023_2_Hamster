import { eventBus } from '../modules/eventBus';

/**
 * BaseStore class for managing application state.
 *
 * @class
 * @property {boolean} storeChanged - A flag indicating whether the store has changed.
 * @property {Object} storage - An object for storing state.
 */
export default class BaseStore {
    storeChanged;

    storage;

    /**
     * Creates a new instance of BaseStore.
     *
     * @constructor
     */
    constructor() {
        this.storeChanged = false;
        this.storage = {};
    }

    /**
     * Returns the current state of the store.
     *
     * @param {string} [field] - The field to retrieve from the state.
     * @returns {Object} The current state of the store or the value of the specified field.
     */
    getState(field) {
        return field ? this.storage.get(field) : this.storage;
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
     * Checks if the store has changed.
     *
     * @returns {boolean} True if the store has changed, false otherwise.
     */
    hasChanged() {
        return this.storeChanged;
    }

    /**
     * Emits a change event if the store has changed.
     *
     * @param {string} event - The name of the event to emit.
     * @throws {Error} If the store has not changed.
     */
    emitChange(event) {
        if (this.hasChanged()) {
            eventBus.emit(event);
            this.storeChanged = false;
            return;
        }

        throw new Error('Store: emitChange method should call existing events');
    }
}
