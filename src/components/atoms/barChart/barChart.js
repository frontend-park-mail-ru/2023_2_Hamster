import { BaseComponent } from '@components/baseComponent.js';

import template from './barChart.hbs';



const DEFAULT_BAR_CHART = {

};


export class BarChart extends BaseComponent {
    /**
     * Creates an instance of Bar chart.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the bar chart will be rendered.
     * @param {Object} [state = DEFAULT_BAR_CHART] - The initial state of the bar chart component. (optional)
     * @param {string} state.id - The id of bar chart element.
     * @param {string} state.xAxisText - The subscription of X axis.
     * @param {string} state.yAxisText - The subscription of Y axis.
     * @param {number} state.xAxisWidth - Width of X axis.
     * @param {number} state.yAxisWidth - Width of Y axis.
     * @param {string} state.defaultBarColor - Default color of bars.
     * @param {number} state.yLevelWidth - Width of lines parallel to X axis.
     * @param {number} state.xLevelWidth - Width of lines parallel to Y axis.
     * @param {Object} state.data - Data array to visualize.
     * @param {string} state.data[].title - Title for tooltip.
     * @param {string} state.data[].value - Value of certian bar.
     * @param {string} state.data[].color - Color of certian bar, if not present defaultBarColor is used.
     * @param {string} state.data[].index - .
    */
    constructor(parent, state = DEFAULT_BAR_CHART) {
        state = { ...DEFAULT_BAR_CHART, ...state };
        super(state, template, parent);
    }

    /**
     * Renders the pie chart component and inserts into parent.
     */
    renderTemplateToParent() {
        super.renderTemplateToParent([template(this.getState())]);
    }

    /**
     * Renders the bar chart component.
     * @returns {string} - The rendered HTML template of the bar chart.
     */
    render() {
        const htmlString = super.render([template({
            ...this.getState(),

        })]);

        return htmlString;
        // const thisElement = this.htmlToElement(htmlString);
        // this.drawChart(thisElement);
        // this.formatTextWithTotal(thisElement);
        // return thisElement.outerHTML;
    }

    /**
     * Draws a chart on svg.
     * @param {HTMLElement} thisElement - Div element of bar chart.
     */
    drawChart = (thisElement) => {
        const svg = thisElement.querySelector('.bar-chart__chart');

        // TODO
        this.setViewBox(svg);
        this.drawShadow(svg);
        this.drawAxis(svg);
        this.drawBars(svg);
    };

    /**
     * Setup the viewBox attribute of svg 
     * @param {SVGElement} svg - Svg element of bar chart.
     */
    setViewBox = (svg) => {
        const state = this.getState();
        svg.setAttribute('viewBox', -10, -10, 20, 20); // TODO
    };


    
    

    /**
     * Setup handlers.
     */
    setHandlers() {
    
    }

    /**
     * Clean handlers.
     */
    cleanUp() {

    }
    
};
