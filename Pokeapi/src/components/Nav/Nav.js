import './Nav.css'
import { initController } from '../../utils/route';
import { getUser } from '../../global/state/globalState';

const template = () =>
    `
    <nav>
        <ul>
            <li> <img id="switchMode" src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697492755/GameHut/healballl_wbdmdw.png" alt='A dusk Ball' ></li>
            <li> <img id="home" src='https://res.cloudinary.com/drbssyzr7/image/upload/v1697698890/GameHut/houseww_rqvtxm.png' alt='A Home Icon' ></li>
            <li> <img id="logout" src='https://res.cloudinary.com/drbssyzr7/image/upload/v1697557721/GameHut/arrow_muzcot.png' alt='An Exit Icon'></li>
        </ul>
        </nav>
    `
const addEventListeners = () =>{
    const switchMode = document.getElementById("switchMode");
    const home = document.getElementById("home");
    const logout = document.getElementById("logout");

    home.addEventListener('click', (e) => {
        initController('Homepage');
        console.log("hola")
    })

      logout.addEventListener("click", (e) => {
      const userState = getUser().name;
      const currentUser = localStorage.getItem(userState);
      const parseCurrentUser = JSON.parse(currentUser);
      const updateUser = { ...parseCurrentUser, token: false };
      const stringUpdateUser = JSON.stringify(updateUser);
      localStorage.removeItem(userState);
      sessionStorage.removeItem("currentUser");
      localStorage.setItem(userState, stringUpdateUser);
      initController("Login");
    })

      switchMode.addEventListener("click", (e) => {
        console.log("He clicao")
        const main = document.querySelector("main");
        const header = document.querySelector("header");
        const switchMode = document.querySelector('#switchMode');
          const bright = 'rgb(100, 170, 185)';
          const dark = 'rgb(24, 57, 115)';
          const brightHeader = 'rgb(172, 197, 255)';
          const darkHeader = 'rgb(46, 106, 244)';
         switch(switchMode.src){
            case "https://res.cloudinary.com/drbssyzr7/image/upload/v1697492755/GameHut/healballl_wbdmdw.png":
                main.style.backgroundColor = dark;
                header.style.backgroundColor = darkHeader;
                switchMode.src = "https://res.cloudinary.com/drbssyzr7/image/upload/v1697492707/GameHut/dussskball_dnunwb.png";
                break;
            case "https://res.cloudinary.com/drbssyzr7/image/upload/v1697492707/GameHut/dussskball_dnunwb.png":
                main.style.backgroundColor = bright;
                header.style.backgroundColor = brightHeader;
                switchMode.src = "https://res.cloudinary.com/drbssyzr7/image/upload/v1697492755/GameHut/healballl_wbdmdw.png";
                break;
            }
      })
     
}




export const printTemplateNav = () => {
    document.getElementById("navBar").innerHTML = template();
    addEventListeners();
}