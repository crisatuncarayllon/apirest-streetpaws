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

module.exports = mongoose.model('service',serviceSchema);