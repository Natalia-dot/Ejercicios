//Crea una función que reciba por parámetro un array y cuando es un valor 
//number lo sume y de lo contrario cuente la longitud del string y lo sume. 
//Puedes usar este array para probar tu función:

//!-------------------- SUMA AL MISMO CONTADOR---------------------
const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
function averageWord(param) {
  sumita = 0
  for (let i = 0; i < param.length ; i++){
    isNaN(param[i]) == true ?
    sumita = sumita + param[i].length 
    : sumita = sumita + parseInt(param[i]);
  }
  return sumita;
}
console.log(averageWord(mixedElements))

//?-----------------------SUMA A DIFERENTES CONTADORES

function averageWord1(param) {
    sumaNum = 0
    sumaWord = 0
    for (let i = 0; i < param.length ; i++){
      Number.isInteger(param[i]) == false ?
      sumaWord = sumaWord + param[i].length 
      : sumaNum = sumaNum + (param[i]);
    }
    return `La suma total de los caracteres es ${sumaWord} y la suma de los integros es ${sumaNum}`;
  }
  console.log(averageWord1(mixedElements))

 