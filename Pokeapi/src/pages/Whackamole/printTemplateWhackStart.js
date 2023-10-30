import { printGreatWhack } from './printGreatWhack';
import { printLoserWhack } from './printLoserWhack';
import './printTemplateWhackStart.css'
import { printWinnerWhack } from './printWinnerWhack';

const template = () =>`
<div id="whackGame">
<div class="gridContainer">
<div id="gridItem1" class="hole"></div>
<div id="gridItem2" class="hole"></div>
<div id="gridItem3" class="hole"></div>
<div id="gridItem4" class="hole"></div>
<div id="gridItem5" class="hole"></div>
<div id="gridItem6" class="hole"></div>
<div id="gridItem7" class="hole"></div>
<div id="gridItem8" class="hole"></div>
<div id="gridItem9" class="hole"></div>
</div> 
</div>
`
const addListeners = () => {
    const allItems = document.querySelectorAll(".hole");
    allItems.forEach((item) => {
        item.addEventListener("click", (e) =>{
            console.log(item.classList)
                item.classList.contains("aquiHayTopo") && finalScore ++

            console.log(finalScore)
        })
    })
}

function getRandomInteger() {
    return Math.floor(Math.random() * 9) + 1;
  }  

  let finalScore = 0;
export const printTemplateWhackStart = () =>{
    finalScore = 0;
    document.querySelector('main').innerHTML = template();
    setTimers();
    addListeners();
    console.log()
 
}

export const moleAppearInterval = () => {
    const intervalSet = setInterval(() => {
        console.log("Un segundo...")
        deleteTopo();
        printTopo();
    }, 900)
    return intervalSet;
    
}


export const intervalDelete = (moleAppearInterval)=> {
    console.log("moleAppearInterval", moleAppearInterval)
    setTimeout(() => {
        console.log("game ended")
        clearInterval(moleAppearInterval);
        console.log(finalScore);
        if(finalScore < 10) printLoserWhack();
        else if(finalScore > 20) printGreatWhack();
        else printWinnerWhack();
        
      }, 30000); 
}



const setTimers =() =>{
    const intervalSet = moleAppearInterval()
    intervalDelete(intervalSet);
}


const printTopo = () => {
    const gridItems = document.querySelectorAll(".hole");
    const topoTarget = document.getElementById(`gridItem${getRandomInteger()}`)
    topoTarget.setAttribute("class", "aquiHayTopo");


    }
    
const deleteTopo = () =>{
    document.querySelector(".aquiHayTopo") && document.querySelector(".aquiHayTopo").setAttribute("class", "hole");
}

