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

const getById = async (req, res, next) => {
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

const getAll = async (req, res, next) => {
  try {
    const allSongs = await Song.find();
    if (allSongs.length > 0) {
      return res.status(200).json(allSongs);
    } else {
      return res.status(404).json('No songs in the database.');
    }
  } catch (error) {
    return res.status(404).json({
      error: 'Error while searching for all songs.',
      message: error.message,
    });
  }
};

const getBySongName = async (req, res, next) => {
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

module.exports = { createSong, getById, getAll, getBySongName };
