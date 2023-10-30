export const printTemplateWinner = () => {
    document.querySelector('main').innerHTML=`
    <div class=quizFinish>
    <h1>Congratulations! You can't be rivaled!</h1>
    <p>It seems you've studied your fair share.</p>
    <p>We'll <sub>not</sub>send you an item through your mail. </p>
    </div>
    `
}

export const printTemplateMid = () => {
    document.querySelector('main').innerHTML=`
    <div class=quizFinish>
    <h1>That's pretty good.</h1>
    <img src="" alt="">
    <p>I mean, it's clear you are not an expert Pokemon Master,</p>
    <p>but perhaps you just have allergies.</p>
    </div>
    `
}

export const printTemplateLoser = () => {
    document.querySelector('main').innerHTML=`
    <div class=quizFinish>
    <h1>Even the Mudbrays have a bigger brain than you do...</h1>
    <p>Why did you even take the test?</p>
    </div>
    `
}