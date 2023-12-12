import { BaseComponent } from '@components/baseComponent.js';

import template from './pieChart.hbs';

export const FORMAT_CHAR = '@';
const DEFAULT_PIE_CHART = {
    textAbove: 'Total:',
    textBelow: '',
    textCenter: `${FORMAT_CHAR}%`,
    inRad: 100,
    outRad: 120,
    inShadowRad: 100,
    outShadowRad: 120,
    shadowColor: '#555',
    beginOffset: 0,
    sectionSpace: 0.3,
    isPercents: true,
    data: [],
    tooltipText: `${FORMAT_CHAR}: ${FORMAT_CHAR}%`,
};

const FULL_CIRCLE_DEGREES = 360;
const X_AXIS_ROTATION = 0;
const CENTER_X = 0;
const CENTER_Y = 0;
const LARGE_ARC_FLAG = {
    LARGE: 1,
    SMALL: 0,
};
const SWEEP_FLAG = {
    POSITIVE: 1,
    NEGATIVE: 0,
};
const PATH_COMMANDS = {
    MOVE: 'M',
    ARC: 'A',
    LINE: 'L',
};
const TOTAL_PERCENT = 100;

export class PieChart extends BaseComponent {

    /**
     * Creates an instance of Button.
     * @constructor
     * @param {HTMLElement} parent - The parent element where the pie chart will be rendered.
     * @param {Object} [state = DEFAULT_PIE_CHART] - The initial state of the pie chart component. (optional)
     * @param {string} state.textCenter - The text inside of chart centered, the '@' char will be replaced with sum of values.
     * @param {string} state.textAbove - The text inside above the textCenter, the '@' char will be replaced with sum of values.
     * @param {string} state.textBelow - The text inside below the textCenter, the '@' char will be replaced with sum of values.
     * @param {string} state.id - The id of pie chart element.
     * @param {string} state.tooltipText - Text of tooltip, the first '@' char will be replaced with 'title' of section and second with 'value' of section.
     * @param {number} state.inRad - Inner radius of chart.
     * @param {number} state.outRad - Outer radius of chart.
     * @param {number} state.inShadowRad - Inner radius of background chart shadow.
     * @param {number} state.outShadowRad - Outer radius of background chart shadow.
     * @param {string} state.shadowColor - Color of background chart shadow.
     * @param {number} state.beginOffset - Angular offset for drawing chart sections, zero is east, clockwise direction, in degrees.
     * @param {number} state.sectionSpace - Angular space between sections, in degrees.
     * @param {boolean} state.isPercents - If true chart treats data values as percents and can have empty spaces, otherwise it summarize values and allocates pro rata shares.
     * @param {Array[Object]} state.data - Data array to visualize.
     * @param {string} state.data[].title - Title for tooltip.
     * @param {number} state.data[].value - Value of section, see state.isPercents.
     * @param {string} state.data[].color - Color of section.
     */
    constructor(parent, state = DEFAULT_PIE_CHART) {
        state = { ...DEFAULT_PIE_CHART, ...state };
        super(state, template, parent);
    }

    /**
     * Renders the pie chart component and inserts into parent.
     */
    renderTemplateToParent() {
        super.renderTemplateToParent([template(this.getState())]);
    }

    /**
     * Renders the pie chart component.
     * @returns {string} - The rendered HTML template of the button.
     */
    render() {
        const htmlString = super.render([template(this.getState())]);
        const thisElement = this.htmlToElement(htmlString);
        this.drawChart(thisElement);
        this.formatTextWithTotal(thisElement);
        return thisElement.outerHTML;
    }

    /**
     * Formats text fields in center of pie chart.
     * @param {HTMLElement} thisElement - Div element of pie chart.
     */
    formatTextWithTotal = (thisElement) => {
        const textCenter = thisElement.querySelector('.pie-chart__inner-text-center');
        const textAbove = thisElement.querySelector('.pie-chart__inner-text-above');
        const textBelow = thisElement.querySelector('.pie-chart__inner-text-below');
        const valuesSum = this.getValuesSum();

        if (textCenter) {
            textCenter.textContent = textCenter.textContent.replace(FORMAT_CHAR, String(valuesSum));
        }
        if (textAbove) {
            textAbove.textContent = textAbove.textContent.replace(FORMAT_CHAR, String(valuesSum));
        }
        if (textBelow) {
            textBelow.textContent = textBelow.textContent.replace(FORMAT_CHAR, String(valuesSum));
        }
    };

    /**
     * Draws a chart on svg.
     * @param {HTMLElement} thisElement - Div element of pie chart.
     */
    drawChart = (thisElement) => {
        const svg = thisElement.querySelector('.pie-chart__chart');

        this.setViewBox(svg);
        this.drawShadow(svg);
        this.drawSections(svg);
    };

