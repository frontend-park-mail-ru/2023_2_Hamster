import {LoginOrSignUp} from "./pages/login/loginSignUp.js";
import {Dashboard} from "./pages/dashboard/dashboard.js";
import {router} from "./modules/router.js";
import {ROUTE_CONSTANTS} from "./constants.js";
import {Layout} from "./pages/layout/layout.js";

const layoutState = {
    sidebar: {
        profileName: "Тестовое имя",
        menu: {
            menuSections: [
                {
                    menuSectionHeading: "Главное",
                    menuItems: [
                        {
                            menuItemText: "Доска",
                        }
                    ]
                }
            ]
        }
    },
};

const root = document.querySelector('#root');

const routes = {
    [ROUTE_CONSTANTS.LOGIN_ROUTE]: {
        template: new LoginOrSignUp(root, true),
    },
    [ROUTE_CONSTANTS.REGISTRATION_ROUTE]: {
        template: new LoginOrSignUp(root, false),
    },
    [ROUTE_CONSTANTS.DASHBOARD_ROUTE]: {
        template: new Layout(root, layoutState, new Dashboard(null, undefined)),
    },
    [ROUTE_CONSTANTS.HOME_ROUTE]: {
        template: new Layout(root, layoutState, new Dashboard(null, undefined)),
    },
};

Object.entries(routes).forEach(([key, value]) => {
    router.addRoute(key, value);
})

router.navigateTo(window.location.pathname)
