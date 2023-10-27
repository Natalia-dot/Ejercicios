const { upload } = require("../../middleware/files.middleware");
const { create, getByIdMethod, getAllMethod, getByPokemonNameMethod, deletePokemon, update } = require("../controllers/Pokemon.controller");

const PokeRoutes = require("express").Router();     //!NUM16. cogemos las funciones que necesitamos (middleware y la de creacion de objeto) y las exportamos
//!Pokeroutes tiene que usar el enrutador de express. Ahora vamos a usarlo para especificar que metodo va a usar
//!para la ruta que le estamos indicando, el middleware que va EN MEDIO ajaja y lo que haga con el objeto


PokeRoutes.post("/", upload.single("image"), create);
PokeRoutes.get("/:id", getByIdMethod);
PokeRoutes.get("/", getAllMethod);
PokeRoutes.get("/name/:name", getByPokemonNameMethod);
PokeRoutes.delete("/:id", deletePokemon);
PokeRoutes.patch("/:id", upload.single("image"), update )


module.exports = PokeRoutes;