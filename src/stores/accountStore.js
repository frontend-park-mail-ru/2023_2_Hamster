import { accountApi } from '@api/account';
import {
    DEFAULT_AVATAR, EVENT_TYPES, NULL_UUID, STATUS_CODES
} from '@constants/constants';
import { ACCOUNT_NAME_RULES, BUDGET_RULES } from '@constants/validation';
import { userStore } from '@stores/userStore';
import { Button, Image } from '@atoms';
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
        owner: data.users[0].login !== userStore.storage.user.login ? data.users[0].login : undefined,
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
                    valueName: account.users[0].login !== userStore.storage.user.login ? `${account.mean_payment} - ${account.users[0].login}` : account.mean_payment
                }));

                this.ownAccountsValues = this.accounts
                    .filter((account) => account.sharing_id === userStore.storage.user.id)
                    .map((account) => ({ value: account.id, valueName: account.mean_payment }));

                this.sharedAccounts = [];
                this.sharingWith = [];
                this.accounts.forEach((account) => {
                    account.users.filter((user) => {
                        if (user.id !== userStore.storage.user.id) {
                            if (user.id !== account.sharing_id) {
                                let avatarSrc;
                                user.avatar_url === NULL_UUID
                                    ? avatarSrc = DEFAULT_AVATAR
                                    : avatarSrc = `../images/${user.avatar_url}.jpg`;
                                const avatar = new Image(null, {
                                    avatar: avatarSrc,
                                    imageSize: 'image-container_medium',
                                    withBorder: true
                                });
                                const button = new Button(null, {
                                    id: `delete${account.id}`,
                                    buttonText: 'Удалить',
                                    buttonColor: 'button_delete'
                                });
                                this.sharedAccounts.push({
                                    accountId: account.id,
                                    userId: user.id,
                                    avatar: avatar.render(),
                                    login: user.login,
                                    account: account.mean_payment,
                                    delete: button.render(),
                                });
                            } else {
                                this.sharingWith.push({
                                    accountId: account.id,
                                    login: user.login,
                                });
                            }
                        }
                    });
                });

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

    addUserInAccount = async (data) => {
        try {
            await accountApi.addUserInAccount(data);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }

        this.emitChange(EVENT_TYPES.RERENDER_SHARE);
    };

    deleteUserInAccount = async (data) => {
        try {
            await accountApi.deleteUserInAccount(data);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }

        this.emitChange(EVENT_TYPES.RERENDER_SHARE);
    };

    unsubscribeAccount = async (data) => {
        try {
            await accountApi.unsubscribeAccount(data.account_id);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }

        this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
    };
}

export const accountStore = new AccountStore();
