import { printTemplateNav } from '../Nav/Nav';
import './Header.css'

const template = () =>`
<img id="logo" src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697530282/GameHut/healingMachineNew_cksnz9.png" alt="Healing pokemon machine" id='logo'> 
<h1> Poke Town </h1>
<div id="navBar"></div>

`

export const printTemplateHeader = () =>{
    document.querySelector('header').innerHTML = template();
    printTemplateNav();
}
