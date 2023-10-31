const { upload } = require('../../middleware/files.middleware');
const sendCode = require('../controllers/sendCode');
const {
  userRegistration,
  stateRegister,
  redirectRegister,
} = require('../controllers/User.controller');

const UserRoutes = require('express').Router();

UserRoutes.post('/register', upload.single('image'), userRegistration);
UserRoutes.post('/registerState', upload.single('image'), stateRegister);
UserRoutes.post(
  '/register/registerRedirect',
  upload.single('image'),
  redirectRegister
);

//!-------REDIRECTS----------

UserRoutes.post('/register/sendMail/:id', sendCode);

module.exports = UserRoutes;
