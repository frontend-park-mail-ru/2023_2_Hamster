import {Card} from "./components/molecules/card/card.js";
import {List} from "./components/atoms/list/list.js";
import {LoginOrSignUp} from "./pages/login/loginSignUp.js"
import {Button} from "./components/atoms/button/button.js"
import {LoginSignUpForm} from "./components/molecules/loginSignupForm/loginSignupForm.js"
import { InputComponent } from "./components/atoms/input/input.js";



const root = document.getElementById('root');
const login = new LoginOrSignUp(root, false);

login.renderTemplateToParent();
