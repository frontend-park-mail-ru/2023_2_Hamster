import { BaseComponent } from '@components';
import { BarChart } from '@atoms';

import template from './testView.hbs';

/**
 * Class representing a View for testing other components.
 *
 * @extends BaseComponent
 */
export class TestView extends BaseComponent {

    chart1;

    /**
     * Create a TestView.
     *
     * @param {HTMLElement} parent - The parent element.
     * @constructor
     */
    constructor(parent) {
        super({}, template, parent);

        this.chart1 = new BarChart(null, {});
    }

    renderTemplateToParent() {
        const chart1 = this.chart1.render();
        super.renderTemplateToParent([template({
            ...this.getState(),
            chart1
        })]);
    }

    setHandlers() {
        this.chart1.parent = this.parent.querySelector('.test-layout div');
        this.chart1.setHandlers();
    }

    cleanUp() {
        this.chart1.cleanUp();
    }

}
