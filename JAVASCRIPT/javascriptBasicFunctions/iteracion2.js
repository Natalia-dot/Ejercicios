//Completa la función que tomando un array de strings como argumento devuelva el más largo, 
//en caso de que dos strings tenga la misma longitud deberá devolver el primero.
//Puedes usar este array para probar tu función:


const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

const Findmax = (myArray) => {
    let maxWord = myArray[0];
    for (let i = 0; i < myArray.length; i++){
        if (myArray[i].length > maxWord.length){
            maxWord = myArray[i];
        }
    }
    return maxWord;
}

console.log(Findmax(avengers))