const {
  createSong,
  getById,
  getAll,
  getBySongName,
  update,
  deleteSong,
  addAndRemoveAlbumById,
  filterByGenres,
} = require('../controllers/Song.controller');

const SongRoutes = require('express').Router();

SongRoutes.post('/', createSong);
SongRoutes.get('/:id', getById);
SongRoutes.get('/', getAll);
SongRoutes.get('/getByName/name', getBySongName);
SongRoutes.patch('/:id', update);
SongRoutes.delete('/:id', deleteSong);
SongRoutes.patch('/toggleAlbum/:id', addAndRemoveAlbumById);
SongRoutes.get('/test/test/test', filterByGenres);

module.exports = SongRoutes;
