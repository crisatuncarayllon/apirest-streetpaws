const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    id_dogwalker:{
        type: mongoose.ObjectId,
        required: true,
    },
    id_owner:{
        type: mongoose.ObjectId,
        required: true,
    },
    score:{
        type: Number,
        required: true,
        min:1,
        max:5
    },
    comment:{
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('score',scoreSchema);