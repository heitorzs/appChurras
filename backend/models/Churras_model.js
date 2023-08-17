import mongoose from "mongoose";

const ChurrasSchema = new mongoose.Schema({

    id: { type: String },
    data: { type: Date, default: Date.now },
    descricao: { type: String },
    participantes: [{
        nome: { type: String, required: true },
        valorContribuicao: { type: Number },
        bebida: { type: Boolean },
        pago: { type: Boolean },
        obs: { type: String }
    }],
    totalArrecadado: {type: Number}
})

const churras = mongoose.model("churras", ChurrasSchema);
export default churras;

