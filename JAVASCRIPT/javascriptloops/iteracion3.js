/*Iteración #3: Probando For...of**

Usa un bucle forof para recorrer todos los destinos del array. Imprime en un ***console.log*** sus valores.

Puedes usar este array:*/


const placesToTravel = ['Japon', 'Venecia', 'Murcia', 'Santander', 'Filipinas', 'Madagascar']

const iteracion = (arr) => {
    for(value of arr) {
        console.log(value)
    }
}

iteracion(placesToTravel)