const { upload } = require('../../middleware/files.middleware');
const sendCode = require('../controllers/sendCode');
const {
  userRegistration,
  stateRegister,
  redirectRegister,
  userLogin,
  resendCode,
  newUserCheck,
} = require('../controllers/User.controller');

//!--------ROUTES----------------------------------------------

const UserRoutes = require('express').Router();

UserRoutes.post('/register', upload.single('image'), userRegistration);
UserRoutes.post('/registerState', upload.single('image'), stateRegister);
UserRoutes.post(
  '/register/registerRedirect',
  upload.single('image'),
  redirectRegister
);
UserRoutes.post('/login', userLogin);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/check', newUserCheck);

//!-------REDIRECTS--------------------------------------------

UserRoutes.post('/register/sendMail/:id', sendCode);

module.exports = UserRoutes;
