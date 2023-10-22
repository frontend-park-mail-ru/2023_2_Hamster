import './index.scss';

import { LoginOrSignUp } from '@pages/login/loginSignUp';
import { Dashboard } from '@pages/dashboard/dashboard';
import { router } from '@router';
import { ROUTE_CONSTANTS } from '@constants';
import { Layout } from '@pages/layout/layout';
import { checkAuth } from '@ajax';

const root = document.querySelector('#root');

const routes = {
    [ROUTE_CONSTANTS.LOGIN_ROUTE]: {
        view: new LoginOrSignUp(root, true),
    },
    [ROUTE_CONSTANTS.REGISTRATION_ROUTE]: {
        view: new LoginOrSignUp(root, false),
    },
    [ROUTE_CONSTANTS.DASHBOARD_ROUTE]: {
        view: new Layout(root, undefined, new Dashboard(null, undefined)),
    },
    [ROUTE_CONSTANTS.HOME_ROUTE]: {
        view: new Layout(root, undefined, new Dashboard(null, undefined)),
    },
};

Object.entries(routes)
    .forEach(([key, value]) => {
        router.addRoute(key, value);
    });

(async () => {
    try {
        const {
            username,
            id,
        } = await checkAuth();
        router.isAuthorised = true;
        router.username = username;
        router.id = id;
    } catch (e) {
        console.log('Error: ', e);
    }

    router.navigateTo(window.location.pathname);
})();
