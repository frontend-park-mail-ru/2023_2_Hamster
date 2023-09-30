import {Card} from "./components/molecules/card/card.js";
import {List} from "./components/atoms/list/list.js";

const listItems = {
    listItems: [
        {
            listItemTitle: 'text1',
            listItemValue: '2',
            valueUnits: 'Р',
        },
        {
            listItemTitle: 'text2',
            listItemValue: '2',
            valueUnits: 'Р',
        }
    ]
};

const list = new List(listItems);

const parentElement = document.getElementById('root');
const card = new Card({
    cardSize: 'card-small',
    cardHeadline: 'Example',
    cardSubhead: 'Subhead',
    cardStatus: 'card__status_bad',
    list: list.render(),
}, () => {
}, parentElement);
card.renderTemplateToParent();
