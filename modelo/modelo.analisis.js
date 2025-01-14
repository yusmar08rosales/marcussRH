const mongoose = require('mongoose');

const AnalisisSchema = new mongoose.Schema({
    analisis: {
        type: String,
        required: true
    },
    transcripcion: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('analisis', AnalisisSchema);
