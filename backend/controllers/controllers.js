import churras from "../models/Churras_model.js"

class ChurrasControllers {

  static listarChurras = async (req, res, next) => {
    try {
      const churrasResultado = await churras.find();
      res.status(200).json(churrasResultado);
    } catch (error) {
      next(error);
    }
  };

  static listarChurrasByID = async (req, res, next) => {
    const id = req.params.id
    try {
      const churrasResultado = await churras.find({_id: id});
      res.status(200).json(churrasResultado);
    } catch (error) {
      next(error);
    }
  };

  static criarChurras = async (req, res) => {
    const novoChurrasco = req.body;
    churras.create( novoChurrasco ).then((data) => {
      console.log("churrasco salvo")
      res.status(201).send(data)
    }).catch((err) => {
      console.log(err)
      res.send({ error: err, msg: "erro ao salvar" })
    })
  }

  static atualizarChurras = async (req, res) => {
    const id = req.params.id;
    const churrasAtualizado = req.body;
    churras.findOneAndUpdate( {_id: id}, churrasAtualizado, {new: true} ).then((data) => {
      console.log("churrasco Alterado com sucesso")
      res.status(200).send(data)  
    }).catch((err) => {
      console.log(err)
      res.send({ error: err, msg: "erro ao salvar" })
    })
  }

  static adicionarParticipante = async (req, res) => {
    const id = req.params.id;
    const novoParticipante = req.body;

    churras.findByIdAndUpdate(
      {_id: id},
      {$push: {participantes: novoParticipante }},
      {new: true}
      )

    .then((data) => {
      console.log("Participante Adicionado")
      res.status(201).send(data)
    }).catch((err) => {
      console.log(err)
      res.send({ error: err, msg: "erro ao salvar" })
    })
  }

  static excluirChurras = async (req, res) => {
  
    const id = req.params.id
    churras.findByIdAndDelete({_id: id})
    .then(()=> res.send("churrasco Deletado"))
    .catch((err)=>{
      console.log(err)
      res.send({error: err, msg: "Erro ao deletar"})
    })
  }

  static editarParticipante = async (req, res) => {
    const id = req.params.id;
    const participanteId = req.params.participanteId;
    const participanteAtualizado = req.body;

    churras.findOneAndUpdate(
      {_id: id, 'participantes._id': participanteId},
      {$set: {'participantes.$': participanteAtualizado }},
      {new: true}
      )
    .then((data) => {
      console.log("Participante Atualizado com sucesso")
      res.status(201).send(data)
    }).catch((err) => {
      console.log(err)
      res.send({ error: err, msg: "erro ao atualizar participante" })
    })
  }

  static listarParticipanteById = async (req, res) => {
    const id = req.params.id;
    const participanteId = req.params.participanteId;

    churras.findOne(
      {_id: id, 'participantes._id': participanteId},
      {'participantes.$': 1}
      )
    .then((data) => {
      console.log("Participante encontrado")
      res.status(200).json(data)
    }).catch((err) => {
      console.log(err)
      res.send({ error: err, msg: "erro ao encontrar participante" })
    })
  }
  
  static excluirParticipante = async (req, res) => {
    const id = req.params.id
    const participanteId = req.params.participanteId;

    churras.findByIdAndUpdate(
      {_id: id},
      {$pull: {participantes: {_id: participanteId }}},
      {new: true}
      )
    .then((data) => {
      console.log("Participante deleteado com sucesso")
      res.status(201).send(data)
    }).catch((err) => {
      console.log(err)
      res.send({ error: err, msg: "erro ao deletar participante" })
    })
  }
}



export default ChurrasControllers;
