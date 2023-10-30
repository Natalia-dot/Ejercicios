import "./Footer.css"

const template =() => `
<a href='https://www.delugerpg.com/'><img src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697294301/GameHut/masterball_d3slf9.png" alt="Master Ball" title="Fanmade Online Game"></a>
<a href='https://pokemon.alexonsager.net/'><img src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697294301/GameHut/pokeball_zzhhul.png" alt="Pokeball" title="Pokemon Fusion"></a>
<p> Click on the PokeBalls for a surprise.</p>
<a href='https://pokemonshowdown.com/'><img src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697294301/GameHut/pokeball_zzhhul.png" alt="Pokeball" title="Battle players online"></a>
<a href='https://tcm.pokecharms.com/'><img src="https://res.cloudinary.com/drbssyzr7/image/upload/v1697294301/GameHut/pokeball_zzhhul.png" alt="Pokeball" title="Create your own Trainer Card"></a>
`
//Ya hemos creado el footer, asi que ahora vamos a hacer la funcion print, con la que vamos a seleccionar
//el elemento footer del html y a inyectarle el template

export const printTemplateFooter = () =>{
    document.querySelector('footer').innerHTML = template();
}