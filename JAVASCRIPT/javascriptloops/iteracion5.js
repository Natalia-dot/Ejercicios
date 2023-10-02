/**Iteración #5: Probando For**

Usa un bucle **for** para recorrer todos los destinos del
 array y elimina los elementos que tengan el id 11 y 40. 
 Imprime en un ***console log*** el array. Puedes usar este array:*/


const placesToTravel = [{id: 5, name: 'Japan'}, 
{id: 11, name: 'Venecia'}, 
{id: 23, name: 'Murcia'}, 
{id: 40, name: 'Santander'}, 
{id: 44, name: 'Filipinas'}, 
{id: 59, name: 'Madagascar'}]

/*
(Hacemos un nuevo array donde pushearlo)
1. Recorremos todos los objetos del array principal.
2. En cada objeto, vemos si el key que se llama id = 11 || 40.
3. Si es false, hacemos push del objeto al nuevo array, si no, no lo insertamos (al revees usando !)
4.console.log new arr
*/


const placesDelete = (arr) => {
    arr.forEach((element, index) => {
    element.id === 11 || element.id ===40 ? arr.splice(index, 1) : undefined ;
    })
    return arr
}

placesDelete(placesToTravel)
console.log(placesToTravel)


const newArray = []
const placesDelete2 = (arr) => {
    arr.forEach((element, index) => {
    element.id != 11 || element.id !=40 ? newArray.push(element): undefined ;
    })
    return arr
}
placesDelete2(placesToTravel);
console.log(newArray)
