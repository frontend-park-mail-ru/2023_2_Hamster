import {Button} from './atoms/button/button.js';
import {LoginOrSignUp} from './pages/login/login.js'
import { InputComponent } from './atoms/input/input.js';

//template of using template ;D
const buttonData = {
    buttonText: 'Click',
    buttonColor: 'button_secondary-color',
    buttonImageLeft: ''
};

const buttonElement = new Button(null, buttonData);

const isLogin = false;
const Form = {}; // replace in real form

const LoginPage = document.getElementById('root');
const login = new LoginOrSignUp(LoginPage, Form, isLogin, buttonElement);
login.renderTemplate();
const buttonContainer = document.getElementById('root');
const button = new Button(buttonContainer, buttonData);
button.renderTemplate();

const inputData = {
    inputSize: 'input_large',
    inputImageRight: 'assets/icons/Search.svg',
    typeOfInput: 'text',
    inputPlaceholder: 'Search...',
    inputLabelText: 'Label',
    inputHelperText: 'helper'
};

const inputContainer = document.getElementById('root');
const input = new InputComponent(inputContainer, inputData);
input.renderTemplate();
