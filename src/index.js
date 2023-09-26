import {Button} from './atoms/button/button.js';

//template of using template ;D
const buttonData = {
    buttonText: 'Click',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: ''
};

const buttonContainer = document.getElementById('root');
const button = new Button(buttonContainer, buttonData);
button.renderTemplate();
