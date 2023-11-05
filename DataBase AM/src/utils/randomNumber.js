const randomNumber = () => {
  let code = Math.floor(Math.random() * (999999 - 100000) + 100000);
  return code;
};

module.exports = randomNumber;

//vamos a poner un codigo de seis digitos siempre, porlo que tiene que estar comprendido el rango
//entre 100000 y 999999
