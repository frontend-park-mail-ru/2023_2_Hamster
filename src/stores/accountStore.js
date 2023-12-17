import { accountApi } from '@api/account';
import { EVENT_TYPES, STATUS_CODES } from '@constants/constants';
import { ACCOUNT_NAME_RULES, BUDGET_RULES } from '@constants/validation';
import BaseStore from './baseStore.js';
import { validator } from '../modules/validator';

/**
 *
 * @class
 * @extends BaseStore
 */
class AccountStore extends BaseStore {
    /**
     * Creates an instance of UserStore.
     *
     * @constructor
     * @property {Object} storage - An object that contains the state of the user.
     * @property {string|null} storage.error - An error message, if any.
     */
    constructor() {
        super();
        this.storage = {};
    }

    transformArray = (arr) => arr.map((data) => ({
        raw: data.id,
        elementId: `id${data.id}`,
        name: data.mean_payment,
        balance: data.balance,
    }));

    selectAccount = async (data) => {
        this.nameInput = { isError: false, inputHelperText: '' };
        this.balanceInput = { isError: false, inputHelperText: '' };
        this.storage.selectedAccount = data.accountElementId;
        this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
    };

    getAccounts = async () => {
        try {
            const response = await accountApi.getAccounts();

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.states = this.transformArray(response.body.accounts);
                this.accounts = response.body.accounts;

                this.accountsValues = this.accounts.map((account) => ({
                    value: account.id,
                    valueName: account.mean_payment
                }));

                break;

            case STATUS_CODES.NO_CONTENT:
                this.storage.states = null;

                break;

            default:
                console.log('Undefined status code', response.status);
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    createAccount = async (data) => {
        if (!this.isError(data)) {
            try {
                const response = await accountApi.createAccount({ ...data, balance: parseFloat(data.balance) });

                this.nameInput = { isError: false, inputHelperText: '' };
                this.balanceInput = { isError: false, inputHelperText: '' };

                this.storage.states.push({
                    raw: response.body.account_id,
                    elementId: `id${response.body.account_id}`,
                    name: data.mean_payment,
                    balance: data.balance,
                });
            } catch (error) {
                console.log('Unable to connect to the server, error: ', error);
            }
        }

        this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
    };

    deleteAccount = async (data) => {
        try {
            await accountApi.deleteAccount(data.account_id);

            this.storage.states = this.storage.states.filter((item) => item.raw !== data.account_id);

            if (this.storage.selectedAccount === data.accountElementId) {
                this.storage.selectedAccount = null;
            }

            this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    updateAccount = async (data) => {
        if (!this.isError(data)) {
            try {
                await accountApi.updateAccount({ ...data, balance: parseFloat(data.balance) });

                this.nameInput = { isError: false, inputHelperText: '' };
                this.balanceInput = { isError: false, inputHelperText: '' };

                this.storage.states = this.storage.states.map((item) => {
                    if (item.raw !== data.id) {
                        return item;
                    }
                    return {
                        raw: data.id,
                        elementId: `id${data.id}`,
                        name: data.mean_payment,
                        balance: data.balance,
                    };
                });

            } catch (error) {
                console.log('Unable to connect to the server, error: ', error);
            }
        }

        this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
    };

    isError = (data) => {
        const nameValidation = validator(data.mean_payment, ACCOUNT_NAME_RULES);
        const balance = validator(data.balance, BUDGET_RULES);

        this.nameInput = {
            value: data.mean_payment,
            isError: nameValidation.isError,
            inputHelperText: nameValidation.message,
        };

        this.balanceInput = {
            value: data.balance,
            isError: balance.isError,
            inputHelperText: balance.message,
        };

        return nameValidation.isError || balance.isError;
    };

}

export const accountStore = new AccountStore();
