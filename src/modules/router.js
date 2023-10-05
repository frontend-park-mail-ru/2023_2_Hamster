import { API_CONSTANTS, ROUTE_CONSTANTS } from '../constants.js';

const isAuthenticated = () => getId();

const getId = () => localStorage.getItem('id');

/**
 * Class representing a router.
 * @class
 */
class Router {
    /**
     * Object storing routes
     * @type {Object}
     */
    routes = {};

    /**
     * Adds a route to the routes object.
     * @param {string} routeName - The name of the route.
     * @param {Object} template - The template of the route.
     */
    addRoute = (routeName, template) => {
        this.routes[routeName] = template;
    };

    /**
     * Navigates to a specified route.
     * @param {string} route - The name of the route to navigate to.
     */
    navigateTo = (route) => {
        const routeTrimmed = route.at(-1) === '/'
            ? route.slice(0, -1)
            : route;

        let routeResult;

        if (routeTrimmed === ROUTE_CONSTANTS.HOME_ROUTE || routeTrimmed === ROUTE_CONSTANTS.DASHBOARD_ROUTE) {
            isAuthenticated()
                ? routeResult = ROUTE_CONSTANTS.DASHBOARD_ROUTE
                : routeResult = ROUTE_CONSTANTS.LOGIN_ROUTE;
        } else {
            isAuthenticated()
                ? routeResult = ROUTE_CONSTANTS.DASHBOARD_ROUTE
                : routeResult = routeTrimmed;
        }

        const routeInfo = this.routes[routeResult];

        if (!routeInfo) {
            console.error(`No route found for ${routeResult}`);
            return;
        }

        history.pushState({}, null, window.location.origin + routeResult);

        routeInfo.template.renderTemplateToParent();
    };
}

export const router = new Router();