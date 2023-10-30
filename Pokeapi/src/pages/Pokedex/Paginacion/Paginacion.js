import "./Paginacion.css"
import { PokemonCards } from "../PokemonCards";

export const Paginacion = (data, numberElement) => {
  const longitud = data.length;
  const numberDigitOfPage = longitud / numberElement;
  document.getElementById("paginacion").innerHTML = "";
  if (numberDigitOfPage > 1) {
    for (let i = 0; i < numberDigitOfPage; i++) {
      const buttonNumber = document.createElement("button");
      buttonNumber.setAttribute("class", `${i + 1} buttonPaginacion`);
      buttonNumber.innerHTML = i + 1;
      document.getElementById("paginacion").appendChild(buttonNumber);
      addListeners(buttonNumber, data, numberElement, i, numberDigitOfPage);
    }
    const allButton = document.querySelectorAll(".buttonPaginacion");
    allButton.forEach((pag) => {
      pag.style.border = "double 3px #29416a";
    });
    allButton[0].style.border = "double 3px #acc5ff";
    allButton[0].style.color = " #083905ff";
  }

  PokemonCards(data.slice(0, numberElement));
};

const addListeners = (
  buttonNumber,
  data,
  numberElement,
  i,
  numberDigitOfPage
) => {
  buttonNumber.addEventListener("click", () => {
    const allButtonPag = document.querySelectorAll(".buttonPaginacion");

    allButtonPag.forEach((pag) => {
      pag.style.border = "double 3px #29416a ";
    });

    buttonNumber.style.border = "double 3px #acc5ff";
    buttonNumber.style.color = " #083905ff";


    const end = (i + 1) * numberElement;
    const start = end - numberElement < 0 ? 0 : end - numberElement;
    PokemonCards(data.slice(start, end));
  });
};