    /**
     * Setup the viewBox attribute of svg based on max radius of chart
     * @param {SVGElement} svg - Svg element of pie chart.
     */
    setViewBox = (svg) => {
        const state = this.getState();
        svg.setAttribute('viewBox', `${-state.outRad} ${-state.outRad} ${state.outRad * 2} ${state.outRad * 2}`);
    };

    /**
     * Draws a background circular shadow of chart.
     * @param {SVGElement} svg - Svg element of pie chart.
     */
    drawShadow = (svg) => {
        const state = this.getState();
        const circle = this.makeSvgTag('circle', {
            cx: CENTER_X,
            cy: CENTER_Y,
            r: state.inShadowRad + (state.outShadowRad - state.inShadowRad) / 2,
            stroke: state.shadowColor,
            'stroke-width': state.outShadowRad - state.inShadowRad,
        });
        svg.appendChild(circle);
    };

    /**
     * @returns {number} - Total value representing the full circle.
     */
    getTotal = () => {
        const state = this.getState();
        return state.isPercents ? TOTAL_PERCENT : this.getValuesSum();
    };

    /**
     * @returns {number} - Sum of 'value' property for each element in data.
     */
    getValuesSum = () => this.getState().data.reduce((total, cur) => total + cur.value, 0);

    /**
     * Draws a proportional section for each value in data.
     * @param {SVGElement} svg - Svg element of pie chart.
     */
    drawSections = (svg) => {
        const state = this.getState();
        if (!state.data) {
            return;
        }

        const total = this.getTotal();
        if (Number.isNaN(total)) {
            console.log(`invalid data values ${state.data} for ${this}`);
            return;
        }

        let angleStart = state.beginOffset;
        state.data.forEach((data) => {
            const path = this.makeSvgTag('path');
            const angleEnd = angleStart + data.value / total * FULL_CIRCLE_DEGREES - state.sectionSpace;
            const d = this.circleSegmentPathD(state.inRad, state.outRad, angleStart, angleEnd, CENTER_X, CENTER_Y);
            path.setAttribute('d', d);
            path.setAttribute('fill', data.color);
            path.setAttribute('data-value', data.value);
            path.setAttribute('data-title', data.title);
            path.classList.add('pie-chart__chart-section');
            svg.appendChild(path);
            angleStart = angleEnd + state.sectionSpace;
        });
    };

    /**
     * Creates and returns element of svg namespace.
     * @param {string} tag - Tag name of required element.
     * @param {Object} attrs - Object with attributes to set in created element.
     * @returns {HTMLElement} - Element of svg namespace with given attributes.
     */
    makeSvgTag = (tag, attrs) => {
        const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
        if (!attrs) {
            return elem;
        }
        Object.entries(attrs).forEach(([k, v]) => {
            elem.setAttribute(k, v);
        });
        return elem;
    };

    /**
     * Transforms polar coordinates to afine.
     * @param {number} rad - Radius in polar coordinates.
     * @param {number} ang - Angle in polar coordinates.
     * @returns {Object} - Object with 'x' and 'y' properties.
     */
    polarToAfine = (rad, ang) => {
        ang = ang / FULL_CIRCLE_DEGREES * 2 * Math.PI;
        return { x: rad * Math.cos(ang), y: rad * Math.sin(ang) };
    };

    /**
     * Creates a string with given command of svg <path> tag.
     * @param {string} com - Command name.
     * @param  {...number} args - Arguments to command.
     * @returns {string} - String representation of given command.
     */
    makeSvgPathCommand = (com, ...args) => {
        let resultCommand = String(com);
        args.forEach((a) => resultCommand += `${String(a)} `);
        return `${resultCommand}\n`;
    };

    /**
     * Creates a string with Arc command of svg <path> tag.
     * @param {number} rx - X radius of the arc (for circle rx == ry).
     * @param {number} ry - Y radius of the arc (for circle rx == ry).
     * @param {boolean} largeArcFlag - Large arc flag for arc svg <path> tag command.
     * @param {boolean} sweepFlag - Sweep flag for arc svg <path> tag command.
     * @param {number} x - X of second point for arc svg <path> tag command.
     * @param {number} y - Y of second point for arc svg <path> tag command.
     * @returns {string} - String representation of arc command with given arguments.
     */
    makeSvgPathArcCommand = (rx, ry, largeArcFlag, sweepFlag, x, y) => this.makeSvgPathCommand(PATH_COMMANDS.ARC,
        rx,
        ry,
        X_AXIS_ROTATION,
        largeArcFlag ? LARGE_ARC_FLAG.LARGE : LARGE_ARC_FLAG.SMALL,
        sweepFlag ? SWEEP_FLAG.POSITIVE : SWEEP_FLAG.NEGATIVE,
        x,
        y);

