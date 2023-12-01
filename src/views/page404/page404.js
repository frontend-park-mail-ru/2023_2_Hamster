import { Button } from '@atoms';
import { BaseComponent } from '@components';
import { ROUTE_CONSTANTS } from '@constants/constants';
import { router } from '@router';

import template from './page404.hbs';

/**
 * Class representing 404 Page.
 *
 * @extends BaseComponent
 */
export class Page404 extends BaseComponent {
    /**
     * 'return to main page' button
     */
    #returnButton;

    constructor(parent) {
        super({}, template, parent);

        const buttonState = {
            buttonText: 'Вернуться на главную',
            id: 'page404-return-button',
        };

        this.#returnButton = new Button(null, buttonState, this.navigateToHome);
    }

    /**
     * Navigate to home route.
     *
     * @function
     */
    navigateToHome = async () => {
        await router.navigateTo(ROUTE_CONSTANTS.HOME_ROUTE);
    };

    /**
     * Render template to parent.
     *
     * @returns {HTMLElement} The rendered template.
     * @function
     */
    renderTemplateToParent() {
        const templates = [
            template({
                ...this.getState(),
                returnButton: this.#returnButton.render(),
                textAbove: 'Ошибка 404',
                textCenter: 'Не удалось найти такую страницу...',
                textBelow: 'Проверьте, не ошиблись ли вы адресом'
            }),
        ];

        return super.renderTemplateToParent(templates);
    }

    /**
     * Set handlers.
     * Register handlers if there is such element on page.
     *
     * @function
     */
    setHandlers() {
        const returnButton = document.querySelector('#page404-return-button');
        if (returnButton) {
            returnButton.addEventListener('click', this.navigateToHome);
        }
    }

    /**
     * Remove listeners from element and then set them up.
     *
     * @function
     */
    cleanUp() {
        const returnButton = document.querySelector('#page404-return-button');
        if (returnButton) {
            returnButton.removeEventListener('click', this.navigateToHome);
        }
    }
}
