import BaseStore from './baseStore.js';
import { csatApi } from '@api/csat';
import { EVENT_TYPES } from '@constants/constants';

/**
 *
 * @class
 * @extends BaseStore
 */
class CsatStore extends BaseStore {

    /**
     * Creates an instance of csatStore.
     *
     * @constructor
     * @property {Object} storage - An object that contains the state of the user.
     * @property {string|null} storage.error - An error message, if any.
     */
    constructor() {
        super();
        this.storage = {};
        this.storage.started = false;
        this.storage.startPrompt = 'Оцените наш сервис!';
        this.storage.answers = [];
        this.storage.questions = [
            {
                questionText: 'Насколько удобно вам пользоваться сервисом?',
                answers: [1,2,3,4,5,6,7,8,9,10],
                subscriptionLeft: 'Ужасно',
                subscriptionRight: 'Прекрасно',
                internalName: 'NPS1',
            },
            {
                questionText: 'Порекомендуете ли наш сервис своим друзьям и знакомым?',
                answers: [1,2,3,4,5,6,7,8,9,10],
                subscriptionLeft: 'Точно нет',
                subscriptionRight: 'Точно да',
                internalName: 'NPS2',
            },
        ];
    }

    /**
     * Get all categories.
     *
     * @async
     * @function
     */
    getStats = async () => {
        try {
            const response = await csatApi.getStats();

            if (response.body) {
                this.storage.results = response.body;
                this.storeChanged = true;
            }
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };
    
    post = async (data) => {
        try {
            const response = await csatApi.postCsat(data);
            
            this.storeChanged = true;
            // this.emitChange(EVENT_TYPES.NEXT_QUESTION);
        } catch (error) {
            console.log('Unable to connect to the server, error: ', error);
        }
    };
    
    nextQuestion = async () => {
        this.storeChanged = true;
        this.emitChange(EVENT_TYPES.NEXT_QUESTION);
    }

    saveAnswer = async (questionIndex, answer) => {
        this.storage.answers.push({
            name: this.storage.questions[questionIndex].internalName,
            answer: answer,
        });
    }

    sendAnswers = async () => {
        this.storage.answers.forEach((ans) => {
            // this.post(...) // нужна ручка
        });
    }
    
    // getQuestions = async () => {
        
    //     try {
    //         const response = await csatApi.getQuestions();

    //         if (response.body) {
    //             this.storage.results = response.body;
    //             this.storeChanged = true;
    //         }
    //     } catch (error) {
    //         console.log('Unable to connect to the server, error: ', error);
    //     }
    // };

    
}

export const csatStore = new CsatStore();
