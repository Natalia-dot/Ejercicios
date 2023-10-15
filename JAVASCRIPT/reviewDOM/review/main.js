// 1.1 Basandote en el array siguiente, crea una lista ul > li 
// dinámicamente en el html que imprima cada uno de los paises.
const countries = ['Japón', 'Nicaragua', 'Suiza', 'Australia', 'Venezuela'];


let funcionPaises = (arr) => {
    let lista = document.querySelector("body");
    let myUl = document.createElement("ul")
    lista.append(myUl);
    arr.forEach((country, index) => {
        let newListItem = document.createElement('li');
        newListItem.textContent = arr[index];
        myUl.appendChild(newListItem);
    });
}

funcionPaises(countries);
//!--------------------------------
//1.2 Elimina el elemento que tenga la clase .fn-remove-me.
let removeFunction = document.getElementsByClassName("fn-remove-me");
removeFunction[0].remove();



//!--------------------------------
// 1.3 Utiliza el array para crear dinamicamente una lista ul > li de elementos 
// en el div de html con el atributo data-function="printHere".
const cars = ['Mazda 6', 'Ford fiesta', 'Audi A4', 'Toyota corola', 'AA'];

let funcionCar = (arr) =>{
let divCarList = document.querySelector('[data-function="printHere"]');
let carUL = document.createElement('ul') ;
divCarList.appendChild(carUL);
arr.forEach((car) => {
    let newCar = document.createElement('li');
    newCar.textContent = car;
    carUL.append(newCar);
})
}
funcionCar(cars)


//!--------------------------------

// 1.4 Crea dinamicamente en el html una serie de divs que contenga un elemento 
// h4 para el titulo y otro elemento img para la imagen.
const countriespics = [
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=1"}, 
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=2"},
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=3"},
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=4"},
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=5"},
    {title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=1"}, 
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=2"},
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=3"},
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=4"},
	{title: 'Random title', imgUrl: "https://picsum.photos/300/200?random=5"}
];

let newCountries = (arr) => {
    let newCountryDiv = document.createElement('div');
    newCountryDiv.id = 'countryDiv'
    document.body.appendChild(newCountryDiv)

    arr.forEach((item, index) => {

        let arrayTitle = item.title;
        let arrayImage = item.imgUrl;
        console.log(arrayImage)
        let figure = `<div class=countryItemDiv id=country${index+1}>
        <h4> ${arrayTitle} ${index+1} </h4>
        <img src=${arrayImage}>
        </div>`
        document.getElementById('countryDiv').innerHTML += figure;

    })}
    newCountries(countriespics)

// let nuevoTexto = document.createElement('p');
// nuevoTexto.textContent = 'Asi se puede?';
// document.head.appendChild(nuevoTexto)


//!--------------------------------

// 1.5 Basandote en el ejercicio anterior. Crea un botón que elimine el último 
// elemento de la serie de divs.
let divDePaises = document.querySelector('#countryDiv');
divDePaisesUltimo = divDePaises.lastElementChild;
let boton = `<button id="ultimoBoton"> Eliminar </button>`
divDePaisesUltimo.innerHTML+= boton;

let botonEliminar = document.getElementById('ultimoBoton')
botonEliminar.addEventListener('click', (evento) =>{
    divDePaisesUltimo.remove();
})




//!--------------------------------

// 1.6 Basandote en el ejercicio anterior. Crea un botón para cada uno de los 
// divs que elimine ese mismo elemento del html.
let divDePaises1 = document.querySelectorAll('.countryItemDiv');

let funcionBotonEliminar = (arr) => {
    arr.forEach((country, index) => {
        let buttonId = country.id;
        let newButton = document.createElement('button');
        newButton.id = `button_${buttonId}`;
        newButton.textContent = 'Eliminame';
        country.appendChild(newButton);

        newButton.addEventListener('click', (eventoElim) =>{
            countryToElim = document.getElementById(buttonId);
            countryToElim.remove();
        })
    })

}
funcionBotonEliminar(divDePaises1)