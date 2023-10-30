import { pokemonSearches } from "../../../utils/pokeData";
import "./TypeButton.css"


export const TypeButtons = (types) => {
    types.forEach((singleType) => {                       //template strings para input
      const buttonType = `<button class="typeButton" id="${singleType}"> 
        ${singleType}
      </button>`;
      const buttonContainer = document.getElementById("typeButtons");
      buttonContainer.innerHTML += buttonType;
    });
  
    addListeners(types);
  };
  
  const addListeners = (types) => {
    types.forEach((singleType) => {
      const buttonType = document.getElementById(singleType);
      buttonType.addEventListener("click", (e) => {
        pokemonSearches(singleType, "type");                //el type individual sobre el que esta iterando luego se pasa a la funcion de sorting
      });
    });
  };
  