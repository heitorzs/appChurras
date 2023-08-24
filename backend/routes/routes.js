import express from "express";
import ChurrasControllers from "../controllers/controllers.js";

const router = express.Router();

router
  .get("/churrascos/", ChurrasControllers.listarChurras)
  .get("/churrascos/:id", ChurrasControllers.listarChurrasByID)
  .post("/churrascos/novo", ChurrasControllers.criarChurras)
  .put("/churrascos/:id", ChurrasControllers.atualizarChurras) 
  .post("/churrascos/:id", ChurrasControllers.adicionarParticipante) 
  .delete("/churrascos/:id", ChurrasControllers.excluirChurras)
  .delete("/churrascos/:id/participante/:participanteId", ChurrasControllers.excluirParticipante)
  .put("/churrascos/:id/participante/:participanteId", ChurrasControllers.editarParticipante)  


export default router;