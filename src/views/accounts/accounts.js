import { BaseComponent } from '@components/baseComponent.js';

import template from './accounts.hbs';
import { Button, Input } from '@atoms';
import { accountStore } from '@stores/accountStore';
import { EVENT_TYPES } from '@constants/constants';
import { accountActions } from '@actions/accountAction';
import { userStore } from '@stores/userStore';

const CREATE_BUTTON_STATE = {
    id: 'create-account-button',
    buttonText: 'Создать',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const SAVE_BUTTON_STATE = {
    id: 'save-account-button',
    buttonText: 'Создать',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const DELETE_BUTTON_STATE = {
    id: 'delete-account-button',
    buttonText: 'Удалить',
    buttonColor: 'button_secondary-color',
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
    typeOfInput: 'text',
    inputPlaceholder: '100500',
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
    
        // this.accountSelected = 
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

        const accounts = accountStore.storage.states.map((account) => {
            if (this.accountSelected && this.accountSelected == account.id) {
                return {
                    ...account,
                    selected: true,
                }
            }
            return account;
        });

        console.log('this.accounts', accounts);

        const templates = [
            template({
                accounts: accounts,
                accountSelected: this.accountSelected,
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
        return accountStore.storage.states.reduce((res, elem) => {
            const accountItem = document.querySelector(`#${elem.elementId}`);
            if (accountItem?.classList.contains('accounts__account_selected')) {
                return elem;
            }
        }, null);
    }

    // TODO: add input validation
    setHandlers() {
        if (accountStore?.storage?.states) {
            accountStore.storage.states.forEach(account => {
                const accountItem = document.querySelector(`#${account.elementId}`);
                if (accountItem) {
                    accountItem.addEventListener('click', this.handleAccountClick.bind(this, account));
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
    }

    handleAccountClick = (account, event) => {
        // if (event.target.classList.contains('account__delete')) {
        //     return;
        // }
        // TODO через action и стору
        this.accountSelected = account.id;
        console.log('this.accountSelected', this.accountSelected);
        accountStore.rerenderAccounts();

        // const isSettingsOpen = category.getState().settingsOpen;
        // category.setState({ settingsOpen: !isSettingsOpen });

        // const categoryCard = document.querySelector(`#${category.getState().id}`);
        // categoryCard.outerHTML = category.render();

        this.setHandlers();
    }
    
    updateButtonHandler = async () => {
        const nameInputValue = document.querySelector(`#${this.nameInput.getState().id}`)?.value;
        const balanceInputValue = document.querySelector(`#${this.balanceInput.getState().id}`)?.value;
        const account = this.getSelectedAccount();
        if (nameInputValue && balanceInputValue) {
            await accountActions.updateAccount(account.raw, nameInputValue, balanceInputValue);
        }
    };

    deleteButtonHandler = async () => {
        const account = this.getSelectedAccount();
        await accountActions.deleteAccount(account.id);
    };

    createButtonHandler = async () => {
        const nameInputValue = document.querySelector(`#${this.nameInput.getState().id}`)?.value;
        const balanceInputValue = document.querySelector(`#${this.balanceInput.getState().id}`)?.value;
        if (nameInputValue && balanceInputValue) {
            await accountActions.createAccount(nameInputValue, Number(balanceInputValue));
        }
    };

    cancelButtonHandler = async () => {
        // TODO через action
        this.accountSelected = null;
        accountStore.rerenderAccounts();
    };
}