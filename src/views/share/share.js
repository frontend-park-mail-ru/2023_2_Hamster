import { BaseComponent } from '@components/baseComponent.js';

import { Button, Input, Select } from '@atoms';
import { accountActions } from '@actions/accountAction';
import { accountStore } from '@stores/accountStore';

import template from './share.hbs';

const BUTTON_STATE = {
    id: 'button',
    buttonText: 'Создать',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const INPUT_STATE = {
    id: 'input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Логин',
};

/**
 * shareView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class ShareView extends BaseComponent {

    constructor(parent) {
        super(undefined, template, parent);

        this.input = new Input(null, INPUT_STATE);
        this.select = new Select(null, { id: 'select' });
        this.button = new Button(null, BUTTON_STATE);
    }

    /**
     * Renders the shareView template.
     * This method is responsible for rendering the share page.
     *
     * @function
     */
    async render() {
        await accountStore.getAccounts();
        this.select.setState({ values: accountStore.ownAccountsValues });

        if (accountStore.loginInput) {
            this.input.setState(accountStore.loginInput);
        }

        const templates = [
            template({
                input: this.input.render(),
                select: this.select.render(),
                button: this.button.render(),
                accounts: accountStore.sharedAccounts,
            }),
        ];

        return super.render(templates);
    }

    setHandlers() {
        if (accountStore.sharedAccounts) {
            accountStore.sharedAccounts.forEach((account) => {
                const deleteButton = document.querySelector(`#delete${account.accountId}`);
                if (deleteButton) {
                    deleteButton.addEventListener('click', this.deleteButtonHandler.bind(this, account));
                }
            });
        }

        const createButton = document.querySelector(`#${this.button.getState().id}`);
        if (createButton) {
            createButton.addEventListener('click', this.createButtonHandler.bind(this));
        }
    }

    deleteButtonHandler = async (sharedAccount) => {
        await accountActions.deleteUserInAccount(sharedAccount.userId, sharedAccount.accountId);
    };

    createButtonHandler = async () => {
        const inputValue = document.querySelector(`#${this.input.getState().id}`).value;
        const selectValue = document.querySelector((`#${this.select.getState().id}`)).value;

        await accountActions.addUserInAccount(inputValue, selectValue);
    };
}
