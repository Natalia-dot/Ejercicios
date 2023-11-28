const { isAuthorized, isAdmin } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {
  createAlbum,
  albumById,
  getAll,
  albumByName,
  addAndRemoveManySongsById,
  update,
  deleteAlbum,
  getFilteredAlbums,
  sortSwitch,
} = require('../controllers/Album.controller');

const AlbumRoutes = require('express').Router();

AlbumRoutes.post('/', [isAuthorized], upload.single('image'), createAlbum);
AlbumRoutes.get('/:id', [isAuthorized], albumById);
AlbumRoutes.get('/', getAll);
AlbumRoutes.get('/getByName/name', albumByName);
AlbumRoutes.patch(
  '/toggleManySongs/:id',
  [isAuthorized],
  addAndRemoveManySongsById
);
AlbumRoutes.patch('/:id', [isAuthorized], upload.single('image'), update);
AlbumRoutes.delete('/:id', [isAdmin], deleteAlbum);
AlbumRoutes.get('/filter/filter/filter', [isAuthorized], getFilteredAlbums);
AlbumRoutes.get('/sort/sort/sort/sort', [isAuthorized], sortSwitch);

module.exports = AlbumRoutes;
