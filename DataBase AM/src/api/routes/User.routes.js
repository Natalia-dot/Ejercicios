const { isAuthorized } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {
  userRegistration,
  stateRegister,
  redirectRegister,
  userLogin,
  resendCode,
  newUserCheck,
  passChangeWhileLoggedOut,
  autoLogin,
  sendCode,
  sendPassword,
  passwordChange,
  updateUser,
  deleteUser,
  toggleFollow,
  toggleFavSong,
  toggleFavAlbum,
  getBySwitch,
  sortSwitch,
  getUserById,
  getUserByIdLikedAlbums,
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
UserRoutes.post('/login/autologin', autoLogin);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/check', newUserCheck);
UserRoutes.patch(
  '/changeUserPassword/changeUserPassword',
  passChangeWhileLoggedOut
);

//!---------AUTH-----------------
UserRoutes.patch('/changePassword', [isAuthorized], passwordChange);
UserRoutes.patch(
  '/update/update',
  [isAuthorized],
  upload.single('image'),
  updateUser
);
UserRoutes.get('/userByIdLikes', [isAuthorized], getUserByIdLikedAlbums);
UserRoutes.get('/userById', [isAuthorized], getUserById);
UserRoutes.delete('/delete', [isAuthorized], deleteUser);
UserRoutes.patch('/follow/:id', [isAuthorized], toggleFollow);
UserRoutes.patch('/favSong/:id', [isAuthorized], toggleFavSong);
UserRoutes.patch('/favAlbum/:id', [isAuthorized], toggleFavAlbum);
UserRoutes.get('/', [isAuthorized], getBySwitch);
UserRoutes.get('/sort', [isAuthorized], sortSwitch);

//!-------REDIRECTS--------------------------------------------

UserRoutes.post('/register/sendMail/:id', sendCode);
UserRoutes.patch('/sendPassword/:id', sendPassword);

module.exports = UserRoutes;
