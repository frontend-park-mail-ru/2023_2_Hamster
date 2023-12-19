import { BaseComponent } from '@components/baseComponent.js';
import { Button, Input } from '@atoms';
import { accountStore } from '@stores/accountStore';
import { accountActions } from '@actions/accountAction';

import template from './accounts.hbs';

const CREATE_BUTTON_STATE = {
    id: 'create-account-button',
    buttonText: 'Создать',
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

const UNSUBSCRIBE_BUTTON_STATE = {
    id: 'unsubscribe-account-button',
    buttonText: 'Отписаться',
    buttonColor: 'button_delete',
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
    typeOfInput: 'text',
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
        this.unsubscribeButton = new Button(null, UNSUBSCRIBE_BUTTON_STATE);

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

        const { selectedAccount } = accountStore.storage;
        let accounts = accountStore.storage.states?.map((account) => {
            account = {
                ...account,
                balance: `${account.balance} руб.`,
            };
            if (selectedAccount && selectedAccount === account.elementId) {
                this.owner = account.owner;
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

        if (accountStore.nameInput) {
            this.nameInput.setState(accountStore.nameInput);
        }

        if (accountStore.balanceInput) {
            this.balanceInput.setState(accountStore.balanceInput);
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
                unsubscribeButton: this.unsubscribeButton.render(),
                owner: this.owner,
            }),
        ];

        return super.render(templates);
    }

    getSelectedAccount = () => accountStore.storage.states?.reduce((res, elem) => {
        const accountItem = document.querySelector(`#${elem.elementId}`);
        if (accountItem?.classList.contains('accounts__account_selected')) {
            return elem;
        }
        return res;
    }, null);

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

        const unsubscribeButton = document.querySelector(`#${this.unsubscribeButton.getState().id}`);
        if (unsubscribeButton) {
            unsubscribeButton.addEventListener('click', this.unsubscribeButtonHandler.bind(this));
        }
        const layout = document.querySelector('.layout');
        if (layout) {
            layout.addEventListener('click', this.layoutClickHandler);
        }
    }

    accountClickHandler = async (account, event) => {
        this.nameInput.setState({ inputPlaceholder: account.name, value: account.name });
        this.balanceInput.setState({ inputPlaceholder: account.balance, value: String(account.balance) });
        await accountActions.selectAccount(account.elementId);
    };

    updateButtonHandler = async () => {
        const nameInputValue = document.querySelector(`#${this.nameInput.getState().id}`)?.value;
        const balanceInputValue = document.querySelector(`#${this.balanceInput.getState().id}`)?.value;
        const account = this.getSelectedAccount();

        await accountActions.updateAccount(account.raw, nameInputValue, balanceInputValue);
    };

    deleteButtonHandler = async () => {
        const account = this.getSelectedAccount();
        await accountActions.deleteAccount(account.raw, account.elementId);
    };

    unsubscribeButtonHandler = async () => {
        const account = this.getSelectedAccount();
        await accountActions.unsubscribeAccount(account.raw);
    };

    createButtonHandler = async () => {
        const nameInputValue = document.querySelector(`#${this.nameInput.getState().id}`)?.value;
        const balanceInputValue = document.querySelector(`#${this.balanceInput.getState().id}`)?.value;

        await accountActions.createAccount(nameInputValue, balanceInputValue);
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
        ].map((event) => document.querySelector(event));

        if (accountStore.storage.selectedAccount && (e.target === e.currentTarget || emptySpaces.includes(e.target))) {
            await accountActions.selectAccount(null);
        }
    };
}
