import { printTemplateFooter } from "../components/Footer/Footer";
import { printTemplateGallery } from "../components/Gallery/Gallery";
import { printTemplateHeader } from "../components/Header/Header";

export const initTemplate = () => {
  const app = document.getElementById("app");

  //? ------------> crear las etiquetas de html de header, main y footer
  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");

  //? append es un metodo que inyecta elementos creados por el dom en el contenedor que tiene la aplicacion
  app.append(header, main, footer);
  //? ------> pintamos lo que hay dentro de las etiquetas header, main, footer
  printTemplateFooter();
  printTemplateHeader();
  printTemplateGallery();
};
