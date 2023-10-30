//Aqui se hacen las llamadas basicas para crear footer, header y main, y se tiene que exporta a main.js

import { printTemplateFooter } from "../components/Footer/Footer";
import { printTemplateHeader } from "../components/Header/Header";

export const initTemplate = () => {
    const app = document.querySelector("#app");

    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');

    app.append(header,main,footer);
    printTemplateHeader();           //no  ponemos el main porque se renderiza segun lo que tengamos en template controller
    printTemplateFooter();
}

//aqui se ejecutara la siguiente funcion en main, que es el template controller y estipulara lo que se tiene 
//que printear segun la pagina