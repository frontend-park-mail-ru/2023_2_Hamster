import {Layout} from "./pages/layout/layout.js";
import {Dashboard} from "./pages/dashboard/dashboard.js";

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

const root = document.querySelector('#root');

const layout = new Layout(root, layoutState);

layout.renderTemplateToParent();

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

const grid = document.querySelector('.grid');

const dashboard = new Dashboard(grid, dashboardState);

dashboard.renderTemplateToParent();
