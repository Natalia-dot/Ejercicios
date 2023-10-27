const { createMove, getMoveByType, addAndRemovePokemon } = require("../controllers/Move.controllers");

const MoveRoutes = require("express").Router();

MoveRoutes.post("/", createMove);
MoveRoutes.get("/:type", getMoveByType)
MoveRoutes.patch("/add/:id", addAndRemovePokemon)



module.exports = { MoveRoutes };