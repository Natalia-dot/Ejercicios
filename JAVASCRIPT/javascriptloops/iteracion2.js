/***Iteración #2: Condicionales avanzados**

Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados y 
añade la propiedad ***isApproved*** a true o false en consecuencia. Una vez lo tengas
 compruébalo con un ***console.log***. 

( **Mirar abajo en pistas** ).

Puedes usar este array para probar tu función: */

const alumns = [
    {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
		{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
		{name: 'Juan Miranda', T1: false, T2: true, T3: true},
		{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
		{name: 'Raquel Benito', T1: true, T2: true, T3: true}
]

/* 
1. Vamos a recorrer el array y pararnos en cada uno de los objetos (forEach)
(2. Cuando este parado el array tenemos que iterar sobre las diferentes claves. Inicializamos un
accumulator que vamos a usar para contar el numero de asignaturas que tienen aprobadas. Si es igual o mayor a dos, 
estan aprobados, si no, suspensos.)
2. For in de cada objeto, inicializamos un acc. si la key es true,
*/ 

const funcionAlumnos = (arr) => {
	arr.forEach((alumn) => {
		let acc = 0;
		if (alumn.T1 === true){
			acc++
		} 
		if (alumn.T2 === true){
			acc++
		}
		if (alumn.T3 === true){
			acc++
		}
		acc >= 2 ? alumn.isApproved = true : alumn.isAproved = false;
	}) 
	return arr
}

const newArr = funcionAlumnos(alumns)

console.log(newArr)












/*
const trimestrales = (alumns) =>{
	alumns.forEach(element => {
		let acc = 0
		for (key in element){
		if (key == key[T1] || key == key[T2] || key == key[T3]) {
			key[1] == true?console.log ("Me ejecuto") : console.log ("Nada")
		} else;
	}
	});

}
trimestrales(alumns)*/