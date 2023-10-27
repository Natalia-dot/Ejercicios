const { Move } = require("../model/Move.model");
const { Pokemon } = require("../model/Pokemon.model");

const createMove = async (req, res, next) => {              //!NUM24. CONTROLADOR DE CREACION DE MOVIMIENTO
    try {
        await Move.syncIndexes();
        const newMove = new Move(req.body);
        const savedMove = await newMove.save();
        return res
        .status(savedMove ? 200 : 404)
        .json( savedMove ? savedMove : "No se pudo crear el Movimiento")
    } catch (error) {
        return  (
            res.status(404).json({error: "Catch createMovie", message: error.message }) && next(error)
        );
    }
};

getMoveByType = async (req,res,next) => {                    //!NUM25. GET BY TYPE
    try {
        const { type } = req.params;
        const moveTypeList = await Move.find({type});
        console.log(moveTypeList)
        if (moveTypeList.length > 0) {
            return res.status(200).json(moveTypeList);
        }   return res.status(404).json("No se ha encontrado nada")
    } catch (error) {
        return (
            res.status(404).json({error: "Catch getMoveByType", message: error.message }) && next(error)
        );
        
    }
};

const addAndRemovePokemon = async (req,res,next) =>{             //!NUM26. CONTROLADOR DE TOGGLE DE DATOS RELACIONALES
    try {
        const { id } = req.params;                         //El id de la request
        const { pokemon } = req.body;                       //Los id de los Pokemon a anadir

        const moveById = await Move.findById(id);               //encontrar el id del movimiento del param
        if (moveById) {                                            //si existe
            const requestPokemonInArray = pokemon.split(",");    //character hay que separarlo con comas para formar un array

            Promise.all(
                requestPokemonInArray.map(async (singlePokemon, index) => {
                    if (moveById.pokemon.includes(singlePokemon)){
                        try {  
                            await Move.findByIdAndUpdate(id, {
                            $pull: {pokemon: singlePokemon}
                        });
                        try {
                            await Pokemon.findByIdAndUpdate(singlePokemon, {
                                $pull: {moves : id}
                            })
                        } catch (error) {
                            return res.status(404).json({error: error.message, update:"Error pulling moves"}) && next(error)
                        }
                    } catch (error) {
                        return res.status(404).json({error: error.message, update:"Error pulling pokemon"}) && next(error)
                    }
                 } else { //aqui el meterlo
                    try {  
                        await Move.findByIdAndUpdate(id, {
                        $push: {pokemon: singlePokemon}
                    });
                    try {
                        await Pokemon.findByIdAndUpdate(singlePokemon, {
                            $push: {moves : id}
                        })
                    } catch (error) {
                        return res.status(404).json({error: error.message, update:"Error pulling moves"}) && next(error)
                    }
                } catch (error) {
                    return res.status(404).json({error: error.message, update:"Error pulling pokemon"}) && next(error)
                }


                 }
                })
            ).then(async ()=> {
                res.status(200).json({updatedObject: await Move.findById(id)})
            })



        } else {
            return res.status(404).json("El movimiento no se ha encontrado")
        }
    } catch (error) {
        return (res.status(404)
        .json({error:error.message, message: "Error in the Controller Catch"}) && next (error));
    }
}


const deleteMove = async(req,res,next) =>{
    try {
        const { id } = req.params
        Move.findByIdAndDelete(id)
    } catch (error) {
        return res.status(404).json({error: error.message, message: "catch Delete Move"})
    }
}

module.exports = { createMove, getMoveByType, addAndRemovePokemon }