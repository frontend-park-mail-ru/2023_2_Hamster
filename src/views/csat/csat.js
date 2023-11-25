import '../../index.scss';

import { BaseComponent } from '@components/baseComponent.js';

import template from './csat.hbs';
import { Button } from '@atoms';
import { csatStore } from '@stores/csatStore';
import { EVENT_TYPES } from '@constants/constants';
import { csatActions } from '@actions/csatActions';


const NEXT_BUTTON_STATE = {
    id: 'csat-next-button',
    buttonText: 'Продолжить',
    buttonColor: 'button_primary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

const REJECT_BUTTON_STATE = {
    id: 'csat-reject-button',
    buttonText: 'Не интересно',
    buttonColor: 'button_secondary-color',
    buttonSize: 'button_small',
    buttonType: 'button',
};

/**
 * CategoriesView class extends BaseComponent.
 *
 * @extends {BaseComponent}
 */
export class CsatView extends BaseComponent {

    constructor(parent) {
        super(undefined, template, parent);

        this.currentAnswer = 10;
        this.currentQuestionIndex = 0;
        this.nextButton = new Button(null, NEXT_BUTTON_STATE);
        this.rejectButton = new Button(null, REJECT_BUTTON_STATE);
    }

    createAnswerOptions = (answers) => answers.map((a) => {
        return {
            optionId: `option_${a}`,
            optionText: String(a),
            answer: a,
        };
    });

    /**
     * Renders the CsatView template to the parent element.
     *
     * @function
     */
    async renderTemplateToParent() {
        console.log('csatStore.storage.questions', csatStore.storage.questions);
        console.log('this.currentQuestionIndex ', this.currentQuestionIndex );
        if (!csatStore.storage.questions) {
            await csatStore.getQuestions();
        }

        const answerOptions = this.createAnswerOptions(csatStore.storage.questions);
        const templateData = {
            nextButton: this.nextButton.render(),
        };

        if (!csatStore.storage.started) {
            templateData.questionText = csatStore.storage.startPrompt;
            templateData.rejectButton = this.rejectButton.render();
        } else {
            templateData.questionText = csatStore.storage.questions[this.currentQuestionIndex].questionText;
            answerOptions[answerOptions.length - 1].checked = true;
            templateData.answerOptions = answerOptions;
            templateData.subscriptionLeft = csatStore.storage.questions[this.currentQuestionIndex].subscriptionLeft;
            templateData.subscriptionRight = csatStore.storage.questions[this.currentQuestionIndex].subscriptionRight;
        }

        const templates = [
            template(templateData),
        ];

        return super.renderTemplateToParent(templates);
    }

    setHandlers() {
        const nextButton = document.querySelector('#' + this.nextButton.getState().id);
        if (nextButton) {
            nextButton.addEventListener('click', this.goNextQuestion);
        }

        const rejectButton = document.querySelector('#' + this.rejectButton.getState().id);
        if (rejectButton) {
            rejectButton.addEventListener('click', this.closeCsat);
        }
    }

    goNextQuestion = async (event) => {
        // await csatActions.saveAnswer();
        // await csatActions.nextQuestion();

        const answerInputs = document.querySelector('.csat__answer-options')?.querySelectorAll('input');
        if (answerInputs) {
            const answerInputsArray = Array.from(answerInputs);
            const answer = answerInputs?.reduce((prev, cur) => {
                if (prev.checked) {
                    return prev.getAttribute('data-answer');
                } else if (cur.checked) {
                    return cur.getAttribute('data-answer');
                }
            });
    
            if (answer) {
                csatStore.saveAnswer(this.currentQuestionIndex);
            }
        }

        console.log('go next answer');
        if (++this.currentQuestionIndex === csatStore.storage.questions.length) {
            this.closeCsat();
        } else {
            console.log('next question');
            csatStore.nextQuestion();
        }
    }

    closeCsat = async (event) => {
        csatStore.sendAnswers();

        // send message to window.top
    }
}

const parent = document.querySelector('#csat');
const csat = new CsatView(parent);
await csat.renderTemplateToParent();
