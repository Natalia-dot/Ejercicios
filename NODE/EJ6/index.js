const express = require ( "express" );
const dotenv = require ( "dotenv" );

dotenv.config();                         //! NUM1. IMPORTAMOS LO NECESARIO E INICIAMOS CONFIG PARA QUE DOTENV FUNCIONE

const { connect } = require("./src/utils/db");       //!NUM8. EJECUTAMOS CONNECT PARA CONECTAR LA BASE DE DATOS
connect();                                    //!NUM9. MIDDLEWARE, COPIAR Y PEGAR PERO CAMBIAR NOMBRE CARPETA CLOUDINARY
                 

const { configCloudinary } = require("./src/middleware/files.middleware");  //! NUM10.TRAER CONFIG CLOUDINARY DEL MIDDLEWARE. ES UNA FUNCION PREESTABLECIDA
configCloudinary();



const PORT = process.env.PORT;                          //! NUM2.IMPORTAMOS PORT DE DOTENV

const app = express();                                  //! NUM3.INICIALIZAMOS EL SERVIDOR Y SETTEAMOS COMO APP
app.use(express.json({limit:"5mb"}))                     //!NUM11. ESTABLECEMOS LOS PARAMETROS PARA LAS SUBIDAS DE NUESTRA APLICACION
app.use(express.urlencoded({limit:"5mb", extended:false}))      //!NUM12. CREAMOS CARPETAS DE CONTROLLERS MODELS Y ROUTES, Y EMPEZAMOS CON MODELS

app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)        //! NUM4. HACEMOS LISTEN DEL SERVIDOR
})
