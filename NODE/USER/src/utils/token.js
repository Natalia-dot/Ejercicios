const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (id, userEmail) => {
  if (!id || !userEmail) {
    //si falta id o userEmail
    throw new Error('Id or email missing.'); //error con falta uno de los dos
  } else {
    return jwt.sign({ id, userEmail }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    }); //DEVOLVEMOS el jwt encriptado con jwt.sign
  }
};

const verifyToken = (token) => {
  if (!token) {
    //si no hay token
    throw new Error('Token is missing.'); //error token is missing
  } else {
    return jwt.verify(token, process.env.JWT_SECRET); //jwt.verify
  }
};

module.exports = { generateToken, verifyToken };
