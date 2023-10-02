/*Iteración #6: Mixed For...of e includes**

Usa un bucle **for...of** para recorrer todos los juguetes y 
elimina los que incluyan la palabra gato. Recuerda que puedes 
usar la función ***.includes()*** para comprobarlo.Puedes usar este array:*/

const toys = [
{id: 5, name: 'Buzz MyYear'}, 
{id: 11, name: 'Action Woman'}, 
{id: 23, name: 'Barbie Man'}, 
{id: 40, name: 'El gato con Guantes'},
{id: 40, name: 'El gato felix'}
]

/*
Hacemos un bucle for of para recorrer el array
en toys.name.includes(gato)? entonces arr.splice(index,1)
    else nada
*/
const newArray=[]
const deleteToys = (arr,word) =>{
    for(element of arr){
        element.name = element.name.toLowerCase();
        !element.name.includes(word) && newArray.push(element);
    }
}
deleteToys(toys,"gato")
console.log(newArray)