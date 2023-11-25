import './index.scss';

import { LoginSignupView, DashboardView, Page404 } from '@views';
import { router } from '@router';
import { ROUTE_CONSTANTS } from '@constants/constants';
import { Layout } from '@organisms/layout/layout';
import { ProfileView } from '@views/profile/profile';
import { CategoriesView } from '@views/categories/categories';
import { TransactionsView } from '@views/transactions/transactions';
import {StatsView} from "@views/stats/stats";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: '/' })
        .then((res) => {
            console.log('register sw success', res);
        })
        .catch((err) => {
            console.log('register sw failed', err);
        });
}

const root = document.querySelector('#root');

// TODO: move all routes to specified file
const routes = {
    [ROUTE_CONSTANTS.NOT_FOUND]: {
        view: new Page404(root),
    },
    [ROUTE_CONSTANTS.LOGIN_ROUTE]: {
        view: new LoginSignupView(root, true),
    },
    [ROUTE_CONSTANTS.REGISTRATION_ROUTE]: {
        view: new LoginSignupView(root, false),
    },
    [ROUTE_CONSTANTS.HOME_ROUTE]: {
        view: new Layout(root, undefined, new DashboardView(null), 'home'),
    },
    [ROUTE_CONSTANTS.DASHBOARD_ROUTE]: {
        view: new Layout(root, undefined, new DashboardView(null), 'home'),
    },
    [ROUTE_CONSTANTS.PROFILE]: {
        view: new Layout(root, undefined, new ProfileView(null), 'profile'),
    },
    [ROUTE_CONSTANTS.CATEGORIES]: {
        view: new Layout(root, undefined, new CategoriesView(null), 'categories'),
    },
    [ROUTE_CONSTANTS.TRANSACTIONS]: {
        view: new Layout(root, undefined, new TransactionsView(null), 'transactions'),
    },
    [ROUTE_CONSTANTS.STATS]: {
        view: new Layout(root, undefined, new StatsView(null), 'stats'),
    },
};

router.addRoutes(routes);

await router.start();
