const mongoose = require('mongoose');
const genres = require('../../helpers/genresArray');

const ProducerSchema = new mongoose.Schema({
  producerName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  country: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Songs' }],
  workedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
  awardCount: { type: Number },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  genres: [
    {
      type: String,
      lowercase: true,
      enum: genres,
    },
  ],
});

const Producer = mongoose.model('Producer', ProducerSchema);

module.exports = Producer;
