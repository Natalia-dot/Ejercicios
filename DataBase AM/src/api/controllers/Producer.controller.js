const { enumGenres, enumPace } = require('../../utils/enumDataCheck');
const Producer = require('../models/Producer.model');

const createProducer = async (req, res, next) => {
  try {
    await Producer.syncIndexes();
    const newProducer = new Producer(req.body);
    if (req.body?.producers) {
      const { producers } = req.body;
      const producersArray = producers
        .split(',')
        .map((producer) => producer.toLowerCase().trim());
      newProducer.producers = producersArray;
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
      newProducer.genres = enumResult.check ? requestGenresInArray : [];
    }
    if (req.body?.pace) {
      const enumResult = enumPace(req.body.pace);
      newProducer.pace = enumResult.check && req.body.pace;
    }

    const savedProducer = await newProducer.save();

    if (savedProducer) {
      return res.status(200).json(savedProducer);
    } else
      return res
        .status(404)
        .json('The Producer was not submitted correctly. Please retry.');
  } catch (error) {
    next(error);
    return (
      res.status(404).json({
        message: 'Error in Producer creation.',
        error: error,
      }) && next(error)
    );
  }
};

module.exports = { createProducer };
