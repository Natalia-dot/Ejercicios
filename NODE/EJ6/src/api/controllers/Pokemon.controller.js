const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { Move } = require("../model/Move.model");
const { Pokemon } = require("../model/Pokemon.model");          //! NUM14. REQUERIMOS EL MODELO PARA PODER METR LOS CONTROLADORES, Y EL DELETE DE CLOUDINARY

//todo------------------------------------------------------------------
//?--------------------------POST---------------------------------------
//todo------------------------------------------------------------------

const create = async(req, res, next) =>{                //! NUM15. CREATE CREA EL NUEVO POKMEON DE LA BASE DE DATOS Y TAMBIEN MANEJA ERRORES
    let catchImage = req.file?.path;       
    console.log(catchImage)             //ASIGNAMOS UNA VARIABLE A LA URL DE LA IMAGEN A SUBIR SI LA HAY
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
      const { id } = req.params;                    //destructuring de endpoint de id
      const pokemonById = await Pokemon.findById(id);          //encontrar porid metodo                                  
      if (pokemonById) {                          //si existe ejecutarlo todo correctamente y establecerlo en json
        return res.status(200).json(pokemonById);
      } else {
        return res.status(404).json("No existe ese Pokemon en la base de datos"); //si no lo encuentra, error
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  };


  const getAllMethod = async (req, res, next) => {                //!NUM20.
    try {
      const allPokemon = await Pokemon.find();                      //DEVUELVE ARRAY  //Encontramos todos los objetos con el model pokemon
      if (allPokemon.length > 0) {                                      //.find siempre da un array, asi que si es mayor que uno, es que lo ha encontrado
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
    try {                                                                //vamos a encontrar los pokemons por nombre propio
      const { name } = req.params;                                  //destructuring del request params que es el nombre de la url
      const pokemonByName = await Pokemon.find({ name });       //Encontramos el OBJETO que tenga el parametro name como name de la req
      if (pokemonByName.length > 0) {                   //.find siempre da un array, asi que si es mayor que uno, es que lo ha encontrado
        return res.status(200).json(pokemonByName);
      } else {
        return res.status(404).json("No se ha encontrado por nombre");
      }
    } catch (error) {
      return res.status(404).json({
        error: "Error al buscar - getByPokemonName capturado en el catch",
        message: error.message,
      });
    }
  };

//todo UPDATE Y TESTING!!!
const update = async (req,res,next) =>{       //! NUM22. SETTEAMOS UPDATE Y TESTING
  await Pokemon.syncIndexes();              //se sincronizan los indexes en caso de que se hayan cambiado o haya habido algun tipo de corrupcion
  let catchImage = req.file?.path;          //setteamos la imagen como la url que tiene el archivo de la request (que puede no existir si no nos lo ha proporcionado el usuario)
    
  try {
    const { id } = req.params;            // destructuring del id que le pasamos en la request (endpoint)
    const pokemonById = await Pokemon.findById(id);   //setteamos una constante con el pokemon que tenga el id proporcionado

    if (pokemonById) {                 //SOLO SI EXISTE EJECUTAREMOS EL UPDATE Y EL TESTING!!!! SI NO, SOLO TE DEVUELVE QUE NO HAY POKEMON
      const oldImage = pokemonById.image
      const bodyTemplate = {                                      //este es el objeto que evalua si nos han dado parametros que updatear , y si los hay, se hace un objeto nuevo
        _id: pokemonById._id,
        name: req.body?.name ? req.body?.name : pokemonById.name,   //? Es necesario el optional chaining en el caso true? Puesto que seguro tiene body
        image: req.file?.path ? catchImage : oldImage,          //? Por que no podemos poner directamente en el primer req.file?.path catchImage?
        type1: req.body?.type1 ? req.body.type1 : pokemonById.type1,
        type2: req.body?.type2 ? req.body.type2 : pokemonById.type2,
      };
      try {
          await Pokemon.findByIdAndUpdate(id, bodyTemplate);    //despues de hacer el template con los cambios, buscamos el pokemon y le updateamos con la informacion
          if (req.file?.path) {
            deleteImgCloudinary(oldImage);      //y si encuentra la imagen en lo que hay que updatear, se borra la imagen antigua
          }

          const updatedPokemonById = await Pokemon.findById(id);    //TESTING. Vamos a buscar el pokemon con la nueva informacion
          const updateData = Object.keys(req.body);         //vamos a coger las keys de la request
          let test = {};

          updateData.forEach((item) =>{
            if (req.body[item] === updatedPokemonById[item]){   //Aqui estamos corroborando que lo que hay en la request y lo que hay en el pokemon de la 
              test[item] = true                               // base de datos se corresponden
            } else {
              test [item] = false
            }
          });
          if (catchImage) {
            updatedPokemonById.image === catchImage           //si se corresponde la imagen actualizada en la base de datos con la de la request
            ? (test = {...test, file: true})
            : (test = {...test, file: false})
          }

          let acc = 0;                      //comprobamos si ha habido algun fallo
          for (key in test) {
            test[key] === false && acc++;
          }

          if (acc > 0) {                                                    //si el acumulador se ha lanzado al menos un avez significa que hay algun error 
            return res.status(404).json({dataTest: test, updated: false})
          } else {
            return res.status(202).json({dataTest: test, updated: true})
          }

      } catch (error) {
        return res.status(404).json("Se identifican los datos pero no se encuentra el Pokemon")
        }

    } else {
      return res.status(404).json("No existe ese Pokemon")
    }    
  } catch (error) {
    return res.status(404).json(error)
      }
  };

const deletePokemon = async (req, res, next) => {               //!NUM23.
    try {
      const { id } = req.params;                            //cogemos el id del endpoint que vayamos a poner en la url
      const pokemon = await Pokemon.findByIdAndDelete(id);  // encontramos y borramos el objeto y lo guardamos en una constante
      deleteImgCloudinary(pokemon.image)                    //borramos la imagen de cloudinary
  
      if (pokemon) {
        const findByIdPokemon = await Pokemon.findById(id);  //despues testeamos si aun existe en caso de que haya un error y no se haya borrado adecuadamente
        try {
          const test = await Move.updateMany(
            {pokemon: id},
            {$pull: {pokemon: id}}
          );
          console.log(test)
  
        return res.status(findByIdPokemon ? 404 : 200).json({   //segun si existe o no, creamos un ternario y devuelve el status y el json con su objecto que nos saca en consola
          deleteTest: findByIdPokemon ? false : true,
        });
      } catch (error) {}
      } else {
        return res.status(404).json("Este Pokemon no existe");  //si no puede encontrar el id para hacer el findbyidanddelete no existe, dice que no existe
      }
    } catch (error) {
      return res.status(404).json(error);
    }
  };
  
  module.exports = { create, getByPokemonNameMethod, deletePokemon, getAllMethod, getByIdMethod, update }         //EXPORTAMOS Y HACEMOS EL ENRUTADO