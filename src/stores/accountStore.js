import BaseStore from './baseStore.js';
import { accountApi } from '@api/account';
import { EVENT_TYPES, STATUS_CODES } from '@constants/constants';

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

    transformArray = (arr) => {
        return arr.map(data => ({
            raw: data.id,
            elementId: 'id' + data.id,
            name: data.mean_payment,
            balance: data.balance,
            // deleteId: 'delete_' + data.id,
            // cardId: 'card_' + data.id,
        }));
    };

    getAccounts = async () => {
        try {
            const response = await accountApi.getAccounts();

            switch (response.status) {
            case STATUS_CODES.OK:
                this.storage.states = this.transformArray(response.body.accounts);
                this.accounts = response.body.accounts;

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
        try {
            const response = await accountApi.createAccount(data);

            this.storage.states.push({
                raw: response.id,
                elementId: 'id' + response.id,
                name: data.mean_payment,
                balance: data.balance,
            });

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    deleteAccount = async (data) => {
        try {
            await accountApi.deleteAccount(data.account_id);

            this.storage.states = this.storage.states.filter(item => item.raw !== data.account_id);

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    updateAccount = async (data) => {
        try {
            await accountApi.updateAccount(data);
            this.storage.states = this.storage.states.map(item => {
                if (item.raw !== data.account_id) {
                    return item;
                }
                return {
                    raw: data.account_id,
                    id: 'id' + data.account_id,
                    name: data.mean_payment,
                    balance: data.balance,
                    // deleteId: 'delete_' + data.account_id,
                    // cardId: 'card_' + data.account_id,
                };
            });

            this.storeChanged = true;

            this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };

    rerenderAccounts = async () => {
        this.storeChanged = true;
        this.emitChange(EVENT_TYPES.RERENDER_ACCOUNTS);
    }
};

export const accountStore = new AccountStore();