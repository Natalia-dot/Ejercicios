import "./PokemonCards.css"
import { getUserData, setUserData } from "../../global/state/globalState"


export const PokemonCards = (data) => {
    console.log("lo siguiente es data")
    console.log(data)
    const appUser = getUserData();
    console.log(appUser);
    document.getElementById("pokemonGallery").innerHTML = "";
    data.map((pokemon) => {
        const classCustomType = `"figure pokemon ${pokemon.type[0].type.name}"`
        const customTemplate = `<figure class=${classCustomType} id=${pokemon.index}>
        <img class="pokemonImage" src=${pokemon.image} alt=${pokemon.name} />
        <h4>${pokemon.name}</h4>
        <span class="material-symbols-outlined  ${
          appUser.fav.includes(pokemon.index.toString()) ? "love" : ""
        }">favorite</span>
      </figure>`;
      document.getElementById("pokemonGallery").innerHTML += customTemplate;
      addListeners(data);
    })
}

const addListeners = (data) => {
    const appUser = getUserData();
    const allSpan = document.querySelectorAll("span");      //coges todos los span (corazoncines)
    allSpan.forEach((span) => {
        span.addEventListener("click", (e) =>{
            if (appUser.fav.includes(e.target.parentNode.id)){       //Si el padre del corazoncin en cuestion esta en el array de favos
                const appUser = getUserData();
                const newFavesArray = [];                              //inicializamos un array vacio, metemos todos los que no sean ese, y lo pusheamos a la nube, al registro localstorage
                appUser.fav.forEach((index) => {                       //hacemos un spread reemplazando fav por nuestro nuevo array
                    if(e.target.parentNode.id != index) newFavesArray.push(e.target.parentNode.id) });
                        setUserData({
                            ...appUser,
                            fav : newFavesArray,
                        })
                        span.classList.toggle("love");        //y quitamos la clase claro
            } else {
                const appUser = getUserData();
                appUser.fav.push(e.target.parentNode.id);     //si no esta, nos dejamos de lio, cogemos el array del local y pusheamos el index y ya       
                setUserData(appUser);
                span.classList.toggle("love")
            }
        })
    })
}

