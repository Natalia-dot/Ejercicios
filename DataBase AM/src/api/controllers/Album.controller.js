const setError = require('../../helpers/setError');
const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const { enumGenres } = require('../../utils/enumDataCheck');
const Album = require('../models/Album.model');
const Song = require('../models/Song.model');

//<!--SEC                                      CREATE ALBUM                                        -->

const createAlbum = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    await Album.syncIndexes();
    const doesAlbumExist = Album.find({ albumName: req.body.albumName });
    if (!doesAlbumExist) {
      const newAlbum = new Album(req.body);
      if (req.file) {
        newAlbum.image = catchImage;
      } else {
        newAlbum.image =
          'https://www.thecurrent.org/images/default-album-art.png';
      }
      if (req.body?.producers) {
        const { producers } = req.body;
        const producersArray = producers
          .split(',')
          .map((producer) => producer.toLowerCase().trim());
        newAlbum.producers = producersArray;
      }
      if (req.body?.genres) {
        const { genres } = req.body;
        const requestGenres = genres.split(',');
        const requestGenresInArray = [];
        requestGenres.forEach((genre) => {
          genre = genre.toLowerCase().trim();
          requestGenresInArray.push(genre);
        });
        const enumResult = enumGenres(requestGenresInArray);
        console.log(enumResult, 'Enum result');
        newAlbum.genres = enumResult.check ? requestGenresInArray : [];
      }

      const savedAlbum = await newAlbum.save();

      if (savedAlbum) {
        return res.status(200).json(savedAlbum);
      } else return res.status(404).json('Album was not saved. Please retry.');
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinary(catchImage);
    next(error);
    return (
      res.status(404).json({
        message: 'Error in album creation.',
        error: error,
      }) && next(error)
    );
  }
};

//<!--SEC                                      ALBUM BY ID                                        -->

const albumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const albumById = await Album.findById(id);
    if (albumById) {
      return res.status(200).json(albumById);
    } else {
      return res.status(404).json("That Album isn't in the database yet.");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//<!--SEC                                      GET ALL ALBUMS                                        -->

const getAll = async (req, res, next) => {
  try {
    const allAlbums = await Album.find();
    if (allAlbums.length > 0) {
      return res.status(200).json(allAlbums);
    } else {
      return res.status(404).json('No Albums in the database.');
    }
  } catch (error) {
    return res.status(404).json({
      error: 'Error while searching for all Albums.',
      message: error.message,
    });
  }
};

//<!--SEC                                      GET ALBUM BY NAME                                        -->

const albumByName = async (req, res, next) => {
  try {
    let { name } = req.body;
    name = name.toLowerCase();

    const albumByName = await Album.find({ albumName: name });
    if (albumByName.length > 0) {
      return res.status(200).json(albumByName);
    } else {
      return res
        .status(404)
        .json("That Album's name doesn't show up in our database.");
    }
  } catch (error) {
    return res.status(404).json({
      error: 'Error in the get by name Album catch.',
      message: error.message,
    });
  }
};

//<!--SEC                                      ADD AND REMOVE SONGS                                        -->

const addAndRemoveManySongsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { songs } = req.body;

    const albumById = await Album.findById(id);
    if (albumById) {
      const requestSongsInArray1 = songs.split(',');
      const requestSongsInArray = [];
      requestSongsInArray1.forEach((song) => {
        song = song.toLowerCase().trim();
        requestSongsInArray.push(song);
      });

      Promise.all(
        requestSongsInArray.map(async (singleSong) => {
          if (albumById.songs.includes(singleSong)) {
            try {
              await Album.findByIdAndUpdate(id, {
                $pull: { songs: singleSong },
              });
              try {
                await Song.findByIdAndUpdate(singleSong, {
                  $pull: { album: id },
                });
              } catch (error) {
                return (
                  res.status(404).json({
                    error: error.message,
                    update: 'Error pulling album',
                  }) && next(error)
                );
              }
            } catch (error) {
              return (
                res.status(404).json({
                  error: error.message,
                  update: 'Error pulling songs',
                }) && next(error)
              );
            }
          } else {
            try {
              await Album.findByIdAndUpdate(id, {
                $push: { songs: singleSong },
              });
              try {
                await Song.findByIdAndUpdate(singleSong, {
                  $push: { album: id },
                });
              } catch (error) {
                return (
                  res.status(404).json({
                    error: error.message,
                    update: 'Error pushing album',
                  }) && next(error)
                );
              }
            } catch (error) {
              return (
                res.status(404).json({
                  error: error.message,
                  update: 'Error pushing songs',
                }) && next(error)
              );
            }
          }
        })
      ).then(async () => {
        return res.status(200).json({
          dataUpdate: await Album.findById(id).populate('songs'),
        });
      });
    } else {
      return res.status(404).json('El album no se ha encontrado');
    }
  } catch (error) {
    return (
      res.status(404).json({
        error: error.message,
        message: 'Error in the Controller Catch',
      }) && next(error)
    );
  }
};

