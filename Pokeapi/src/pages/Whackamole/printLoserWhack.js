const template = () => `
<div id="printWinner">
<h3>Look...</h3>
<p>We ended up with more troublesome Meowths after you showed up.</p>
<p>Please just leave.</p>
<img src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697545507/GameHut/meowthcute_t0seh2.gif" alt="A laughing Meowth">
<p id="meowth">The Meowth colony settled after this attack on their tribe, and they soon captured the human base... And they are aiming for the world.</p>
</div>

`

export const printLoserWhack = () =>{
    document.querySelector("main").innerHTML = template();
}