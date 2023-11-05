const convertToSeconds = (max) => {
    let [minutes, seconds] = timeString.split('.').map(Number);
    //Esto es un destructuting pero de un array. Como hace un split,
    //a la primera parte le asignara minutes y a la segunda seconds.
    //el Number es un 'constructor', que hace que todos los elementos
    //que sufran el map pasen por el 'constructor de numeros', asi que dara
    //un numero en vez de un string
    return minutes * 60 + seconds;
  }

  module.exports = convertToSeconds;