const setError = require('../../helpers/setError');
const convertToSeconds = require('../../utils/convertToSeconds');
const { enumGenres, enumPace } = require('../../utils/enumDataCheck');
const { filterSongs } = require('../../utils/userFilter');
const Album = require('../models/Album.model');
const Song = require('../models/Song.model');
const User = require('../models/User.model');

const createSong = async (req, res, next) => {
  try {
    await Song.syncIndexes();
    const newSong = new Song(req.body);
    if (req.body?.producers) {
      const { producers } = req.body;
      const producersArray = producers
        .split(',')
        .map((producer) => producer.toLowerCase().trim());
      newSong.producers = producersArray;
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
      newSong.genres = enumResult.check ? requestGenresInArray : [];
    }
    if (req.body?.pace) {
      const enumResult = enumPace(req.body.pace);
      newSong.pace = enumResult.check && req.body.pace;
    }

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
    console.log(req.body);
    console.log(req.body.songName);
    let { songName } = req.body;
    songName = songName.toLowerCase();

    console.log(songName);
    const songByName = await Song.find({ songName: songName });
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
        _id: songById._id,
        album: songById.album,
        songName: req.body?.songName ? req.body.songName : songById.songName,
        songLength: req.body?.songLength
          ? req.body.songLength
          : songById.songLength,
        artist: req.body?.artist ? req.body.artist : songById.artist,
        year: req.body?.year ? req.body.year : songById.year,
        likedBy: songById.album,
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
      try {
        await Album.updateMany({ songs: id }, { $pull: { songs: id } });
        try {
          await User.updateMany({ favSongs: id }, { $pull: { favSongs: id } });
        } catch (error) {
          return res.status(404).json('Error pulling albums.');
        }
      } catch (error) {
        return res.status(404).json('Error pulling songs');
      }
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

//<!--SEC                             FILTER SONGS                                                              -->
const getFilteredSongs = async (req, res) => {
  const request = req.body;
  let switchClauseToFilter = filterSongs(request);
  console.log(switchClauseToFilter);
  switch (switchClauseToFilter) {
    case 'songName': {
      //WORKS correctly
      try {
        let { songName } = req.body;
        songName = songName.toLowerCase();
        console.log(songName);
        const songByName = await Song.find({ songName });
        console.log(songByName);
        if (songByName.length > 0) {
          return res.status(200).json(songByName);
        } else {
          return res
            .status(404)
            .json("That song doesn't show up in our database.");
        }
      } catch (error) {
        return res.status(404).json({
          error: 'Error in the search getByname catch.',
          message: error.message,
        });
      }
    }
    case 'genres':
      //WORKS correctly
      try {
        const { genres } = req.body;
        console.log(genres);
        const requestGenres = genres.split(',');
        const requestGenresInArray = [];
        requestGenres.forEach((genre) => {
          genre = genre.toLowerCase().trim();
          requestGenresInArray.push(genre);
        });
        console.log(requestGenresInArray);

        try {
          const songResults = await Song.find({
            genres: { $in: requestGenresInArray },
          });
          if (songResults.length > 0) {
            return res.status(200).json(songResults);
          } else {
            return res
              .status(404)
              .json("Couldn't find any song with those genres.");
          }
        } catch (error) {
          return res.status(404).json('Error finding songs catch.');
        }
      } catch (error) {
        return res.status(404).json('Error in albums Switch clause.');
      }
    case 'singleGenre': //WORKS correctly
      try {
        let genres = req.body?.singleGenre;
        if (!genres.includes(',')) {
          genres = genres.trim().toLowerCase();
          try {
            const songsBySingleGenre = await Song.find({
              $and: [{ genres: { $in: genres } }, { genres: { $size: 1 } }], //todo I could set the 1 to a variable and if there are mre than one genres, set it to be specific to that
              /*  --EX el AND admite un array de condiciones por las que tiene que buscar en la base de datos. 
                  --EX en cada objeto le pongo la condicion deseada. En este caso, $IN lo que hace es buscar que objetos
                  --EX cumplen con que genres incluya el objeto del array que tenemos, y si tuvieramos varios, devuelve todos los
                  --EX que cumplen cualquiera de las dos condiciones. $SIZE determina la longitud del array de genres, por lo que te devuelve
                  --EX todas las canciones que tengan solo un genero-->*/
            });
            return res.status(200).json(songsBySingleGenre);
          } catch (error) {
            return res.status(404).json(error.message);
          }
        } else return res.status(404).json('Please input only one genre.');
      } catch (error) {
        return res.status(404).json('Error in albums Switch clause.');
      }
    case 'producers':
      try {
        const { producers } = req.body;
        console.log(producers);
        const requestProducers = producers.split(',');
        const requestProducersInArray = [];
        requestProducers.forEach((producer) => {
          producer = producer.toLowerCase().trim();
          requestProducersInArray.push(producer);
        });
        console.log(requestProducersInArray);

        try {
          const songResults = await Song.find({
            producers: { $in: requestProducersInArray },
          });
          if (songResults.length > 0) {
            return res.status(200).json(songResults);
          } else {
            return res
              .status(404)
              .json("Couldn't find any song produced by them.");
          }
        } catch (error) {
          return res.status(404).json('Error finding albums catch.');
        }
      } catch (error) {
        return res.status(404).json('Error in albums Switch clause.');
      }
    case 'album': //WORKS correctly
      try {
        let { album } = req.body;
        console.log(album);
        if (album.length > 0) {
          album = album.toLowerCase().trim();
          try {
            console.log('Entro en el try', album);
            const requestedAlbum = await Album.findOne({ albumName: album }); //me daba error por usar el FIND porque me devuelve un array!!!W2wqwedqw
            let albumId = requestedAlbum.id;
            console.log(albumId);
            const songsByAlbum = await Song.find({
              album: { $in: albumId },
            });
            return res.status(200).json(songsByAlbum);
          } catch (error) {
            return res.status(404).json(error.message);
          }
        } else return res.status(404).json('No entra en el if');
      } catch (error) {
        return res.status(404).json('Error in albums Switch clause.');
      }
    case 'year':
      //WORKS correctly
      try {
        let { year } = req.body;
        year = year.trim();
        console.log(year);
        try {
          const songResults = await Song.find({ year });
          if (songResults.length > 0) {
            return res.status(200).json(songResults);
          } else {
            return res
              .status(404)
              .json("Couldn't find any song from that year.");
          }
        } catch (error) {
          return res.status(404).json('Error finding songs catch.');
        }
      } catch (error) {
        return res.status(404).json('Error in year Switch clause.');
      }
    case 'length':
      try {
        let { length } = req.body;
        let range;
        let filter = 1;
        if (req.body?.range) {
          range = req.body.range;
          range = parseInt(range);
          console.log(range);
        } else {
          range = 10;
        }
        if (req.body?.filter) {
          filter = req.body.filter === 'des' ? -1 : 1; //I could set a switch but in pos of a selector that only lets you have two values, i wont
        }
        let baseLength = convertToSeconds(length);
        let maxLength = baseLength + range;
        let minLength = baseLength - range;
        console.log(minLength, baseLength, maxLength);
        try {
          const songResults = await Song.find({
            $and: [
              { songLength: { $gte: minLength } },
              { songLength: { $lte: maxLength } },
            ],
          }).sort({ songLength: filter });
          if (songResults.length > 0) {
            return res.status(200).json(songResults);
          } else {
            return res
              .status(404)
              .json("Couldn't find any song with that length.");
          }
        } catch (error) {
          return res.status(404).json('Error finding songs catch.');
        }
      } catch (error) {
        return res.status(404).json('Error in length Switch clause.');
      }
    case 'pace':
      //WORKS correctly
      try {
        let { pace } = req.body;
        pace = pace.toLowerCase().trim();
        console.log(pace);
        if (enumPace(pace).check === true) {
          try {
            const songResults = await Song.find({
              pace: pace,
            });
            if (songResults.length > 0) {
              return res.status(200).json(songResults);
            } else {
              return res
                .status(404)
                .json("Couldn't find any song with that pace.");
            }
          } catch (error) {
            return res.status(404).json('Error finding songs catch.');
          }
        }
      } catch (error) {
        return res.status(404).json('Error in albums Switch clause.');
      }
      break;
    default:
      return res.status(404).json('Please input a valid filter.');
  }
};

//<!--                                        FILTER BY GENRES  (DEPRECATED)                                            -->

// const filterByGenres = async (req, res, next) => {
//   const { genres } = req.body;
//   console.log(genres);
//   const requestGenres = genres.split(',');
//   const requestGenresInArray = [];
//   requestGenres.forEach((genre) => {
//     genre = genre.toLowerCase().trim();
//     requestGenresInArray.push(genre);
//   });
//   console.log(requestGenresInArray);

//   try {
//     const songResults = await Song.find({
//       genres: { $in: requestGenresInArray },
//     });
//     if (songResults.length > 0) {
//       return res.status(200).json(songResults);
//     } else {
//       return res.status(404).json("Couldn't find any song with those genres.");
//     }
//   } catch (error) {
//     return res.status(404).json('Error finding songs catch.');
//   }
// };

//<!--SEC                                              SORT                                                     -->
const sortSwitch = async (req, res) => {
  //lo meto todo en un try catch?
  const requestSort = req.body?.sort;
  //let switchResponse = sortSongs(requestSort);
  switch (requestSort) {
    case 'likes': //WORKS correctly
      try {
        console.log('hola');
        const allSongs = await Song.find();
        if (allSongs.length > 0) {
          let order = req.body?.order == 'asc' ? 1 : -1;
          console.log(order);
          order === 1
            ? allSongs.sort((a, b) => a.likedBy.length - b.likedBy.length)
            : allSongs.sort((a, b) => b.likedBy.length - a.likedBy.length);
          return res.status(200).json(allSongs);
        } else return res.status(404).json('No songs found.');
      } catch (error) {
        return res.status(404).json('Error in likes switch');
      }
    case 'likesInAlbum': //WORKS correctly
      try {
        let { order, albumName } = req.body;
        order = req.body?.order == 'asc' ? 1 : -1;
        albumName = albumName.toLowerCase().trim();
        try {
          const albumByName = await Album.findOne({ albumName });
          let albumId = albumByName._id;
          console.log(albumName, 'Albumname');
          console.log(albumId, 'AlbumId');
          try {
            const allSongs = await Song.find({ album: { $in: albumId } });
            console.log(allSongs);
            if (allSongs.length > 0) {
              order === 1
                ? allSongs.sort((a, b) => a.likedBy.length - b.likedBy.length)
                : allSongs.sort((a, b) => b.likedBy.length - a.likedBy.length);
              return res.status(200).json(allSongs);
            } else return res.status(404).json('No songs to show.');
          } catch (error) {
            return res.status(404).json('Error finding the songs.');
          }
        } catch (error) {
          return res.status(404).json('Error finding the album.');
        }
      } catch (error) {
        return res.status(404).json('Error in likesInAlbum switch');
      }
    case 'length': //WORKS correctly
      try {
        let { order } = req.body;
        const allSongs = await Song.find();
        console.log(allSongs);
        if (allSongs.length > 0) {
          order === 'asc'
            ? allSongs.sort((a, b) => a.songLength - b.songLength)
            : allSongs.sort((a, b) => b.songLength - a.songLength);
          return res.status(200).json(allSongs);
        } else return res.status(404).json('No songs to show.');
      } catch (error) {
        return res.status(404).json('Error in length switch');
      }
    //todo sort de mas likeadas por genero
    default:
      return res.status(404).json('Default switch.');
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
  getFilteredSongs,
  sortSwitch,
};
