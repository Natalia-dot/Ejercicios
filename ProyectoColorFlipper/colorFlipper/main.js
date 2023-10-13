import "./styles.css"

const palette = {
    '#fdc0abff': 'Melon',
    '#b10f2eff': 'Madder',
    '#570000ff': 'Rosewood',
    '#280000ff': 'Black Bean',
    '#de7c5aff': 'Burnt Sienna',
}

// const selectorTexto = (obj) => {
//     let selector = document.querySelector('#color-picker')
//     Object.keys(obj).forEach((color) => {
//         let colorAnadido = document.createElement('option')
//         colorAnadido.value = color;
//         selector.append(colorAnadido)
//     })
// }

// selectorTexto(palette);

const asignarOptions = () => {
    let selector = document.querySelector('#color-picker'); //referenciamos donde vamos a meter lo que hagamos aqui

    Object.keys(palette).forEach((color, index) => {
        let option = document.createElement('option');
        option.value = color;
        option.innerText = palette[color];
        selector.appendChild(option);
    })
}

const cambiarColor =() => {
    let selector = document.querySelector('#color-picker') 
    selector.addEventListener('change', () => {
        selector.value == '@fff'? document.body.style.backgroundColor = '#FFFFFF':
        document.body.style.backgroundColor = selector.value;
    })
 }

 const ponerTextoH2 = (palette) => {
    let selector = document.querySelector('#color-picker');
    let colorDesc = document.querySelector('#color-desc')
    selector.addEventListener('change', () =>{
        let header2 = document.querySelector('h2');
        header2.innerText = `Has elegido el color ${selector.value} con codigo ${selector[value]}`
    })
 }


    asignarOptions();
    cambiarColor();
    ponerTextoH2(palette);