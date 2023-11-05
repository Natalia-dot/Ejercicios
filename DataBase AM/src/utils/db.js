const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(
      `You are connected to the hosting database ${host} named ${name}`
    );
  } catch (error) {
    console.log("Couldn't connect to database");
  }
};

module.exports = { connect };
