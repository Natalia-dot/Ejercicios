const mongoose = require ("mongoose");

const MoveSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},     //! NUM23 CREAMOS EL MODELO DE DATOS DE NUESTRO PARAMETRO RELACIONAL
    type: {type: String, required: true},
    pokemon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" }],     //referencia a las queries de Pokemon
}  ,  {
    timestamps: true,
});

const Move = mongoose.model("Move", MoveSchema)

module.exports = { Move }