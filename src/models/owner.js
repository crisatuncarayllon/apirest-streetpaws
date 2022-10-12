const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    breed:{
        type: String,
        required: true,
    }
});

const ownerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    dni:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    dogs:{
        type: [dogSchema],
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true,
    }
});

//Si ya paso el servicio quedaria en false o sea que esta desactivado o que ya esta disponible.

module.exports = mongoose.model('owner',ownerSchema);