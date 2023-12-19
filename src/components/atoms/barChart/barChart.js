import { BaseComponent } from '@components/baseComponent.js';

import template from './barChart.hbs';
import tooltopTemplate from './tooltip.hbs';



const DEFAULT_BAR_CHART = {
    xAxisWidth: 1,
    yAxisWidth: 0,
    yAxisAdditionalLength: 0,  // костыль
    xAxisColor: '#ffffff',
    yAxisColor: '#ffffff',
    levelWidth: 0.5,
    levelColor: '#ffffff',
    levelStep: null,
    levelOverhead: 1,
    levelCount: 4,
    levelValueFixedDigits: 1,
    levelValueMargin: 0.5,  // * font-size
    levelValueYShift: 0.5,  // * font-size
    textColor: '#ffffff',
    fontSize: 2,  // vmax-like variable
    xSubscriptionTopMargin: 0.5,  // * font-size

    stacked: true,
    defaultBarColors: [ '#0b62a4', '#7a92a3' ],
    defaultBarTitles: [ 'aa', 'oo' ],
    barWidth: 0.7,  // [0,1]

    chartWidth: 400,
    chartHeight: 200,
    chartTopMargin: 50,
    chartBottomMargin: 50,
    chartRightMargin: 50,
    chartLeftMargin: 50,

    hasTooltip: true,
    tooltipFormatter: (values, titles) => {
        return titles.map((title, i) => {
            return `${title}: ${values[i]}`
        });
    },

    data: [
        {
            key: 10,
            values: [1, 2],
            // titles: ['ok', 'ak'],
            // colors: []
        },
        {
            key: 20,
            values: [3,4],
        },
        {
            key: 20,
            values: [3, 1],
        },
    ]
};


export class BarChart extends BaseComponent {

    #calculatedWidth
    #calculatedHeight
    
    #barWidth
    #fontSize

    #actualWidth
    #actualHeight

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
     * @param {number} state.levelWidth - Width of lines represented level of bars.
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

