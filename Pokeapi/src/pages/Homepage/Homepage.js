import { initController } from '../../utils/route';
import './Homepage.css'
import { getPokeInfo } from '../../utils/pokeData';

const template = () => `
<div id= 'boxHomepage'>
<div id="Pokedex" class="box">
<h2>Pokedex</h2>
</div>
<div id="Whack" class="box">
<h2>Whack-a-Mewle</h2>
</div>
<div id="Quiz" class="box">
<h2>Quiz</h2>
</div>
</div>
`;

const addListeners = () =>{
    const Pokedex = document.getElementById('Pokedex')
    const Whack = document.getElementById('Whack')
    const Quiz = document.getElementById('Quiz')
    Pokedex.addEventListener('click', () =>{
        console.log('Pokedex');
        initController('Pokedex');
    });
    // Memory.addEventListener('click', () =>{
    //     console.log('Memory');
    //     initController('Memory');
    // });
    Quiz.addEventListener('click', () =>{
        console.log('Quiz');
        initController('Quiz');
    });
    Whack.addEventListener('click', () =>{
        console.log('Whack');
        initController('Whack');
    });
    
    
}

export const printTemplateHomepage = () => {
    document.querySelector("main").innerHTML = template();
    document.querySelector('nav').style.display='flex';
    addListeners();
    getPokeInfo();
}