const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    cargo_al_que_se_postula: {
        type: String,
        required: true
    },
    analisis_de_su_curriculo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('informes', dataSchema);
