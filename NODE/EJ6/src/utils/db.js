const mongoose = require ("mongoose");          //!NUM5. REQUERIMOS MONGOOSE PARA ENTRAR A LA DB Y .ENV PARA LAS VARIABLES DE ENTORNO
const dotenv = require ("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connect = async () =>{               //!NUM6. CREAMOS FUNCION CONNECT PARA CONNECT A LA BASE DATOS
    try {                                         //(TRY CATCH PARA ERRORES)
        const db = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,                //(SALIDO DE LA DOCU)
            useUnifiedTopology: true,
        });
        const { name, host } = db.connection;       //(DECONSTRUCTURING DE CONNECTION, OBJETO DE MONGOOSE)

        console.log(`Se ha conectado satisfactoriamente al host:${host}, con el nombre ${name}`)
    }
    catch (error) {
        console.log("No se logro la conexion con la base de datos", error)          //(GESTION DE ERRORES)
    }
};

    module.exports = { connect }             //!NUM7.EXPORTAMOS CONNECT COMO MODULE (PARTE QUE HACE UNA UTILIDAD)