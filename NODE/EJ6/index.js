const express = require ( "express" );
const dotenv = require ( "dotenv" );

dotenv.config();                         //! NUM1. IMPORTAMOS LO NECESARIO E INICIAMOS CONFIG PARA QUE DOTENV FUNCIONE

const { connect } = require("./src/utils/db");       //!NUM8. EJECUTAMOS CONNECT PARA CONECTAR LA BASE DE DATOS
connect();                                    //!NUM9. MIDDLEWARE, COPIAR Y PEGAR PERO CAMBIAR NOMBRE CARPETA CLOUDINARY
                 

const { configCloudinary } = require("./src/middleware/files.middleware");  //! NUM10.TRAER CONFIG CLOUDINARY DEL MIDDLEWARE. ES UNA FUNCION PREESTABLECIDA
configCloudinary();



const PORT = process.env.PORT;                          //! NUM2.IMPORTAMOS PORT DE DOTENV

const app = express();                                  //! NUM3.INICIALIZAMOS EL SERVIDOR Y SETTEAMOS COMO APP
const cors = require("cors");                           //! NUM18.
app.use(cors());

app.use(express.json({limit:"5mb"}))                     //!NUM11. ESTABLECEMOS LOS PARAMETROS PARA LAS SUBIDAS DE NUESTRA APLICACION
app.use(express.urlencoded({limit:"5mb", extended:false}))      //!NUM12. CREAMOS CARPETAS DE CONTROLLERS MODELS Y ROUTES, Y EMPEZAMOS CON MODELS


const PokeRoutes = require("./src/api/routes/Pokemon.routes");       //! NUM17. ASIGNAMOS EL ENRUTADOR Y LO USAMOS. SIGNIFICA QUE LA URL BASE ES LA QUE ESTA ENTRECOMILLADA,
app.use("/api/v1/Pokemon/", PokeRoutes)                         //! Y LUEGO DE ESTA URL BASE SE LE PASARA EL RESTO DE ENDPOINTS ESPECIFICADOS EN POKEROUTE


const { MoveRoutes } = require("./src/api/routes/Move.routes");
app.use("/api/v1/Moves/", MoveRoutes)



app.use("*", (req, res, next) => {                      //! NUM18. GESTIONAMOS ERROR EN CASO DE QUE NO SE ENCUENTRE LA RUTA
    const error = new Error("Route not found");
    error.status = 404;
    return next (error);
})

app.use((error, req, res) => {
    return res
    .status(error.status || 500)
    .json(error.message || "Server error");
})



app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)        //! NUM4. HACEMOS LISTEN DEL SERVIDOR
})
