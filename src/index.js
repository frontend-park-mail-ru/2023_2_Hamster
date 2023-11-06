import './index.scss';
import { ButtonCard } from '@atoms';
import { ProfileView } from '@views/profile/profile';
import { DashboardView, LoginSignupView } from '@views';
import { Layout } from '@organisms/layout/layout';

// import { LoginSignupView, DashboardView } from '@views';
// import { router } from '@router';
// import { ROUTE_CONSTANTS } from '@constants/constants';
// import { Layout } from '@organisms/layout/layout';
//
const root = document.querySelector('#root');
//
// // TODO: move all routes to specified file
// const routes = {
//     [ROUTE_CONSTANTS.LOGIN_ROUTE]: {
//         view: new LoginSignupView(root, true),
//     },
//     [ROUTE_CONSTANTS.REGISTRATION_ROUTE]: {
//         view: new LoginSignupView(root, false),
//     },
//     [ROUTE_CONSTANTS.HOME_ROUTE]: {
//         view: new Layout(root, undefined, new DashboardView(null)),
//     },
//     [ROUTE_CONSTANTS.DASHBOARD_ROUTE]: {
//         view: new Layout(root, undefined, new DashboardView(null)),
//     },
// };
//
// router.addRoutes(routes);
//
// router.start();

// const dash = new Layout(root, undefined, new DashboardView(null));
// dash.renderTemplateToParent();
//
const profile = new Layout(root, undefined, new ProfileView(null))
profile.renderTemplateToParent()
//
// const view = new LoginSignupView(root, true);
// view.renderTemplateToParent();
