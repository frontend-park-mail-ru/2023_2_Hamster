/**
 * Class representing a router.
 * @class
 */
class Router{
    /**
     * Object storing routes
     * @type {Object}
     */
    routes = {}

    /**
     * Adds a route to the routes object.
     * @param {string} routeName - The name of the route.
     * @param {Object} template - The template of the route.
     */
    addRoute = (routeName, template) => {
        this.routes[routeName] = template;
    }

    /**
     * Navigates to a specified route.
     * @param {string} route - The name of the route to navigate to.
     */
    navigateTo = (route) => {
        const routeTrimmed = route.at(-1) === '/'
            ? route.slice(0, -1)
            : route;

        const routeInfo = this.routes[routeTrimmed];

        if (!routeInfo) {
            console.error(`No route found for ${routeTrimmed}`);
            return;
        }

        history.pushState({}, null, window.location.origin + routeTrimmed);

        routeInfo.template.renderTemplateToParent();
    }
}

export const router = new Router();
