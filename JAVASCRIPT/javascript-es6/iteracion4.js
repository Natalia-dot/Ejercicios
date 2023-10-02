/*4.1 Dado el siguiente array, devuelve un array con sus nombres 
utilizando .map().*/
const users = [
	{id: 1, name: 'Abel'},
	{id:2, name: 'Julia'},
	{id:3, name: 'Pedro'},
	{id:4, name: 'Amanda'}
];
//let newUsers = users.map((names) => {return names.name})


/*4.2 Dado el siguiente array, devuelve una lista que contenga los valores 
de la propiedad .name y cambia el nombre a 'Anacleto' en caso de que 
empiece por 'A'.*/
const users1 = [
	{id: 1, name: 'Abel'},
	{id:2, name: 'Julia'},
	{id:3, name: 'Pedro'},
	{id:4, name: 'Amanda'}
];

let newUsers1 = []
let iteracion = (arr) => {
newUsers1 = arr.map((names) =>
(names.name[0] === "A" ? names.name = "Anacleto" : names.name)
)}

iteracion(users1)
//console.log(newUsers1)

/*4.3 Dado el siguiente array, devuelve una lista que contenga los valores 
de la propiedad .name y añade al valor de .name el string ' (Visitado)' 
cuando el valor de la propiedad isVisited = true.*/
const cities = [
	{isVisited:true, name: 'Tokyo'}, 
	{isVisited:false, name: 'Madagascar'},
	{isVisited:true, name: 'Amsterdam'}, 
	{isVisited:false, name: 'Seul'}
];

    let newArr = cities.map((city)=> {
        if (city.isVisited) city.name += " Visitado"
        return city
    })


console.log(newArr)





// const cityVisits = (arr) => {
// const newCity = arr.map((city) =>{
//     if (city.isVisited) city.name = `${city.name} visited`
// })
// }
// cityVisits(cities)
// console.log(newCity)
