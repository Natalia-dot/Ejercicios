import './Whack.css'
import { printTemplateWhackStart } from './printTemplateWhackStart';

const template = () =>`
<div id=whack>
<div id='info'> 
<h1>Whack-a-Mewle</h1>
</div>
<div id='grid'>
<button id='buttonWhack'>Start Game!</button>
</div>
</div>
`

    const addListeners = () => {
        const buttonWhack = document.getElementById('buttonWhack');
        buttonWhack.addEventListener('click', (e) => {
            printTemplateWhackStart();

        })
    }


export const printTemplateWhack = () => {
    document.querySelector("main").innerHTML = template();
    addListeners();
}