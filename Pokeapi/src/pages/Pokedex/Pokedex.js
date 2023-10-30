import './Pokedex.css'
import { printTemplateSpinner } from '../../components/Spinner/spinner';
import { printTemplateSpinner2 } from '../../components/Spinner/spinner';
import { getPokeData } from '../../global/state/globalState';
import { PokemonCards } from './PokemonCards';
import { TypeButtons } from './FilterButton/TypeButton';
import { pokemonSearches } from '../../utils/pokeData';
import { Paginacion } from './Paginacion/Paginacion';


const template = () =>`
    <div id="pokemonPage">
        <div id="filterSection">
            <div id="spinner"></div>
            <div id="typeButtons"> </div>
            <input id="pokemonSearch" type="text" placeholder="Poke-search"/>
        </div>
        <div id="paginacion"> </div>
        <div id="spinnerGallery"> </div>
        <div id="pokemonGallery"> </div>
        </div>

</div>
`
const dataServiceSet = async() =>{
    const getPokemonData = getPokeData("Pokemon");
    console.log("dataServiceSet getPokemonData", getPokemonData)
    const { pokemonData , types } = getPokemonData; 
    console.log("pokemonData", pokemonData) //entra bien
    console.log("types", types) //entra bien
    PokemonCards(pokemonData);
    TypeButtons(types)
    document.getElementById("spinner").innerHTML = "";
    addListeners();
    document.getElementById("spinnerGallery").innerHTML = "";
    Paginacion(pokemonData, 20)
}



const addListeners = () => {
    const inputPokemon = document.getElementById("pokemonSearch");
    inputPokemon.addEventListener("input", (e) => {             //? el name luego entra como input en la funcion que hay en @datapokemon, y al ser un switch,
      pokemonSearches(e.target.value, "name");        //?entra directamente al case name. Los switch se declaran mediante event listeners y dandole la propiedad necesaria
    });
  };
  



export const printTemplatePokedex = () => {
    document.querySelector("main").innerHTML = template();
    printTemplateSpinner();
    printTemplateSpinner2();
    dataServiceSet();

    
}