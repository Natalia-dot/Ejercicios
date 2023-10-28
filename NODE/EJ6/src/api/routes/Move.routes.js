const { createMove, getMoveByType, addAndRemovePokemon, deleteMove } = require("../controllers/Move.controllers");

const MoveRoutes = require("express").Router();

MoveRoutes.post("/", createMove);
MoveRoutes.get("/:type", getMoveByType)
MoveRoutes.patch("/add/:id", addAndRemovePokemon)
MoveRoutes.delete("/:id", deleteMove)



module.exports = { MoveRoutes };