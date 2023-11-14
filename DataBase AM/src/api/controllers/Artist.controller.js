const Artist = require("../models/Artist.model");



const createArtist = async (req, res, next) => {
  try {
    await Artist.syncIndexes();
    const newArtist = new Artist(req.body);
    if (req.body?.producers) {
      const { producers } = req.body;
      const producersArray = producers
        .split(',')
        .map((producer) => producer.toLowerCase().trim());
      newArtist.producers = producersArray;
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
      newArtist.genres = enumResult.check ? requestGenresInArray : [];
    }
    if (req.body?.pace) {
      const enumResult = enumPace(req.body.pace);
      newArtist.pace = enumResult.check && req.body.pace;
    }

    const savedArtist = await newArtist.save();

    if (savedArtist) {
      return res.status(200).json(savedArtist);
    } else
      return res
        .status(404)
        .json('The Artist was not submitted correctly. Please retry.');
  } catch (error) {
    next(error);
    return (
      res.status(404).json({
        message: 'Error in Artist creation.',
        error: error,
      }) && next(error)
    );
  }
};
