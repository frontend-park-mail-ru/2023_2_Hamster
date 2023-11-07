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
        try {
            await userStore.checkAuth();
        } catch (e) {
            console.log('Error: ', e);
        }

        router.navigateTo(window.location.pathname);
    };

    /**
     * Navigate to a specified route.
     *
     * @param {string} path - The path of the route to navigate to.
     * @function
     */
    navigateTo = (path) => {
        const routeTrimmed = path.at(-1) === '/'
            ? path.slice(0, -1)
            : path;

        let routeResult;

        // TODO: 1) Need to make better check of authenticated routes; 2) Make private routes (for subscription :D)
        if (routeTrimmed === ROUTE_CONSTANTS.HOME_ROUTE || routeTrimmed === ROUTE_CONSTANTS.DASHBOARD_ROUTE || routeTrimmed === ROUTE_CONSTANTS.PROFILE) {
            userStore.storage.user.isAuthorised
                ? routeResult = ROUTE_CONSTANTS.DASHBOARD_ROUTE
                : routeResult = ROUTE_CONSTANTS.LOGIN_ROUTE;
        } else {
            userStore.storage.user.isAuthorised
                ? routeResult = ROUTE_CONSTANTS.DASHBOARD_ROUTE
                : routeResult = routeTrimmed;
        }

        const view = this.routes[routeResult];

        if (!view) {
            console.error(`No route found for ${routeResult}`);
            return;
        }

        history.pushState({}, null, window.location.origin + routeResult);

        view.view.renderTemplateToParent();
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
