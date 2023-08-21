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

  static adicionarParticipante = async (req, res) => {
    const id = req.params.id
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

  static excluirChurrasco = async (req, res) => {
  
    const id = req.params.id
    churras.findByIdAndDelete({_id: id})
    .then(()=> res.send("churrasco Deletado"))
    .catch((err)=>{
      console.log(err)
      res.send({error: err, msg: "Erro ao deletar"})
    })
  }

}


export default ChurrasControllers;
