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
    //? necesarias, como borrar la imagen de cloudinary

    } catch (error) {
        req.file?.path && deleteImgCloudinary(catchImage);
        next(error);
    }
}