const { upload } = require('../../middleware/files.middleware');
const { userRegistration } = require('../controllers/User.controller');

const UserRoutes = require('express').Router();

UserRoutes.post('/register', upload.single('image'), userRegistration);

module.exports = UserRoutes;
