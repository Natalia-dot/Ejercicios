const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { Pokemon } = require("../model/Pokemon.model");          //! NUM.14 REQUERIMOS EL MODELO PARA PODER METR LOS CONTROLADORES, Y EL DELETE DE CLOUDINARY

//todo------------------------------------------------------------------
//?--------------------------POST---------------------------------------
//todo------------------------------------------------------------------

const create = async(req, res, next) =>{                //! NUM15. CREATE CREA EL NUEVO POKMEON DE LA BASE DE DATOS Y TAMBIEN MANEJA ERRORES
    let catchImage = req.file?.path;                    //ASIGNAMOS UNA VARIABLE A LA URL DE LA IMAGEN A SUBIR SI LA HAY
    try {
        await Pokemon.syncIndexes();                    //ACTUALIZAMOS EL CONTENIDO
        const newPokemon = new Pokemon(req.body);       //Y NEW POKEMON ES EL POKEMON QUE NOS HAN SUBMITTEADO
        if (req.file){                                  //SI EXISTE UN FILE EN LA REQUEST
            newPokemon.image = catchImage;              //SETTEAMOS LA IMAGEN DEL NUEVO POKEMON COMO EL DATO QUE NOS PASARON DE LA REQUEST Y SI NO PONEMOS UN DEFAULT
        }   else newPokemon.image = "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";

        const savedPokemon = await newPokemon.save();    //GUARDAMOS LOS CAMBIOS QUE HEMOS HECHO EN EL NEWPOKEMON

        if (savedPokemon) {                            //CERTIFICAMOS QUE EXISTE
            return res.status(200).json(savedPokemon);  //SI ES VERDAD, DEVUELVE OK Y EL OBJETO SUBMITTEADO
        }   else return res.status(404).json("No se ha podido guardar el pokemon. :(")      //SI NO SE HA PODIDO SUBIR, DA ERROR
    
    //? Si algo de esto nos da un error??????????????, tenemos que gestionarlo aqui y tomar las medidas
    //? necesarias, como borrar la imagen de cloudinary que se sube antes de entrar en el controlador
    //? por el middleware

    } catch (error) {
        req.file?.path && deleteImgCloudinary(catchImage);
        next(error);
        return (
            res.status(404).json({
                message: "Error en la creacion del elemento",
                error: error,}) 
                && next(error)
        );
    };
};




const getByIdMethod = async (req, res, next) => {       //!NUM19.
    try {
      const { id } = req.params;
      const pokemonById = await Pokemon.findById(id);
      if (pokemonById) {
        return res.status(200).json(pokemonById);
      } else {
        return res.status(404).json("No existe ese Pokemon en la base de datos");
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  };


  const getAllMethod = async (req, res, next) => {                //!NUM20.
    try {
      const allPokemon = await Pokemon.find();                      //DEVUELVE ARRAY
      if (allCharacter.length > 0) {
        return res.status(200).json(allPokemon);
      } else {
        return res.status(404).json("No hay pokemon en la base de datos");
      }
    } catch (error) {
      return res.status(404).json({
        error: "Error al buscar - Lanzado en el catch",
        message: error.message,
      });
    }
  };

  const getByPokemonNameMethod = async (req, res, next) => {                         //!NUM21.
    try {
      const { name } = req.params;
      const pokemonByName = await Pokemon.find({ name });
      if (pokemonByName.length > 0) {
        return res.status(200).json(getByPokemonNameMethod);
      } else {
        return res.status(404).json("No se ha encontrado por nombre");
      }
    } catch (error) {
      return res.status(404).json({
        error: "Error al buscar - pgetByPokemonName capturado en el catch",
        message: error.message,
      });
    }
  };

//todo UPDATE Y TESTING!!!

  const deleteCharacter = async (req, res, next) => {           //todo CAMBIAR
    try {
      const { id } = req.params;
      const movie = await Character.findByIdAndDelete(id);
  
      if (movie) {
        const finByIdMovie = await Character.findById(id);
  
        return res.status(finByIdMovie ? 404 : 200).json({
          deleteTest: finByIdMovie ? false : true,
        });
      } else {
        return res.status(404).json("este character no existe");
      }
    } catch (error) {
      return res.status(404).json(error);
    }
}
  
  module.exports = { create, getByPokemonNameMethod, deleteCharacter, getAllMethod }         //EXPORTAMOS Y HACEMOS EL ENRUTADO