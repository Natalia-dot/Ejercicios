const setError = require('../../helpers/setError');
const { enumGenres, enumPace } = require('../../utils/enumDataCheck');
const Album = require('../models/Album.model');
const Song = require('../models/Song.model');

const createSong = async (req, res, next) => {
  try {
    await Song.syncIndexes();
    const newSong = new Song(req.body);
    const savedSong = await newSong.save();

    if (savedSong) {
      return res.status(200).json(savedSong);
    } else
      return res
        .status(404)
        .json('The song was not submitted correctly. Please retry.');
  } catch (error) {
    next(error);
    return (
      res.status(404).json({
        message: 'Error in song creation.',
        error: error,
      }) && next(error)
    );
  }
};

//<!--SEC                                          GET SONG BY ID                                             -->

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const songById = await Song.findById(id);
    if (songById) {
      return res.status(200).json(songById);
    } else {
      return res.status(404).json("That song isn't in the database yet.");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//<!--SEC                                          GET ALL SONGS                                              -->

const getAll = async (req, res) => {
  try {
    const allSongs = await Song.find();
    if (allSongs.length > 0) {
      return res.status(200).json(allSongs);
    } else {
      return res.status(404).json('No songs in the database.');
    }
  } catch (error) {
    return res.status(404).json({
      error: 'Error while searching for all songs',
      message: error.message,
    });
  }
};

//<!--SEC                                      GET BY SONG NAME                                        -->

const getBySongName = async (req, res) => {
  try {
    let { name } = req.body;
    name = name.toLowerCase();

    console.log(name);
    const songByName = await Song.find({ songName: name });
    console.log(songByName);
    if (songByName.length > 0) {
      return res.status(200).json(songByName);
    } else {
      return res
        .status(404)
        .json("That song's name doesn't show up in our database.");
    }
  } catch (error) {
    return res.status(404).json({
      error: 'Error in the search getBySongName catch.',
      message: error.message,
    });
  }
};

//<!--SEC                                  TOGGLE ALBUM IN SONG                                    -->

const addAndRemoveAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const albumId = req.body.id;
    console.log(albumId);
    const songToUpdate = await Song.findById(id);
    if (songToUpdate) {
      console.log('Hay cancion');
      try {
        if (songToUpdate.album.includes(albumId)) {
          try {
            await Song.findByIdAndUpdate(id, {
              $pull: { album: albumId },
            });
            try {
              await Album.findByIdAndUpdate(albumId, {
                $pull: { songs: id },
              });
              return res.status(200).json({
                dataUpdate: await Song.findById(id).populate('album'),
              });
            } catch (error) {
              return res.status(404).json('Error pulling song.');
            }
          } catch (error) {
            return res.status(404).json('Error pulling album.');
          }
        } else {
          try {
            await Song.findByIdAndUpdate(id, {
              $push: { album: albumId },
            });
            try {
              await Album.findByIdAndUpdate(albumId, {
                $push: { songs: id },
              });
              return res.status(200).json({
                dataUpdate: await Song.findById(id).populate('album'),
              });
            } catch (error) {
              return res.status(404).json('Error pushing songs.');
            }
          } catch (error) {
            return res.status(404).json('Error pushing items.');
          }
        }
      } catch (error) {
        return res.status(404).json('Update not finalized.');
      }
    } else {
      console.log('No hay cancion.');
      return res.status(404).json('Song not found.');
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

//<!--SEC                                      UPDATE SONG                                          -->

const update = async (req, res) => {
  await Song.syncIndexes();
  try {
    const { id } = req.params;
    const songById = await Song.findById(id);

    if (songById) {
      const customBody = {
        songName: req.body?.songName ? req.body.songName : songById.songName,
        songLength: req.body?.songLength
          ? req.body.songLength
          : songById.songLength,
        artist: req.body?.artist ? req.body.artist : songById.artist,
      };

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
          : songById.genres;
      }

      if (req.body?.producers) {
        const { producers } = req.body;
        const producersArray = producers
          .toLowerCase()
          .split(',')
          .map((producer) => producer.trim());
        customBody.producers = producersArray;
      }

      if (req.body?.pace) {
        const enumResult = enumPace(req.body.pace);
        customBody.pace = enumResult.check ? req.body.pace : songById.pace;
      }

      try {
        await Song.findByIdAndUpdate(id, customBody);

        const updatedSong = await Song.findById(id);
        const elementUpdate = Object.keys(req.body);
        let test = {};
        elementUpdate.forEach((item) => {
          if (req.body[item] === updatedSong[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });
        // Testeamos genres por separado porque es un array de un enum,
        // entonces lo que hacemos es hacer un forEach sopesando si cada uno
        // de los elementos forma parte del enum, sumando al accumulator si es cierto.
        // Luego miramos si el accumulator ha subido, y en el caso de que sea mayor que 0,
        // es decir, que en alguno de los forEach haya dado false, setteamos a false el resultado
        // del testing de genres.
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
            !updatedSong.genres.includes(genre) && acc++;
            console.log(acc);
          });
          acc > 0
            ? (test = { ...test, genres: false })
            : (test = { ...test, genres: true });
        }
        let isUpdatedIncorrectly = 0;
        for (let key in test) {
          test[key] === false && isUpdatedIncorrectly++;
        }

        if (isUpdatedIncorrectly > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            test: true,
          });
        }
      } catch (error) {
        return setError(404, 'Error updating the song.');
      }
    } else return res.status(404).json('Song not found.');
  } catch (error) {
    setError(404, error.message || 'Error in general catch update song.');
  }
};

//<!--SEC                                         DELETE SONG                                                 -->

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.findByIdAndDelete(id);

    try {
      await Album.updateMany({ songs: id }, { $pull: { songs: id } });

      const findSongById = await Song.findById(id);
      return res.status(findSongById ? 404 : 200).json({
        deleteTest: findSongById ? false : true,
      });
    } catch (error) {
      return res.status(404).json('Error in catch deleting.');
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createSong,
  getById,
  getAll,
  getBySongName,
  addAndRemoveAlbumById,
  update,
  deleteSong,
};
