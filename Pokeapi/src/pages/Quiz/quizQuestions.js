import './quizQuestions.css'
import { printTemplateLoser, printTemplateMid, printTemplateWinner } from './printWinLose';
import { pokemonQuiz } from './Quiz';

const template = (pokemonQuiz, i) => `
    <div id="quizQuestions">
        <h4>Question ${i+1} of 15</h4>
        <h2>${pokemonQuiz[i].question}</h2>
        <div id='buttonsDiv'>   
        <button class="questionButtonClass">${pokemonQuiz[i].answers[0]}</button>    
        <button class="questionButtonClass">${pokemonQuiz[i].answers[1]}</button>
        <button class="questionButtonClass">${pokemonQuiz[i].answers[2]}</button>
        <button class="questionButtonClass">${pokemonQuiz[i].answers[3]}</button>
        </div>
        <button id='nextQuestion' disabled="true"> Next Question </button>
    </div>
`
 //?voy a hacer otra llamada al boton para la siguiente pregunta, que lo que va a hacer es borrarse cuando se clique.
   
 //const addListeners = () =>{ //vamos a meterle una funcion que al tocar una de las opciones hace un if, deliberando si 
        //const buttons = document.getElementsByClassName("questionButtonClass")
        //buttons.addEvent
        
    //}
    let answerCounter = 0
    const addListeners = (pokemonQuiz, i) => {
        const allQButtons = document.querySelectorAll(".questionButtonClass");        //todos los botones de opciones
        const nextQuestionButton = document.getElementById("nextQuestion");             //boton para siguiente pregunta
        allQButtons.forEach(button => {

            button.addEventListener("click", (e) => {
                if (button.textContent === pokemonQuiz[i].correctAnswer) {
                button.style.background = '#83c54a';
                } else button.style.background = '#e64110'
                
                if(button.textContent === pokemonQuiz[i].correctAnswer) {
                    answerCounter ++;
                    allQButtons.forEach(button => button.setAttribute("disabled", "true"));

                    console.log("Wii");
                    nextQuestionButton.removeAttribute("disabled");
                 } else {
                    allQButtons.forEach(button => button.setAttribute("disabled", "true"));
                    console.log("Noo");
                    nextQuestionButton.removeAttribute("disabled");
                    
                 }
            }
        )}
        )
    nextQuestionButton.addEventListener("click", (e) =>{
        i++;
        if(i !== 15) {
        printQuizQuestions(pokemonQuiz, i);
        } else{
            if (answerCounter <= 5) {
                printTemplateLoser();
                answerCounter = 0;
            } else if (answerCounter <= 10) {
                printTemplateMid();
                answerCounter = 0;
            } else {
                printTemplateWinner(); 
                answerCounter = 0;
            }
            
    }})
    
    }
    



export const printQuizQuestions = (pokemonQuiz, i) => {
    document.querySelector("main").innerHTML = template(pokemonQuiz, i);
    addListeners(pokemonQuiz,i);
    document.getElementById("nextQuestion").setAttribute("disabled", "true");
}
//math.random en utils

