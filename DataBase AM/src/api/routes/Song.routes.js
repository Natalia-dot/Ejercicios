const {
  createSong,
  getById,
  getAll,
  getBySongName,
} = require('../controllers/Song.controller');

const SongRoutes = require('express').Router();

SongRoutes.post('/', createSong);
SongRoutes.get('/:id', getById);
SongRoutes.get('/', getAll);
SongRoutes.get('/getByName/name', getBySongName);

module.exports = SongRoutes;
