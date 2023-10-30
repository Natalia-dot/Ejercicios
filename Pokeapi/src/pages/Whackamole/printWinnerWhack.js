const template = () => `
<div id="printWinner">
<h1>Congratulations, you are a good pest exterminator.</h1>
<p>We greatly appreciate your efforts.</p>
<p>If you are currently looking for a job, you may leave your</p>
<p>resume... Somewhere. Don't ask me though, we don't have forms here.</p>
<img id="togepiPic" src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697554658/GameHut/togepi_lcujzh.gif" alt="A happy Togepi">
</div>
`

export const printWinnerWhack = () =>{
    document.querySelector("main").innerHTML = template();
}