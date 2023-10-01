import {Layout} from "./pages/layout/layout.js";

const parentElement = document.querySelector('#root');

const layout = new Layout(parentElement,);
layout.renderTemplateToParent()
