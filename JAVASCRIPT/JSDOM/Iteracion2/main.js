// 2.1 Inserta dinamicamente en un html un div vacio con javascript.
let emptyDivSpace = document.getElementsByTagName('body')[0];
let emptyDiv = document.createElement('div');
emptyDivSpace.appendChild(emptyDiv);


//!-----------------------------------------------------
//2.2 Inserta dinamicamente en un html un div que contenga una p con javascript.

let pDivSpace = document.getElementsByTagName('body')[0];
let pDiv = document.createElement('div');
pDivSpace.appendChild(pDiv);

let newPSpace = document.createElement('p');
let newP = document.createTextNode("Hola")
newPSpace.append(newP);
pDiv.append(newPSpace);

//!-----------------------------------------------------
//2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.

let loopPSpace = document.getElementsByTagName('body')[0]
let loopDiv = document.createElement('div');
loopPSpace.appendChild(loopDiv);

const insertP = (counter) =>{
  let count = 1;
for(let i = 0; i < counter; i++ ) {
let loopParagraph = document.createElement('p');
loopParagraph.textContent=count
loopDiv.appendChild(loopParagraph);
count++
}
}
insertP(2)

//!-----------------------------------------------------
//2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.
let soyDinamicoSpace = document.getElementsByTagName('body')[0];
let soyDinamicoPara = document.createElement('p');
let textoDinamico = document.createTextNode("Soy dinámico!");
soyDinamicoPara.append(textoDinamico);
soyDinamicoSpace.appendChild(soyDinamicoPara);


//!-----------------------------------------------------
//2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.
let newHeader = document.querySelector('h2.fn-insert-here')
newHeader.innerHTML = "Wubba Lubba dub dub"

//!-----------------------------------------------------
//2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.
const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];
// let ulSpace = document.getElementsByTagName('head')[0];
let unorderedList = document.createElement('ul');
emptyDiv.appendChild(unorderedList);

const socialApps = (arr) =>{
  arr.forEach((item) => {
    let newListItem = document.createElement('li');
    let newListItemText = document.createTextNode = item;
    newListItem.append(newListItemText);
    unorderedList.appendChild(newListItem); })
}
socialApps(apps)

//2.7 Elimina todos los nodos que tengan la clase .fn-remove-me
let quitar = document.querySelectorAll(".fn-remove-me");
quitar.forEach(item => item.remove());

//2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div. 
//	Recuerda que no solo puedes insertar elementos con .appendChild.
let nuevoTexto = document.createElement('p');
nuevoTexto.textContent = 'Voy en medio!';
let divDeTexto = document.querySelector('div');
divDeTexto.insertAdjacentElement('afterend', nuevoTexto);

//2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here
  let getDiv = document.querySelectorAll('.fn-insert-here');
  getDiv.forEach((item, index) => {
  let nuevoTexto = document.createElement('p');
  nuevoTexto.textContent = 'Voy dentro!';
  item.appendChild(nuevoTexto);
})
