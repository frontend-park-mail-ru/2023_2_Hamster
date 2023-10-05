import { BaseComponent } from '../../baseComponent.js';

const DEFAULT_STATE = {
    cardSize: 'card-small',
    cardHeadline: 'Headline',
    cardSubhead: 'Subhead',
    cardStatus: '',
    cardList: '',
};

/**
 * Represents a Card component.
 * @class
 */
export class Card extends BaseComponent {
    /**
     * The function that will handle the click event of the card element.
     * @type {Function}
     */
    #clickHandler = () => {
    };

    /**
     * Creates an instance of Card.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the card will be rendered.
     * @param {{cardSize: string, cardSubhead: string, cardHeadline: string}} [state=this.#state] - The initial state of the card component. (optional)
     * @param {string} state.cardSize - The size of the card.
     * @param {string} state.cardHeadline - The headline of the card.
     * @param {string} state.cardSubhead - The subhead of the card.
     * @param {string} state.cardStatus - The status of the card.
     * @param {string} state.cardList - The list associated with the card.
     * @param {Function} [clickHandler = this.#clickHandler] - The function that will handle the click event of the card element. (optional)
     */
    constructor(state = DEFAULT_STATE, clickHandler, parent) {
        super(state, parent);
        if (clickHandler) {
            this.#clickHandler = clickHandler;
        }
    }

    /**
     * Renders the Card template to the parent element.
     */
    renderTemplateToParent() {
        const templatesToStateMap = {
            'card.hbs': this.getState(),
        };

        super.renderTemplateToParent(templatesToStateMap);
    }

    /**
     * Renders the Card template and returns the resulting HTML string.
     * @returns {string} The resulting HTML string.
     */
    render() {
        const templatesToStateMap = {
            'card.hbs': this.getState(),
        };

        return super.render(templatesToStateMap);
    }

    /**
     * Sets the click event handler for the card element.
     */
    setHandlers() {
        const cardElement = this.parent.querySelector('.card');
        cardElement.addEventListener('click', this.handleClick.bind(this));
    }

    /**
     * Handles the click event of the card element.
     * @param {Event} event - The click event object.
     */
    handleClick(event) {
        if (typeof this.#clickHandler === 'function') {
            this.#clickHandler();
        }
    }

    /**
     * Sets the click event handler for the card.
     * @param {Function} clickHandler - The function to handle the click event.
     */
    setHandler(clickHandler) {
        this.#clickHandler = clickHandler;
    }

    /**
     * Gets the current click event handler for the card.
     * @returns {Function} - The current click event handler.
     */
    getHandler() {
        return this.#clickHandler;
    }

    setState(newState) {
        super.setState(newState);
    }

    getState() {
        return super.getState();
    }
}
