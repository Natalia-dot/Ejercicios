const mongoose = require("mongoose");
const PokemonDataSet = require("../../api/models/Pokemon");
const Pokemonseed = require("../../api/models/Pokemon.model");
const dotenv = require ( 'dotenv' );

const MONGO_URI = process.env.MONGO_URI;

const seed = () => {
    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then (async ()=> {
        const allPokemon = await Pokemonseed.find();
        if (allPokemon.length > 0) {
            await Pokemonseed.collection.drop();
            console.log('Database has been emptied')
        }
     }).catch((error) => console.log ('Seeding error.', error.message))
     .then(async ()=> {
        const allPokemonModels = PokemonDataSet.map((pokemon) => new Pokemonseed(pokemon));
        await Pokemonseed.insertMany(allPokemonModels);
        console.log('Seeding successful.');
     })
     .catch((error) => {
        console.log('Seeding unable to finalize', error.message)
    })
    .finally(() => {
        mongoose.disconnect();
    });
};

module.exports = seed;