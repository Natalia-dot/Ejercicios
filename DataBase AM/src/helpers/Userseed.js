const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../api/models/User.model');
const userDataSet = require('./datasets/Userdataset');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const seed3 = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const allUsers = await User.find();
      if (allUsers.length > 0) {
        await User.collection.drop();
        console.log('Database has been emptied');
      }
    })
    .catch((error) => console.log('Seeding error.', error.message))
    .then(async () => {
      const allUsersModel = userDataSet.map((user) => new User(user));
      await User.insertMany(allUsersModel);
      console.log('Seeding successful.');
    })
    .catch((error) => {
      console.log('Seeding unable to finalize', error.message);
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

module.exports = seed3;
