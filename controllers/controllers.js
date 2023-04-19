const churrasModel = require("../models/Churras_model.js")

module.exports.getChurras = async (req, res) => {
    const churras = await churrasModel.find()
    res.send(churras)
}

module.exports.createChurras = (req, res) => {
    const { churrasco } = req.body;
    churrasModel.create({ churrasco }).then((data)=>console.log("churrasco salvo"))
    .catch((err)=>{
        console.log(err);
        res.send({error: err, msg: "algo deu errado"})
    })
}
