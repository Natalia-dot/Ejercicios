import './Login.css'
import { setUser } from '../../global/state/globalState';
import { setUserData } from '../../global/state/globalState';
import { initController } from '../../utils/route';

const template = () =>
`
<div id='login'>
<h1> Please input your trainer name.</h1>
<p> We need to check if you are in the region's trainer database.</p>
<input id='username' name='username' required></input>
<button id='inputButton'> Done </button>
</div>
`

const addListeners = () =>{
    const inputButton = document.getElementById('inputButton');
    const username = document.getElementById('username')
    inputButton.addEventListener('click', (e) => {
        const inputValue = username.value;

        if (localStorage.getItem(`${inputValue}USER`)) {                //checkeamos localStorage (el registro civil) para ver si Pepa existe
            const localUser = localStorage.getItem(`${inputValue}USER`);//? si existe le seteamos una variable
            const parseUserObject = JSON.parse(localUser);                    //parseamos el json del PepaUser para poder modificarlo
            parseUserObject.token = true;                                     //lo modificamos
      
            const stringUserObject = JSON.stringify(parseUserObject);               //una vez modificado, devolvemos el objeto de JS a JSONstring
            localStorage.setItem(`${inputValue}USER`, stringUserObject);      //lo devolvemos modificado al local storage. Solo hemos modificado stringUserObject, pero el key value sigue siendo PepaUSER
            sessionStorage.setItem("currentUser", `${inputValue}USER`); //setteamos a currentUser => PepaUSER
            setUser(`${inputValue}USER`);                               //para que currentUser.name tenga un valor y puedas referenciar el name mediante currentUser
      
            setUserData(parseUserObject);                                     //setUserData actualiza la informacion
            console.log(parseUserObject);
          } else {
            const customUserObject = {
              name: username.value,
              fav: [],
              token: true,
            };
            const stringUserObject = JSON.stringify(customUserObject);      //lo mismo pero con un usuario nuevo
            localStorage.setItem(`${inputValue}USER`, stringUserObject);    //! setItem settea un key value donde le indiques
            sessionStorage.setItem("currentUser", `${inputValue}USER`);
            setUser(`${inputValue}USER`);
            setUserData(customUserObject);
          }
      
          initController();
        });
      };
   

export const printTemplateLogin =  () => {
    document.querySelector('main').innerHTML = template();
    document.querySelector('nav').style.display = 'none';
    addListeners();
}