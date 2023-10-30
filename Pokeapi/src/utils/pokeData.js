import { getPokemonById } from "../services/pokeService";
import { setPokeData } from "../global/state/globalState";
import { setInCapitals } from "./setInCapitals";
import { allPokemonTypes } from "./allPokemonTypes";
import { Paginacion } from "../pages/Pokedex/Paginacion/Paginacion";

let dataGlobal;

export const pokemonData = async() => {
    const rawData = [];
    for (let i=150; i <351; i++){
        rawData.push(await getPokemonById(i));
    }
    return dataMap(rawData);
}

    const dataMap = (pokemon) => {
    const mappedPokemon = pokemon.map((pokemon) =>({
         name: setInCapitals(pokemon.name),
        index: pokemon.id,
        type: pokemon.types,
        image: pokemon.sprites.front_default,
    }))
        const typeList = allPokemonTypes(mappedPokemon);
        dataGlobal = {
            pokemonData : mappedPokemon,
            types : typeList
        }
        return dataGlobal;
        
        }
 



export const pokemonSearches = (pokemonSearchInput, typeOfSearch) => {
    switch(typeOfSearch) {
        case "type" :{
            const filteredData = dataGlobal.pokemonData.filter((pokemon) => 
                pokemon.type[0].type.name
                .toLowerCase()
                .includes(pokemonSearchInput.toLowerCase())
              );
            if (filteredData.length === 0) {
                const filteredData = dataGlobal.pokemonData.filter((pokemon) =>
            pokemon.type[1]?.type.name
              .toLowerCase()
              .includes(pokemonSearchInput.toLowerCase())
          );

          Paginacion(filteredData, 4);
        } else {
          Paginacion(filteredData, 4);
        }
      }
                
        break;
        case "name":
            const filteredData = dataGlobal.pokemonData.filter((pokemon) => 
            pokemon.name
            .toLowerCase()
            .includes(pokemonSearchInput.toLowerCase())
            );
            if (pokemonSearchInput == "") {
                Paginacion(filteredData, 20);
              } else {
                Paginacion(filteredData, 4);
              }
            
        break;
    }

}


export const getPokeInfo = async () => {
    const data = await pokemonData();
    setPokeData(data, "Pokemon")
} 

getPokeInfo();  