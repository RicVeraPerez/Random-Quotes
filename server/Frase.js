const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FraseSchema = new Schema({
    frase: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    }
});

const Frase = mongoose.model('Frase', FraseSchema);

module.exports = Frase;