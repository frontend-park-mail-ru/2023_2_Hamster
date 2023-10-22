import { ROUTE_CONSTANTS } from '@constants';

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

    isAuthorised = false;

    username;

    id;

    addRoute = (routeName, view) => {
        this.routes[routeName] = view;
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
            this.isAuthorised
                ? routeResult = ROUTE_CONSTANTS.DASHBOARD_ROUTE
                : routeResult = ROUTE_CONSTANTS.LOGIN_ROUTE;
        } else {
            this.isAuthorised
                ? routeResult = ROUTE_CONSTANTS.DASHBOARD_ROUTE
                : routeResult = routeTrimmed;
        }

        const routeInfo = this.routes[routeResult];

        if (!routeInfo) {
            console.error(`No route found for ${routeResult}`);
            return;
        }

        history.pushState({}, null, window.location.origin + routeResult);

        routeInfo.view.renderTemplateToParent();
    };
}

export const router = new Router();
