const convertToSeconds = (songTime) => {
  console.log(songTime);
  let [minutes, seconds] = songTime.split('.').map(Number);
  let sum = minutes * 60 + seconds;
  console.log(sum);
  //Esto es un destructuting pero de un array. Como hace un split,
  //a la primera parte le asignara minutes y a la segunda seconds.
  //el Number es un 'constructor', que hace que todos los elementos
  //que sufran el map pasen por el 'constructor de numeros', asi que dara
  //un numero en vez de un string
  return sum;
};

module.exports = convertToSeconds;
