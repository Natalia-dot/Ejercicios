const mongoose = require('mongoose');
const genres = require('../../helpers/genresArray');

const AlbumSchema = new mongoose.Schema(
  {
    albumName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    albumLength: {
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
    producers: [{ type: String, lowercase: true }],
    year: { type: Number, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String },
    artist: { type: String, required: true, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
