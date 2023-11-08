const {
  createSong,
  getById,
  getAll,
  getBySongName,
  update,
  deleteSong,
  addAndRemoveAlbumById,
  getFilteredSongs,
} = require('../controllers/Song.controller');

const SongRoutes = require('express').Router();

SongRoutes.post('/', createSong);
SongRoutes.get('/:id', getById);
SongRoutes.get('/', getAll);
SongRoutes.get('/getByName/name', getBySongName);
SongRoutes.patch('/:id', update);
SongRoutes.delete('/:id', deleteSong);
SongRoutes.patch('/toggleAlbum/:id', addAndRemoveAlbumById);
SongRoutes.get('/filter/filter/filter', getFilteredSongs);

module.exports = SongRoutes;