//<!--SEC                                      UPDATE ALBUM                                        -->

const update = async (req, res, next) => {
  await Album.syncIndexes();
  let catchImg = req.file?.path;
  try {
    const { id } = req.params;
    const albumById = await Album.findById(id);
    if (albumById) {
      const oldImg = albumById.image;

      const customBody = {
        _id: albumById._id,
        image: req.file?.path ? catchImg : oldImg,
        albumName: req.body?.albumName
          ? req.body?.albumName
          : albumById.albumName,
        albumLength: req.body?.albumLength
          ? req.body?.albumLength
          : albumById.albumLength,
        artist: req.body?.artist ? req.body?.artist : albumById.artist,
        year: req.body?.year ? req.body?.year : albumById.year,
      };

      if (req.body?.producers) {
        const { producers } = req.body;
        const producersArray = producers
          .split(',')
          .map((producer) => producer.toLowerCase().trim());
        customBody.producers = producersArray;
      }
      console.log(
        customBody,
        '1.Esto es despues de verificar si hay producers'
      );

      if (req.body?.genres) {
        const { genres } = req.body;
        console.log(genres);
        const requestGenres = genres.split(',');
        const requestGenresInArray = [];
        requestGenres.forEach((genre) => {
          genre = genre.toLowerCase().trim();
          requestGenresInArray.push(genre);
        });
        console.log(requestGenresInArray, 'Final del forEach');
        const enumResult = enumGenres(requestGenresInArray);
        console.log(enumResult, 'Enum result');
        customBody.genres = enumResult.check
          ? requestGenresInArray
          : albumById.genres;
      }

      console.log(customBody, '2.Esto es despues de verificar si hay genres');

      try {
        await Album.findByIdAndUpdate(id, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        const albumByIdUpdate = await Album.findById(id);
        const elementUpdate = Object.keys(req.body);

        let test = {};

        elementUpdate.forEach((item) => {
          if (req.body[item] === albumByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        console.log(test, '1.Aqui antes de testear genres.');
        if (req.body.genres) {
          const { genres } = req.body;
          const requestGenres = genres.split(',');
          const requestGenresInArray = [];
          let acc = 0;
          requestGenres.forEach((genre) => {
            genre = genre.toLowerCase().trim();
            requestGenresInArray.push(genre);
          }); //aqui console.log de requestGenresInArray va bien
          requestGenresInArray.forEach((genre) => {
            console.log(genre);
            !albumByIdUpdate.genres.includes(genre) && acc++;
            console.log(acc);
          });
          acc > 0
            ? (test = { ...test, genres: false })
            : (test = { ...test, genres: true });
        }

        if (catchImg) {
          const isCatchImage = albumByIdUpdate.image === catchImg;
          test = { ...test, file: isCatchImage };
        }
        console.log(test, '2.Aqui despues de testear todo.');

        let acc = 0;
        for (let key in test) {
          test[key] === false && acc++;
        }
        console.log(acc);
        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {
        return setError(404, 'Error updating the Album.');
      }
    } else {
      return res.status(404).json('That Album does not exist');
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

//<!--SEC                                      DELETE ALBUM                                        -->

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findByIdAndDelete(id);
    deleteImgCloudinary(album.image);

    try {
      await Song.updateMany({ album: id }, { $pull: { album: id } });

      const findAlbumById = await Album.findById(id);
      return res.status(findAlbumById ? 404 : 200).json({
        deleteTest: findAlbumById ? false : true,
      });
    } catch (error) {
      return res.status(404).json('Error in catch deleting.');
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createAlbum,
  albumById,
  albumByName,
  getAll,
  addAndRemoveManySongsById,
  update,
  deleteAlbum,
};
