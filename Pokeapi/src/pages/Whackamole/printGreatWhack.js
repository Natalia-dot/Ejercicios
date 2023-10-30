const template = () => `
<div id="printWinner">
<h1>Thank you for your excellent job.</h1>
<p>You are an ace at this! Do you hate Meowths?</p>
<p>We have been left speechless by your skills... We do not condone any animal violence whatsoever though.</p>
<p>Thanks for taking care of the trouble nonetheless.</p>
<img id="professorOak" src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697447537/GameHut/oak_bgymff.gif" alt="A happy Togepi">
</div>
`

export const printGreatWhack = () =>{
    document.querySelector("main").innerHTML = template();
}