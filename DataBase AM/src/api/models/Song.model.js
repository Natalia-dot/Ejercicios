const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
    {
        songName:{
            type:String, 
            required:true, 
            unique:true, 
            trim: true,
            lowercase: true,},
        album:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
        songLength:{
            type: Number,
            required: false,
            unique: false,
        }, 
        genres: [{
            type:String,
            lowercase: true,
            enum: ['indie rock', 'post-punk revival', 'garage rock','alternative rock', 'psychedelic rock', 'pop rock', 'experimental']}],
        pace:{
            type:String,
            lowercase: true,
            enum: ['quick', 'medium', 'slow']
        },
        producers: [{type:String, lowercase: true,}],
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
);

const Song = mongoose.model("Song", SongSchema)

module.exports = Song;