/*Iteration #8: Contador de repeticiones

Crea una función que nos devuelva el número de veces que se repite cada una de 
las palabras que lo conforma.  Puedes usar este array para probar tu función: */


const counterWords = [
  'code',
  'repeat',
  'eat',
  'sleep',
  'code',
  'enjoy',
  'sleep',
  'code',
  'enjoy',
  'upgrade',
  'code'
];

const wordsAndCount = []  //{input : xxx, count : xxx}
function repeatCounter(arr) {
  arr.forEach((word, index) => {
    console.log("Este es el primer forEach")
    wordsAndCount.forEach((element, index) => {
      if (!element.input.includes(word)){
        console.log("No esta aun")
        let acc = 0;
        arr.forEach((word, index) => {
          if (element === word)
          acc++
        })
        wordsAndCount.push({input:word, count:acc})

      }
    })
  })
}
 repeatCounter(counterWords)
 console.log(wordsAndCount)

/*   arr.forEach((word, index) => {
    let acc = 0
    wordsAndCount.forEach((element, index) =>{
      !element.input.includes(word) && acc++;
    })
    if (acc === 0){
      acc = 0
      arr.forEach((element, index) => {
        word === element && acc++;
      })
      wordsAndCount.push({input: word, count:acc,});

    } 
  }
  )//)}
    
  repeatCounter(counterWords)
console.log(wordsAndCount)

//------------------------------------------------- */

