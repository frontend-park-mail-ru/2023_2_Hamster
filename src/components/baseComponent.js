export class BaseComponent {
    parent
    #state

    constructor(state = this.#state, parent) {
        if (parent){
            this.parent = parent;
        }

        this.setState(state);
    }

    renderTemplateToParent(templatesToStateMap) {
        const htmlString = this.render(templatesToStateMap)

        if (this.parent) {
            this.parent.innerHTML = htmlString;
            this.setHandlers();
        }

        return htmlString;
    }

    render(templatesToStateMap){
        return Object
            .entries(templatesToStateMap)
            .reduce(
                (acc, [templateName, state]) => {
                    const template = Handlebars.templates[templateName];
                    const renderedTemplate = template(state);
                    return acc + renderedTemplate;
                }, "",
            );
    }

    setHandlers(){};

    /**
     * Updates the state of the component.
     * @param {Object} newState - The new state object containing the changed properties.
     */
    setState(newState) {
        this.#state = {...this.#state, ...newState};
    }

    /**
     * Retrieves the current state of the component.
     * @returns {Object} - The current state object.
     */
    getState() {
        return this.#state;
    }
}
