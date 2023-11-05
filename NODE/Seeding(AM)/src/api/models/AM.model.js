const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
    {
        songName:{
            type:String, 
            required:true, 
            unique:true, 
            trim: true},
        album:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
        songLength:{
            type: Number,
            required: true,
            unique: false,
        }, 
        genres: [{
            type:String,
            enum: ['indie rock', 'post-punk revival', 'garage rock','alternative rock', 'psychedelic rock', 'pop rock', 'experimental']}],
        pace:{
            type:String,
            enum: ['quick', 'medium', 'slow']
        },
        producers: [{type:String}],
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
);

const Song = mongoose.model("Song", SongSchema)

module.exports = Song;