const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        type1: {type: String, required: true},
        type2: {type: String},
        image: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const Pokemonseed = mongoose.model("Pokemonseed", PokemonSchema)

module.exports = Pokemonseed;