        // return htmlString;
        const thisElement = this.htmlToElement(htmlString);
        this.calculateSizes();
        this.drawChart(thisElement);
        // this.formatTextWithTotal(thisElement);
        return thisElement.outerHTML;
    }

    /**
     * Draws a chart on svg.
     * @param {HTMLElement} thisElement - Div element of bar chart.
     */
    drawChart = (thisElement) => {
        const svg = thisElement.querySelector('.bar-chart__chart');

        // TODO
        this.setViewBox(svg);
        this.drawAxis(svg);
        this.drawLevels(svg);
        this.drawBars(svg);
        this.drawBarsSubscription(svg);        

        // размер баров рассчитывается из ширины графика, ширина / количество баров
        // в стейте размер бара задает число [0,1] - размер относительно максимального,
        // соответственно если менее 1, то остальное пространство пустое.
        // что делать с текстом? задать ему размер относительно размеров графика, как vh,vw-ы

    };

    /**
     * Setup the viewBox attribute of svg 
     * @param {SVGElement} svg - Svg element of bar chart.
     */
    setViewBox = (svg) => {
        const state = this.getState();
        svg.setAttribute('viewBox', `0 0 ${this.#actualWidth} ${this.#actualHeight}`);
    };


    /**
     * Calculates the max bar value when bar chart is stacked
     * @returns max sum of values in data array
     */
    maxStackedSum = () => {
        const state = this.getState();
        return state.data.reduce((acc, cur) => {
            const stackSum = cur.values.reduce((a, b) => a + b);
            return stackSum > acc ? stackSum : acc;
        }, 0);
    }
    
    
    calculateSizes = () => {
        const state = this.getState();
        
        this.#calculatedWidth = state.chartWidth;
        this.#calculatedHeight = state.chartHeight;
        
        this.#actualWidth = state.chartWidth + state.chartLeftMargin + state.chartRightMargin;
        this.#actualHeight = state.chartHeight + state.chartTopMargin + state.chartBottomMargin;
    
        this.#fontSize = state.fontSize / 100 * Math.max(this.#calculatedWidth, this.#calculatedHeight);
    };


    /**
     * Creates element from string.
     * @param {string} htmlString - Representing a single element.
     * @return {HTMLElement} - Element from given string.
     */
    htmlToElement = (htmlString) => {
        const template = document.createElement('template');
        htmlString = htmlString.trim();
        template.innerHTML = htmlString;
        return template.content.firstChild;
    };


    /**
     * Levels parallel to X axis of chart
     * @param {SVGElement} svg - Svg element of bar chart.
     */
    drawLevels = (svg) => {
        const state = this.getState();
        if (state.levelWidth <= 0) {
            return;
        }

        const maxYValue = this.maxStackedSum();
        const levels = state.levelCount ? state.levelCount : (maxYValue / state.levelStep);
        const step = this.#calculatedHeight / levels;
        const overhead = state.levelStep ? state.levelOverhead : 0;
        
        for (let y = step; y <= this.#calculatedHeight + overhead * step + 0.001; y += step) {
            const level = this.makeSvgTag('line', {
                x1: this.calculateX(0),
                y1: this.calculateY(y),
                x2: this.calculateX(this.#calculatedWidth),
                y2: this.calculateY(y),
                'stroke-width': state.levelWidth,
                stroke: state.xAxisColor,
                'stroke-linecap': 'square',
            });
            svg.appendChild(level);

            const levelValue = this.makeSvgTag('text', {
                x: this.calculateX(- this.#fontSize * state.levelValueMargin),
                y: this.calculateY(y - this.#fontSize * state.levelValueYShift),
                'font-size': this.#fontSize,
                'text-anchor': 'end',
                fill: state.textColor,
            });
            levelValue.textContent = (y * maxYValue / this.#calculatedHeight).toFixed(state.levelValueFixedDigits);
            svg.appendChild(levelValue)
        }

        const levelValue = this.makeSvgTag('text', {
            x: this.calculateX(- this.#fontSize * state.levelValueMargin),
            y: this.calculateY(0 - this.#fontSize * state.levelValueYShift),
            'font-size': this.#fontSize,
            'text-anchor': 'end',
            fill: state.textColor,
        });
        levelValue.textContent = (0).toFixed(state.levelValueFixedDigits);
        svg.appendChild(levelValue)
    }
    
    /**
     * Draws X and Y axis of chart.
     * @param {SVGElement} svg - Svg element of bar chart.
     */
    drawAxis = (svg) => {
        const state = this.getState();
        
        if (state.xAxisWidth > 0) {
            const xAxis = this.makeSvgTag('line', {
                x1: this.calculateX(0),
                y1: this.calculateY(0),
                x2: this.calculateX(this.#calculatedWidth),
                y2: this.calculateY(0),
                'stroke-width': state.xAxisWidth,
                stroke: state.xAxisColor,
                'stroke-linecap': 'square',
            });
            svg.appendChild(xAxis);
        }

        if (state.yAxisWidth > 0) {
            const yAxis = this.makeSvgTag('line', {
                x1: this.calculateX(0),
                y1: this.calculateY(0),
                x2: this.calculateX(0),
                y2: this.calculateY(this.#calculatedHeight + state.yAxisAdditionalLength),
                'stroke-width': state.yAxisWidth,
                stroke: state.yAxisColor,
                'stroke-linecap': 'square',
            });
            svg.appendChild(yAxis);
        }

    };

    
    /**
     * Draws bars of bar chart
     * @param {SVGElement} svg - Svg element of bar chart.
     */
    drawBars = (svg) => {
        const state = this.getState();
        const barsCount = state.data.length;
        const groupWidth = this.#calculatedWidth / barsCount
        const barWidth = state.barWidth * groupWidth;
        const maxYValue = this.maxStackedSum();

        for (let x = 0; x < barsCount; x++) {
            const group = this.makeSvgTag('g', {'class': 'bar-chart__chart-stack'});
            this.drawBarStack(group, state, x, groupWidth, barWidth, maxYValue);
            svg.appendChild(group);
        }
    };


    drawBarStack = (group, state, x, groupWidth, barWidth, maxYValue) => {
        const data = state.data[x];
        const titles = data.titles ? data.titles : state.defaultBarTitles;
        const colors = data.colors ? data.colors : state.defaultBarColors;
       
        const barX = x * groupWidth + groupWidth / 2 - barWidth / 2;
        let previousBarY = 0;

        for (let i = 0; i < data.values.length; i++) {
            const barHeight = data.values[i] * this.#calculatedHeight / maxYValue;

            const bar = this.makeSvgTag('rect', {
                x: this.calculateX(barX),
                y: this.calculateY(previousBarY + barHeight),
                width: barWidth,
                height: barHeight,
                fill: colors[i],
                'data-value': data.values[i],
                'data-title': titles[i],
            });
            previousBarY += barHeight;
            group.appendChild(bar);
        }
    } 
    

    drawBarsSubscription = (svg) => {
        const state = this.getState()
        const data = state.data;
        const barGroupWidth = this.#calculatedWidth / data.length;

        for (let i = 0; i < data.length; i++) {
            if (!data[i].key) {
                continue;
            }
            const subscriptionText = this.makeSvgTag('text', {
                x: this.calculateX(i * barGroupWidth + barGroupWidth / 2),
                y: this.calculateY(- this.#fontSize * (state.xSubscriptionTopMargin + 1)),
                'font-size': this.#fontSize,
                'text-anchor': 'mid',
                fill: state.textColor,
            });
            subscriptionText.textContent = data[i].key;
            svg.appendChild(subscriptionText)
        }
    };        

    
    /**
     * calculates X coordinate inside svg element space based on padding
     * @param {number} x 
     * @returns x coordinate in svg space, can be used to draw
     */
    calculateX = (x) => {
        return x + this.getState().chartLeftMargin;
    };
    
    /**
     * calculates Y coordinate inside svg element space based on padding and inverted axis
     * @param {number} y
     * @returns Y coordinate in svg space, can be used to draw
     */
    calculateY = (y) => {
        return this.#actualHeight - y - this.getState().chartBottomMargin;
    };

    /**
     * calculates X and Y coordinates inside svg element space based on padding and inverted axis
     * @param {number} x x coordinate in human-like space
     * @param {number} y y coordinate in human-like space
     * @returns array of two transoformed coordinates X and Y
     */
    calculateXY = (x, y) => {
        return [ calculateX(x), calculateY(y) ];
    }
    

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
     * Handler of 'mousemove' event to move and show/hide tooltip when mouse hover sections.
     * @param {Event} e - Mouse event.
     */
    moveTooltip = (e) => {
        const path = e.target;
        const svg = e.currentTarget;
        const tooltip = svg.parentElement.querySelector('.bar-chart__tooltip');
        const rekt = svg.getBoundingClientRect();

        if (!(path instanceof SVGRectElement)) {
            tooltip.style.display = 'none';
            return;
        }

        const rects = path.parentElement.querySelectorAll('rect');
        const values = Array.from(rects).map((r) => r.getAttribute('data-value'));
        const titles = Array.from(rects).map((r) => r.getAttribute('data-title'));

        const { tooltipFormatter } = this.getState();
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.pageX - rekt.x}px`;
        tooltip.style.top = `${e.pageY - rekt.y}px`;
        tooltip.innerHTML = tooltopTemplate({lines: tooltipFormatter(values, titles)});
    };

    /**
     * Handler of 'mouseleave' event to hide tooltip.
     * @param {Event} e - Mouse event.
     */
    hideTooltip = (e) => {
        const svg = e.currentTarget;
        const tooltip = svg.parentElement.querySelector('.bar-chart__tooltip');
        tooltip.style.display = 'none';
    };

    /**
     * Setup handlers.
     */
    setHandlers() {
        if (!this.getState().hasTooltip) {
            return;
        }
        const svg = this.parent.querySelector('.bar-chart__chart');
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
    
};
