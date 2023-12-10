import { BaseComponent } from '@components/baseComponent.js';
import { Button, Input } from '@atoms';
import { accountStore } from '@stores/accountStore';
import { accountActions } from '@actions/accountAction';

import template from './accounts.hbs';

const CREATE_BUTTON_STATE = {
    id: 'create-account-button',
    buttonText: 'Создайте',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const SAVE_BUTTON_STATE = {
    id: 'save-account-button',
    buttonText: 'Сохранить',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const DELETE_BUTTON_STATE = {
    id: 'delete-account-button',
    buttonText: 'Удалить',
    buttonColor: 'button_delete',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const CANCEL_BUTTON_STATE = {
    id: 'cancel-account-button',
    buttonText: 'Отменить',
    buttonColor: 'button_secondary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const NAME_INPUT_STATE = {
    id: 'name-account-input',
    inputSize: 'input_small',
    typeOfInput: 'text',
    inputPlaceholder: 'Хомячьи щечки',
};

const BALANCE_INPUT_STATE = {
    id: 'balance-account-input',
    inputSize: 'input_small',
    inputPlaceholder: '100500',
    typeOfInput: 'number',
    units: 'руб.'
};

/**
 * AccountsView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class AccountsView extends BaseComponent {
    /**
     * AccountsView class extends BaseComponent.
     *
     * @extends {BaseComponent}
     */
    constructor(parent) {
        super(undefined, template, parent);

        this.createButton = new Button(null, CREATE_BUTTON_STATE);
        this.saveButton = new Button(null, SAVE_BUTTON_STATE);
        this.deleteButton = new Button(null, DELETE_BUTTON_STATE);
        this.cancelButton = new Button(null, CANCEL_BUTTON_STATE);

        this.nameInput = new Input(null, NAME_INPUT_STATE);
        this.balanceInput = new Input(null, BALANCE_INPUT_STATE);
    }

    /**
     * Renders the AccountsView template to the parent element.
     * This method is responsible for rendering the profile setting page.
     *
     * @function
     */
    async render() {
        if (!accountStore.storage.states) {
            await accountStore.getAccounts();
        }

        const selectedAccount = accountStore.storage.selectedAccount;
        let accounts = accountStore.storage.states?.map((account) => {
            account = {
                ...account,
                balance: `${account.balance} руб.`,
            };
            if (selectedAccount && selectedAccount == account.elementId) {
                return {
                    ...account,
                    selected: true,
                };
            }
            return account;
        });

        if (!accounts) {
            accounts = [];
        }

        if (!selectedAccount) {
            this.nameInput.setState({ inputPlaceholder: NAME_INPUT_STATE.inputPlaceholder, value: '' });
            this.balanceInput.setState({ inputPlaceholder: BALANCE_INPUT_STATE.inputPlaceholder, value: '' });
        }

        const templates = [
            template({
                accounts,
                isAccountSelected: !!selectedAccount,
                accountNameInput: this.nameInput.render(),
                accountBalanceInput: this.balanceInput.render(),
                saveAccountButton: this.saveButton.render(),
                cancelAccountButton: this.cancelButton.render(),
                deleteAccountButton: this.deleteButton.render(),
                createAccountButton: this.createButton.render(),
            }),
        ];

        return super.render(templates);
    }

    getSelectedAccount = () => {
        return accountStore.storage.states?.reduce((res, elem) => {
            const accountItem = document.querySelector(`#${elem.elementId}`);
            if (accountItem?.classList.contains('accounts__account_selected')) {
                return elem;
            }
            return res;
        }, null);
    }
    

    // TODO: add input validation
    setHandlers() {
        if (accountStore?.storage?.states) {
            accountStore.storage.states.forEach((account) => {
                const accountItem = document.querySelector(`#${account.elementId}`);
                if (accountItem) {
                    accountItem.addEventListener('click', this.accountClickHandler.bind(this, account));
                }
            });
        }

        const saveButton = document.querySelector(`#${this.saveButton.getState().id}`);
        if (saveButton) {
            saveButton.addEventListener('click', this.updateButtonHandler.bind(this));
        }

        const deleteButton = document.querySelector(`#${this.deleteButton.getState().id}`);
        if (deleteButton) {
            deleteButton.addEventListener('click', this.deleteButtonHandler.bind(this));
        }

        const createButton = document.querySelector(`#${this.createButton.getState().id}`);
        if (createButton) {
            createButton.addEventListener('click', this.createButtonHandler.bind(this));
        }

        const cancelButton = document.querySelector(`#${this.cancelButton.getState().id}`);
        if (cancelButton) {
            cancelButton.addEventListener('click', this.cancelButtonHandler.bind(this));
        }

        const layout = document.querySelector('.layout');
        if (layout) {
            layout.addEventListener('click', this.layoutClickHandler);
        }
    }

    accountClickHandler = async (account, event) => {
        this.nameInput.setState({ inputPlaceholder: account.name, value: account.name });
        this.balanceInput.setState({ inputPlaceholder: account.balance, value: account.balance });
        await accountActions.selectAccount(account.elementId);
    };

    updateButtonHandler = async () => {
        let nameInputValue = document.querySelector(`#${this.nameInput.getState().id}`)?.value;
        let balanceInputValue = document.querySelector(`#${this.balanceInput.getState().id}`)?.value;
        const account = this.getSelectedAccount();

        nameInputValue = nameInputValue || account.name;
        balanceInputValue = balanceInputValue || account.balance;

        if (nameInputValue && balanceInputValue !== undefined) {
            this.nameInput.setState({ value: nameInputValue });
            this.balanceInput.setState({ value: balanceInputValue });
            await accountActions.updateAccount(account.raw, nameInputValue, Number(balanceInputValue));
        }
    };

    deleteButtonHandler = async () => {
        const account = this.getSelectedAccount();
        await accountActions.deleteAccount(account.raw, account.elementId);
    };

    createButtonHandler = async () => {
        const nameInputValue = document.querySelector(`#${this.nameInput.getState().id}`)?.value;
        const balanceInputValue = document.querySelector(`#${this.balanceInput.getState().id}`)?.value;
        if (nameInputValue && balanceInputValue) {
            await accountActions.createAccount(nameInputValue, Number(balanceInputValue));
        }
    };

    cancelButtonHandler = async () => {
        await accountActions.selectAccount(null);
    };

    layoutClickHandler = async (e) => {
        // areas which treated as 'empty space' and click on them can deselect account
        const emptySpaces = [
            '.layout',
            '.grid',
            '.accounts__yours',
            '.accounts__configure-account',
            '.accounts__configure'
        ].map((e) => document.querySelector(e));

        if (accountStore.storage.selectedAccount && (e.target == e.currentTarget || emptySpaces.includes(e.target))) {
            await accountActions.selectAccount(null);
        }
    };
}
