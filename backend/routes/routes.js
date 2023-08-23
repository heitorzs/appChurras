import express from "express";
import ChurrasControllers from "../controllers/controllers.js";

const router = express.Router();

router
  .get("/churrascos", ChurrasControllers.listarChurras)
  .get("/churrascos/:id", ChurrasControllers.listarChurrasByID)
  .post("/churrascos", ChurrasControllers.criarChurras)
  .put("/churrascos/:id", ChurrasControllers.adicionarParticipante) 
  .delete("/churrascos/:id", ChurrasControllers.excluirChurrasco)
  .delete("/churrascos/:id/participante/:participanteId", ChurrasControllers.excluirParticipante)  

export default router;