const express = require('express');
const scoreSchema = require('../models/score');

const router = express.Router();

//Create a score
router.post('/scores',(req, res)=>{
    const score = scoreSchema(req.body);
    score
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get all scores
router.get('/scores',(req, res)=>{
    scoreSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get a score by id
router.get('/scores/:id',(req, res)=>{
    const { id } = req.params;
    scoreSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//update a score by id
router.put('/scores/:id',(req, res)=>{
    const { id } = req.params;
    const { id_dogwalker, id_owner, score, comment } = req.body;
    scoreSchema
    .updateOne({_id: id}, { $set: { id_dogwalker, id_owner, score, comment } })
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Delete a score by id
router.delete('/scores/:id',(req, res)=>{
    const { id } = req.params;
    scoreSchema
    .remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});


module.exports = router;
