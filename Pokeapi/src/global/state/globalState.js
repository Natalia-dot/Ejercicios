
const currentUser = {                                         //? Asigna al name de currenUser el input que se llame. Si hay en session storage un name, se le asigna,
    name: sessionStorage.getItem("currentUser")                 //?si no, se le asigna un default vacio
      ? sessionStorage.getItem("currentUser")                    //?Devuelve  currentUser de session storage
      : "",
  };
  
  // ------------------> INICIALIZACION EN LAZY DEL ESTADO------------
  
  let userData = localStorage.getItem(currentUser.name)           //? Se encuentra el currentUser.name en LOCAL storage?? Entonces traelo y parsealo para usarlo.
    ? JSON.parse(localStorage.getItem(currentUser.name))           //? Si no, crea el objeto con el nombre default
    : {
        name: "",
        token: false,
        fav: [],
      };
  

 
  
  export const setUser = (username) => {
    currentUser.name = username;
  };
  
  
  export const getUser = () => {
    return currentUser;                 //?DEL SESSION STORAGE
  };




export const setUserData = (data) => {
    console.log(dataGlobal);
    userData.fav = data?.fav;
    userData.name = data?.name;
  
    const stringUserObject = JSON.stringify(userData);
    localStorage.removeItem(`${currentUser.name}`);
    console.log(userData.name);
    localStorage.setItem(`${currentUser.name}`, stringUserObject);
  };
  
  export const getUserData = () => {
    return userData;
  };


  //!--------POKEMON--------------
  const dataGlobal = {
    pokemon: []
  }


export const setPokeData = (data,page) => {
  switch (page) {
    case "Pokemon":
      console.log("data en setPokeData",data);
      dataGlobal.pokemon = data;
      break;

    default:
      break;
  }
  }

  export const getPokeData = (page) => {            //paginado pokemons
    switch (page) {
      case "Pokemon":
        return dataGlobal.pokemon;

      default:
        break;
    }
    return dataGlobal;
  };
  