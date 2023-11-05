const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Album = require('../api/models/Album.model');
const AlbumDataSet = require('./datasets/Albumdataset');


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const seed2 = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const allAlbums = await Album.find();
      if (allAlbums.length > 0) {
        await Album.collection.drop();
        console.log('Database has been emptied');
      }
    })
    .catch((error) => console.log('Seeding error.', error.message))
    .then(async () => {
      const allAlbumsData = AlbumDataSet.map((album) => new Album(album));
      await Album.insertMany(allAlbumsData);
      console.log('Seeding successful.');
    })
    .catch((error) => {
      console.log('Seeding unable to finalize', error.message);
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

module.exports = seed2;
