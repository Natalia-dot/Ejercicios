const { upload } = require('../../middleware/files.middleware');
const {
  userRegistration,
  stateRegister,
} = require('../controllers/User.controller');

const UserRoutes = require('express').Router();

UserRoutes.post('/register', upload.single('image'), userRegistration);
UserRoutes.post('/registerState', upload.single('image'), stateRegister);

module.exports = UserRoutes;
