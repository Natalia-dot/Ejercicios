const mongoose = require('mongoose');
const genres = require('../../helpers/genresArray');

const SongSchema = new mongoose.Schema(
  {
    songName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    album: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
    songLength: {
      type: Number,
      required: false,
      unique: false,
    },
    genres: [
      {
        type: String,
        lowercase: true,
        enum: genres,
      },
    ],
    pace: {
      type: String,
      lowercase: true,
      enum: ['quick', 'medium', 'slow'],
    },
    year: { type: Number, required: true },
    producers: [{ type: String, lowercase: true }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    artist: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;