    /**
     * Construts and returns 'd' attribute for <path> svg tag representing a section of circle.
     * @param {number} inRad - Inner radius of circle section.
     * @param {number} outRad - Outer radius of circle section.
     * @param {number} angleStart - Angle from what sections starts, zero is west, in degrees.
     * @param {number} angleEnd - Angle from what sections ends, zero is west, in degrees.
     * @param {number} centerX - X coordinate of circle center.
     * @param {number} centerY - Y coordinate of circle center.
     * @returns {string} - 'd' attribute for <path> svg tag.
     */
    circleSegmentPathD = (inRad, outRad,
        angleStart, angleEnd,
        centerX, centerY) => {
        let d = '';
        const largeArcFlag = Math.abs(angleEnd - angleStart) > (FULL_CIRCLE_DEGREES / 2);
        const sweepFlag = angleEnd > angleStart;

        const nearXYBegin = this.polarToAfine(inRad, angleStart);
        const nearXYEnd = this.polarToAfine(inRad, angleEnd);
        const farXYBegin = this.polarToAfine(outRad, angleStart);
        const farXYEnd = this.polarToAfine(outRad, angleEnd);

        d += this.makeSvgPathCommand(PATH_COMMANDS.MOVE, centerX + nearXYBegin.x, centerY + nearXYBegin.y);
        d += this.makeSvgPathArcCommand(inRad, inRad, largeArcFlag, sweepFlag, centerX + nearXYEnd.x, centerY + nearXYEnd.y);
        d += this.makeSvgPathCommand(PATH_COMMANDS.LINE, centerX + nearXYEnd.x, centerY + nearXYEnd.y);
        d += this.makeSvgPathCommand(PATH_COMMANDS.LINE, centerX + nearXYEnd.x, centerY + nearXYEnd.y);
        d += this.makeSvgPathCommand(PATH_COMMANDS.LINE, centerX + farXYEnd.x, centerY + farXYEnd.y);
        d += this.makeSvgPathArcCommand(outRad, outRad, largeArcFlag, !sweepFlag, centerX + farXYBegin.x, centerY + farXYBegin.y);
        d += this.makeSvgPathCommand(PATH_COMMANDS.LINE, centerX + farXYBegin.x, centerY + farXYBegin.y);

        return d;
    };

    /**
     * Creates element from string.
     * @param {string} htmlString - Representing a single element.
     * @return {HTMLElement} - Element from given string.
     */
    htmlToElement = (htmlString) => {
        const htmlTemplateElement = document.createElement('template');
        htmlString = htmlString.trim();
        htmlTemplateElement.innerHTML = htmlString;
        return htmlTemplateElement.content.firstChild;
    };

    /**
     * Handler of 'mousemove' event to move and show/hide tooltip when mouse hover sections.
     * @param {Event} e - Mouse event.
     */
    moveTooltip = (e) => {
        const path = e.target;
        const svg = e.currentTarget;
        const tooltip = svg.parentElement.querySelector('.pie-chart__tooltip');

        if (!(path instanceof SVGPathElement)) {
            tooltip.style.display = 'none';
            return;
        }

        const { tooltipText } = this.getState();
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.pageX}px`;
        tooltip.style.top = `${e.pageY}px`;
        tooltip.textContent = tooltipText
            .replace(FORMAT_CHAR, path.getAttribute('data-title'))
            .replace(FORMAT_CHAR, path.getAttribute('data-value'));
    };

    /**
     * Handler of 'mouseleave' event to hide tooltip.
     * @param {Event} e - Mouse event.
     */
    hideTooltip = (e) => {
        const svg = e.currentTarget;
        const tooltip = svg.parentElement.querySelector('.pie-chart__tooltip');
        tooltip.style.display = 'none';
    };

    /**
     * Setup handlers.
     */
    setHandlers() {
        if (!this.getState().tooltipText) {
            return;
        }
        const svg = this.parent.querySelector('.pie-chart__chart');
        svg.addEventListener('mousemove', this.moveTooltip);
        svg.addEventListener('mouseleave', this.hideTooltip);
    }

    /**
     * Clean handlers.
     */
    cleanUp() {
        const svg = this.parent?.querySelector('.pie-chart__chart');
        if (!svg) {
            return;
        }
        svg.removeEventListener('mousemove', this.moveTooltip);
        svg.removeEventListener('mouseleave', this.hideTooltip);
    }

}
