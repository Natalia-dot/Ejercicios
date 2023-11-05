const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('../api/models/Song.model');
const SongDataSet = require('./datasets/Songdataset');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const seed = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const allSongs = await Song.find();
      if (allSongs.length > 0) {
        await Song.collection.drop();
        console.log('Database has been emptied');
      }
    })
    .catch((error) => console.log('Seeding error.', error.message))
    .then(async () => {
      const allAMSongsModel = SongDataSet.map((song) => new Song(song));
      await Song.insertMany(allAMSongsModel);
      console.log('Seeding successful.');
    })
    .catch((error) => {
      console.log('Seeding unable to finalize', error.message);
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

module.exports = seed;
