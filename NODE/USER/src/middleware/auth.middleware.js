const dotenv = require('dotenv');
const { verifyToken } = require('../utils/token');
const User = require('../api/models/User.model');
dotenv.config();

const isAuthorized = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', ''); //el estado tiene el token del usuario creado en el login
  if (!token) {
    return next(new Error('No access.')); //si no tiene token, no puede entrar pq significa qu e no ha iniciado sesion
  }
  try {
    const decodedToken = verifyToken(token, process.env.JWT_SECRET);
    //decodificar el token con la funcion que hemos hecho que saca el id y email
    console.log(decodedToken);
    req.user = await User.findById(decodedToken.id);
    //se encuentra el usuario con el id del token y lo asignamos a req.user
    next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  //es un parametro de los headers de la request, y hay que quitarle el placeholder de
  //bearer para entregarle solo el token
  if (!token) {
    //si no hay token, significa que no esta loggeado
    return next(new Error('No access.'));
  }
  try {
    //si si lo tiene, miramos que el rol del usuario que buscamos por id decodificando el token
    //sea admin.
    const decodedToken = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    if (req.user.role !== 'admin') {
      return next(new Error('You do not have admin permissions.'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isAuthorized, isAdmin };
