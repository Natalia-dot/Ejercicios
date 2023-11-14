const mongoose = require('mongoose');
const genres = require('../../helpers/genresArray');

const ArtistSchema = new mongoose.Schema({
  artistName: {
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
  formationYear: { type: Number, trim: true, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
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

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
