import { printTemplatePokedex } from "../pages/Pokedex/Pokedex";
import { printTemplateMemory } from "../pages/Memory/Memory";
import { printTemplateQuiz } from "../pages/Quiz/Quiz";
import { printTemplateWhack } from "../pages/Whackamole/Whack";
import { printTemplateHomepage } from "../pages/Homepage/Homepage";
import { printTemplateLogin } from "../pages/Login/Login";
import { getUser } from "../global/state/globalState";


export const initController = (pageToRender) => {  
    console.log(pageToRender)    ;     //?Propiedad que le aplicas en la pagina correspondiente(dashboard,...)
    switch (pageToRender) {
      case undefined:
        localStorage.getItem(getUser().name) ? printTemplateHomepage() : printTemplateLogin();
        break;
      case "Login":
        printTemplateLogin();
        break;
      case 'Homepage':
        printTemplateHomepage();
        break;
      case 'Pokedex':
        printTemplatePokedex();
        break;
      case 'Memory':
        printTemplateMemory();
        break;
      case 'Whack':
        printTemplateWhack();
        break;
      case 'Quiz':
        printTemplateQuiz(); //todo el quiz esta terrible por favor no me lo tomen en cuenta es el primero, ya lo rehare despues
        break;

    }
  };