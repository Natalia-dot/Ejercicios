
import './Quiz.css';
import { printQuizQuestions } from './quizQuestions';

const template = () =>`
<div id='quiz'>
<h1> How much do you know about Pokemon? </h1>
<img src='https://res.cloudinary.com/drbssyzr7/image/upload/v1697447537/GameHut/pikachugif_ltyilf.gif' alt="Pikachu wondering">
<button id='startQuizButton'> Start Quiz </button>
</div>
`
    const addListeners = () => {
        const startQuizButton = document.getElementById("startQuizButton");
        startQuizButton.addEventListener("click", (e) => {
            let i = 0;
            printQuizQuestions(pokemonQuiz, i);          //le meto el valor index para que me imprima directamente con esos valores
        }) 
    }


export const printTemplateQuiz = () => {         //aqui llamo a la funcion que va a setearme todas las preguntas en el template
    document.querySelector("main").innerHTML = template();
    addListeners();
}


export const pokemonQuiz = [
    {
        question: "What is the evolved form of Bulbasaur?",
        answers: ["Squirtle", "Ivysaur", "Charizard", "Pikachu"],
        correctAnswer: "Ivysaur"
    },
    {
        question: "Which Pokémon is known as the 'Fire Mouse'?",
        answers: ["Blastoise", "Jigglypuff", "Charmander",  "Snorlax"],
        correctAnswer: "Charmander"
    },
    {
        question: "What is the primary type of Pikachu?",
        answers: [ "Fire", "Grass", "Electric", "Water"],
        correctAnswer: "Electric"
    },
    {
        question: "Which Pokémon is known for its ability to put foes to sleep?",
        answers: ["Mewtwo","Jigglypuff", "Kadabra", "Machop"],
        correctAnswer: "Jigglypuff"
    },
    {
        question: "What is the name of the water-type Pokémon with a spiral shell on its back?",
        answers: [ "Bulbasaur", "Charmander", "Squirtle", "Pikachu"],
        correctAnswer: "Squirtle"
    },
    {
        question: "Which Pokémon is known as the 'Seed Pokémon'?",
        answers: ["Bulbasaur", "Charizard", "Squirtle", "Pikachu"],
        correctAnswer: "Bulbasaur"
    },
    {
        question: "What is the primary type of Charizard?",
        answers: ["Fire", "Water", "Electric", "Grass"],
        correctAnswer: "Fire"
    },
    {
        question: "Which Pokémon is known for its incredible speed?",
        answers: [ "Lapras", "Electrode", "Slowpoke", "Geodude" ],
        correctAnswer: "Electrode"
    },
    {
        question: "What is the evolved form of Charmander?",
        answers: ["Squirtle", "Bulbasaur", "Charmeleon", "Charizard"],
        correctAnswer: "Charmeleon"
    },
    {
        question: "Which Pokémon is known as the 'Rock Pokémon'?",
        answers: ["Mewtwo","Geodude",  "Kadabra", "Machop"],
        correctAnswer: "Geodude"
    },
    {
        question: "What is the primary type of Blastoise?",
        answers: ["Water", "Fire", "Electric", "Grass"],
        correctAnswer: "Water"
    },
    {
        question: "Which Pokémon is known as the 'Sleep Pokémon'?",
        answers: [ "Pikachu", "Jigglypuff", "Blastoise", "Snorlax"],
        correctAnswer: "Snorlax"
    },
    {
        question: "What is the primary type of Abra?",
        answers: ["Fighting", "Psychic", "Dark", "Ghost"],
        correctAnswer: "Psychic"
    },
    {
        question: "Which Pokémon evolves into Alakazam?",
        answers: ["Kadabra", "Machop", "Mewtwo", "Geodude"],
        correctAnswer: "Kadabra"
    },
    {
        question: "What is the primary type of Squirtle?",
        answers: [ "Fire", "Electric", "Water", "Grass"],
        correctAnswer: "Water"
    }
    ]; 

