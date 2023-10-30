//! Aqui van los imports. Aun no tengo las funcionalidades, pero solo quiero estipular un sitio
//! para recordarlo. Solo hare el styles.css
import "./styles.css"
//https://art.pixilart.com/d7286040cf8a23b.png heal ball cambiar el primero

//? Hago el template HTML de la pagina, hago la funcion de eventos y luego declaro la funcion printTemplateHeader.
//? printTemplate llama al innerHTML de "header" (que es creado en initTemplate cuando la llamemos alli) y llama a
//? los correspondientes parametros en la misma funcion printTemplateHeader

const template = () => `
<img src="https://www.models-resource.com/resources/big_icons/16/15143.png?updated=1465352091" alt="Pokemon Healing Machine" id="logo">
<nav> 
    <img id="duskBall" src="https://art.pixilart.com/52068388bc23631.png" alt="Pixel Dusk Ball"> 
    <img id="pokemonHouse" src="https://art.pixilart.com/0ab799000b87be1.png" alt="Pixel Pokemon House">
    <img src="https://art.pixilart.com/dc61714b4414ed5.png" alt="Back Arrow">
</nav>`