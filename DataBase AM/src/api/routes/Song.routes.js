const {
  createSong,
  getById,
  getAll,
  getBySongName,
  update,
  deleteSong,
} = require('../controllers/Song.controller');

const SongRoutes = require('express').Router();

SongRoutes.post('/', createSong);
SongRoutes.get('/:id', getById);
SongRoutes.get('/', getAll);
SongRoutes.get('/getByName/name', getBySongName);
SongRoutes.patch('/:id', update);
SongRoutes.delete('/:id', deleteSong);

module.exports = SongRoutes;
