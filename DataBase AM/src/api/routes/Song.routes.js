const { isAuthorized, isAdmin } = require('../../middleware/auth.middleware');
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
SongRoutes.patch('/:id', [isAdmin], update);
SongRoutes.delete('/:id', deleteSong);
SongRoutes.patch('/toggleAlbum/:id', [isAuthorized], addAndRemoveAlbumById);
SongRoutes.get('/filter/filter/filter', [isAuthorized], getFilteredSongs);
SongRoutes.get('/sort/sort/sort/sort', [isAuthorized], sortSwitch);

module.exports = SongRoutes;
