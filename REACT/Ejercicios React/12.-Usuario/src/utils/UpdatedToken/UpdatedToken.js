export const getUpdatedToken = () => {
    const user = localStorage.getItem("user");
    if(user){
        const parsedUser = JSON.parse(user);
        return parsedUser.token;
    }
}

//Ex aqui vamos a recoger el user que hemos almacenado previamente (en el login) en el local storage, junto con su 
//Ex token de autenticacion. Si recordamos, al loggearnos loque haciamos era anadir una clave al usuario llamada
//Ex token, con la que podiamos restringir el acceso a funciones segun si lo tuvieramos o no, y que no estuviera caducado.
//Ex aqui recogemos el token, y posiblemente lo verifiquemos a posteriori con otros controladores