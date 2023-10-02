const randomElementTwo = [
  "folio",
  "carpeta",
  "boli",
  "lapiz",
  "boli",
  "carpeta",
  "folio",
  "lapiz",
  "folio",
];

const countElement = [];                                  // ----_> creamos la variable que se encarga de guardar la solucion del problema

randomElementTwo.forEach((material, index) => {           // ---> recorro el array y me paro en un elemento singular
  let acc = 0;                                           // inicializo un acumulador que se utilizara a lo largo del programa
  countElement.forEach((count, index) => {              // recorro el array que contiene el resultado para saber si ya he contado el elemento
    count.element.includes(material) && acc++;            // como el array de los resultados tiene objetos con los resultados, tengo que mirar
                                                         //donde esta el nombre del objeto que es en el clave element
                                                         /// si lo incluye el contador lo incremento para saber que ya lo he contado
  });

  if (acc == 0) {                                         // si contador es igual a cero quiere decir que no lo he contado y por lo tanto que lo tengo que contar
    acc = 0;                                             // reincializo la variable de acumulador para volver a utlizarla
    randomElementTwo.forEach((materialCount, index) => {  // vuelvo a recorrer el array de elementos pero dentro del bucle inicial que se encuentra parado en un elemento singular
                                                         // si el elemento incial del primer bucle coincide con los elementos que estoy iterando en el segundo bucle
      material == materialCount && acc++;                // incremento el acumulador
    });

    //una vez me salgo del bucle y ya tengo contado, push en el array de la solucion un objeto con el nombre y las veces que se repite
    countElement.push({
      element: material,
      repeat: acc,
    });
  }
});

//console.log(countElement);


/*const randomElementTwo = [
  "folio",
  "carpeta",
  "boli",
  "lapiz",
  "boli",
  "carpeta",
  "folio",
  "lapiz",
  "folio",
];*/

const countElement1 = [];

randomElementTwo.forEach((material, index) => {
  let acc = 0;
  countElement1.forEach((count, index) => {
    count.element.includes(material) && acc++;
  });

  if (acc == 0) {
    acc = 0;      
    randomElementTwo.forEach((materialCount, index) => { 
      material == materialCount && acc++;
    });
    countElement1.push({
      element: material,
      repeat: acc,
    });
  }
});

//console.log(countElement1);

//!-----------------------------------------MAP---------------------------------------------------//
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];

const names = users.map(user => user.name);

//console.log(names); // ['John', 'Jane', 'Bob']

// Lo que tenemos 

var officers = [  
  { id: 20, name: 'Captain Piett' },  
  { id: 24, name: 'General Veers' },  
  { id: 56, name: 'Admiral Ozzel' },  
  { id: 88, name: 'Commander Jerjerrod' }
];

const age = officers.map(officer => officer.id);
//console.log(age)
// Lo que necesitamos [20, 24, 56, 88]

//!----------------------------------------------------------------------------

const arr = [0, 1];
let hola = arr.map((e) => e + 1)
console.log(arr) // [1, 2]
console.log(hola)

const alumnos =
[
{name : "Gerbasio",
age: 13,
likes : ["spaghetti","chocolate"]}
]
console.log(alumnos[0].likes[1])