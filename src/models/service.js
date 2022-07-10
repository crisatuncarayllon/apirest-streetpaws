const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    id_dogwalker:{
        type: mongoose.ObjectId,
        required: true,
    },
    id_dog:{
        type: mongoose.ObjectId,
        required: true,
    },
    estado:{
        type: Boolean,
        required: true,
    },
});

//Si ya paso el servicio quedaria en false o sea que esta desactivado o que el servicio ya se hizo, solo cuando este en true significa que se esta realizando el servicio

module.exports = mongoose.model('service',serviceSchema);