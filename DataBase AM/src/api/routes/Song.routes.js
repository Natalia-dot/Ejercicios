const { isAuthorized } = require('../../middleware/auth.middleware');
const {
  createSong,
  getById,
  getAll,
  getBySongName,
  update,
  deleteSong,
  addAndRemoveAlbumById,
  getFilteredSongs,
  sortSwitch,
} = require('../controllers/Song.controller');

const SongRoutes = require('express').Router();

SongRoutes.post('/', [isAuthorized], createSong);
SongRoutes.get('/:id', getById);
SongRoutes.get('/', getAll);
SongRoutes.get('/getByName/name', getBySongName);
SongRoutes.patch('/:id', update);
SongRoutes.delete('/:id', deleteSong);
SongRoutes.patch('/toggleAlbum/:id', addAndRemoveAlbumById);
SongRoutes.get('/filter/filter/filter', getFilteredSongs);
SongRoutes.get('/sort/sort/sort/sort', sortSwitch);

module.exports = SongRoutes;
