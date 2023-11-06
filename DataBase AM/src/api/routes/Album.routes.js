const { upload } = require('../../middleware/files.middleware');
const {
  createAlbum,
  albumById,
  getAll,
  albumByName,
  addAndRemoveManySongsById,
  update,
  deleteAlbum,
} = require('../controllers/Album.controller');

const AlbumRoutes = require('express').Router();

AlbumRoutes.post('/', upload.single('image'), createAlbum);
AlbumRoutes.get('/:id', albumById);
AlbumRoutes.get('/', getAll);
AlbumRoutes.get('/getByName/name', albumByName);
AlbumRoutes.patch('/toggleManySongs/:id', addAndRemoveManySongsById);
AlbumRoutes.patch('/:id', upload.single('image'), update);
AlbumRoutes.delete('/:id', deleteAlbum);

module.exports = AlbumRoutes;
