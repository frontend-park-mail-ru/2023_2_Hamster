/**
 * Represents a base component.
 */
export class BaseComponent {
    /**
     * The parent HTML element where the BaseComponent will be rendered.
     * @type {HTMLElement}
     */
    parent;

    /**
     * The state of the BaseComponent.
     * @type {Object}
     * @private
     */
    #state;

    /**
     * Create a BaseComponent.
     * @param {Object} [state=this.#state] - The initial state of the BaseComponent.
     * @param {HTMLElement} parent - The parent HTML element where the BaseComponent will be rendered.
     */
    constructor(state = this.#state, parent) {
        if (parent) {
            this.parent = parent;
        }

        this.#state = { ...this.#state, ...state };
    }

    async renderTemplateToParent(templates) {
        this.cleanUp();

        const htmlString = this.render(templates);

        if (this.parent) {
            this.parent.innerHTML = htmlString;
            this.setHandlers();
        }

        return htmlString;
    }

    cleanUp() {

    }

    render(templates) {
        return templates.reduce((acc, html) => acc + html, '');
    }

    /**
     * Set event handlers for the BaseComponent. To be implemented by subclasses.
     */
    setHandlers() {

    }

    /**
     * Updates the state of the component.
     * @param {Object} newState - The new state object containing the changed properties.
     */
    setState(newState) {
        this.#state = { ...this.#state, ...newState };
    }

    /**
     * Retrieves the current state of the component.
     * @returns {Object} - The current state object.
     */
    getState() {
        return this.#state;
    }
}
