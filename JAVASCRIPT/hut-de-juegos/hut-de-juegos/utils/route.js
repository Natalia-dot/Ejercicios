//! Aqui importar las paginas (printTemplateDashboard, Login...)
// import { printTemplateDashboard, Login, printTemplateMemory, printTemplatePokedex, printTemplateQuiz } from '../pages'

export const initControler = (pagesRender) => {           //?Propiedad que le aplicas en la pagina correspondiente(dashboard,...)
    console.log("soy el user", getUser().name);
    switch (pagesRender) {
      case undefined:
        localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
        break;
      case "Pokemon":
        PrintPokemonPage();
        break;
      case "Dashboard":
        printTemplateDashboard();
        break;
      case "Topo":
        "Topo()";
        break;
      case "Login":
        Login();
        break;
      case "Memory":
        "Memory()";
        break;
    }
  };
  