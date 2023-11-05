const { uploadAlbumPic } = require("../../middleware/files.middleware");
const { createAlbum, albumById, getAll, albumByName, addAndRemoveManySongsById } = require("../controllers/Album.controller");



const AlbumRoutes = require('express').Router();

AlbumRoutes.post("/", uploadAlbumPic.single('image'), createAlbum)
AlbumRoutes.get("/:id", albumById);
AlbumRoutes.get("/", getAll);
AlbumRoutes.get("/getByName/name", albumByName);
AlbumRoutes.patch("/toggleManySongs/:id", addAndRemoveManySongsById)

module.exports = AlbumRoutes;