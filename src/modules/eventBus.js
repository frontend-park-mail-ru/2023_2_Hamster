/**
 * EventBus class for registering, unregistering and emitting events.
 * singleton.
 *
 * @class
 * @property {Object} listeners - An object where keys are event names and values are Sets of corresponding callbacks.
 */
class EventBus {
    listeners;

    /**
     * Creates a new instance of EventBus.
     *
     * @constructor
     */
    constructor() {
        this.listeners = {};
    }

    /**
     * Registers a callback for a given event.
     *
     * @param {string} event - The name of the event.
     * @param {Function} callback - The callback to be called when the event is emitted.
     */
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set();
        }

        this.listeners[event].add(callback);
    }

    /**
     * Unregisters a callback for a given event.
     *
     * @param {string} event - The name of the event.
     * @param {Function} callback - The callback to be unregistered.
     */
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].delete(callback);
        }
    }

    /**
     * Emits an event.
     * If the event has registered callbacks, they are invoked with the provided arguments.
     *
     * @param {string} event - The name of the event to emit.
     * @param {...*} args - The arguments to pass to the event's callbacks.
     */
    emit(event, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((callback) => {
                callback(...args);
            });
        }
    }
}

export const eventBus = new EventBus();
