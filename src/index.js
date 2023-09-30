import {Button} from './atoms/button/button.js';
import {LoginOrSignUp} from './pages/login/login.js'
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