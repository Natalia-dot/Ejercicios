// 1.1 Añade un botón a tu html con el id btnToClick y en tu javascript añade el 
// evento click que ejecute un console log con la información del evento del click

let boton = document.getElementById('btnToClick');
boton.addEventListener("click", (e) =>{
console.log(e)
});

//!---------------------------------------------------------

//1.2 Añade un evento 'focus' que ejecute un console.log con el valor del input.

const miFuncion = () =>{
    console.log(botonFocus.value);
}

let botonFocus = document.querySelector(".focus");
console.log(botonFocus)
botonFocus.addEventListener('focus', miFuncion);

//!---------------------------------------------------------

//1.3 Añade un evento 'input' que ejecute un console.log con el valor del input. -->
const miFuncion2 = () =>{
    console.log(inputField.value)
}


let inputField = document.querySelector(".value");
inputField.addEventListener('input', miFuncion2);

