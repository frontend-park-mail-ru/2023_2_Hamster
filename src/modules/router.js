import { ROUTE_CONSTANTS } from '@constants/constants.js';
import { userStore } from '@stores/userStore';

/**
 * Class representing a router.
 *
 * @class
 */
class Router {

    /**
     * Object storing routes
     * @type {Object}
     */
    routes = {};

    /**
     * Register a new route to the router.
     *
     * @param {string} path - The path of the route.
     * @param {Object} view - The view associated with the route.
     * @function
     */
    addRoute = (path, view) => {
        this.routes[path] = view;
    };

    /**
     * Register multiple routes to the router.
     *
     * @param {Object} routes - An object containing path-view pairs.
     * @function
     */
    addRoutes = (routes) => {
        Object.entries(routes)
            .forEach(([key, value]) => {
                router.addRoute(key, value);
            });
    };

    /**
     * Start the router.
     *
     * @async
     * @function
     */
    start = async () => {
        await userStore.checkAuth();

        await this.navigateTo(window.location.pathname, true);

        window.onpopstate = async () => {
            await this.navigateTo(window.location.pathname, true);
        };
    };

    /**
     * Navigate to a specified route.
     *
     * @param {string} path - The path of the route to navigate to.
     * @param {boolean} replaceState - Is state should be replaced, true - replace state in history, false - push state to history.
     * @function
     */
    navigateTo = async (path, replaceState) => {
        const routeTrimmed = path.at(-1) === '/'
            ? path.slice(0, -1)
            : path;

        let routeResult;

        // TODO: 1) Need to make better check of authenticated routes; 2) Make private routes (for subscription :D)
        if (routeTrimmed === ROUTE_CONSTANTS.HOME_ROUTE || routeTrimmed === ROUTE_CONSTANTS.DASHBOARD_ROUTE || routeTrimmed === ROUTE_CONSTANTS.PROFILE || routeTrimmed === ROUTE_CONSTANTS.CATEGORIES || routeTrimmed === ROUTE_CONSTANTS.TRANSACTIONS) {
            userStore.storage.user.isAuthorised
                ? routeResult = routeTrimmed
                : routeResult = ROUTE_CONSTANTS.LOGIN_ROUTE;
        } else {
            routeResult = userStore.storage.user.isAuthorised
                ? ROUTE_CONSTANTS.DASHBOARD_ROUTE
                : routeTrimmed;
        }

        routeResult = routeTrimmed;
        let view = this.routes[routeResult];

        if (!view) {
            view = this.routes[ROUTE_CONSTANTS.NOT_FOUND];
        }

        if (replaceState) {
            window.history.replaceState({}, null, window.location.origin + routeResult);
        } else {
            window.history.pushState({}, null, window.location.origin + routeResult);
        }

        await view.view.renderTemplateToParent();
    };

    /**
     * Navigate back in the history.
     *
     * @function
     */
    back = () => {
        window.history.back();
    };

    /**
     * Navigate forward in the history.
     *
     * @function
     */
    forward = () => {
        window.history.forward();
    };
}

export const router = new Router();
