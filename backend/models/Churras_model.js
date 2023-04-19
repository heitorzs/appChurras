const mongoose = require("mongoose");

const ChurrasSchema = new mongoose.Schema({

    id: { type: String },
    data: { type: Date, default: Date.now },
    descricao: { type: String },
    participantes: [{
        nome: { type: String, required: true },
        valorContribuicao: { type: number },
        bebida: { type: Boolean },
        pago: { type: Boolean },
        obs: { type: String }
    }]
})

module.exports = mongoose.model("churras", ChurrasSchema);
