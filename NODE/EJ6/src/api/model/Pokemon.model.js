const mongoose = require ( "mongoose" );
const Schema = mongoose.Schema              //! NUM13.REQUERIMOS SCHEMA, QUE NOS SIRVE PARA HACER UN TEMPLATE DE LOS OBJETOS QUE VAMOS 

const PokemonSchema = new Schema ({                     //!A SUBIR Y TIENEN QUE SER CUMPLIDOS OBLIGATORIAMENTE
    name: {type: String, required: true, unique:false},
    type1: {type: String, required: true},
    type2: {type: String, required:false},
    image: {type: String, required:false},
    moves: [{ type: mongoose.Schema.Types.ObjectId, ref: "Move" }],
},
{  timestamps:true  });

const Pokemon = mongoose.model("Pokemon", PokemonSchema);       //setteamos que Pokemon va a coger los datos e insertarlos en el template

module.exports = { Pokemon }                            //exportar