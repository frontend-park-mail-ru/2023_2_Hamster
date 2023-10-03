import {LoginOrSignUp} from "./pages/login/loginSignUp.js";
import {Dashboard} from "./pages/dashboard/dashboard.js";
import {router} from "./modules/router.js";
import {CONSTANTS} from "./constants.js";
import {Layout} from "./pages/layout/layout.js";

const getCookie = (name) => {
    let result = null;
    document.cookie.split(";").forEach(cookie => {
        const cookiePair = cookie.split("=");
        if (name === cookiePair[0].trim()) {
            result = cookiePair[1];
        }
    });
    return result;
}


const isAuthenticated = () => {
    return getCookie('cookie');
}

const setCookie = (name, value) => {
    const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/`;
}

const layoutState = {
    sidebar: {
        profileName: "Test name",
        menu: {
            menuSections: [
                {
                    menuSectionHeading: "General",
                    menuItems: [
                        {
                            menuItemText: "Dashboard",
                        }
                    ]
                }
            ]
        }
    },
};

const dashboardState = {
    cardBalance: {
        cardSize: 'card_small',
        cardHeadline: '12000',
        cardSubhead: 'Баланс',
        cardList: {
            listItems: [
                {
                    listItemTitle: 'Биг мак',
                    listItemValue: '160',
                    valueUnits: 'Р',
                },
                {
                    listItemTitle: 'MSP-430',
                    listItemValue: '560',
                    valueUnits: 'Р',
                }
            ]
        }
    },
    cardBudget: {
        cardSize: 'card_small',
        cardHeadline: '12',
        cardSubhead: 'Бюджет',
    },
}

const root = document.querySelector('#root');

const routes = {
    [CONSTANTS.LOGIN_ROUTE]: {
        template: new LoginOrSignUp(root, true),
    },
    [CONSTANTS.REGISTRATION_ROUTE]: {
        template: new LoginOrSignUp(root, false),
    },
    [CONSTANTS.DASHBOARD_ROUTE]: {
        template: isAuthenticated() ? new Layout(root, layoutState, new Dashboard(null, dashboardState)) : new LoginOrSignUp(root, true),
    },
    [CONSTANTS.HOME_ROUTE]: {
        template: isAuthenticated() ? new Layout(root, layoutState, new Dashboard(null, dashboardState)) : new LoginOrSignUp(root, true),
    },
};

setCookie('cookie', 'test');

Object.entries(routes).forEach(([key, value]) => {
    router.addRoute(key, value);
})

router.navigateTo(window.location.pathname)
