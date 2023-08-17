import express from "express";
import ChurrasControllers from "../controllers/controllers.js";

const router = express.Router();

router
  .get("/churrascos", ChurrasControllers.listarChurras)
  .get("/churrascos/:id", ChurrasControllers.listarChurrasByID)
  .post("/churrascos", ChurrasControllers.criarChurras)
  .post("/churrascos/:id/participantes", ChurrasControllers.adicionarParticipante) 
  .put("/churracos/:id", )
  .delete("/churrascos/:id", ChurrasControllers.excluirChurrasco)
  .delete("/churrascos/participante/:id", )  

export default router;