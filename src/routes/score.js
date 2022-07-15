const express = require('express');
const scoreSchema = require('../models/score');

const router = express.Router();

//Create a score
router.post('/scores',async(req, res)=>{
    try {
        const score = scoreSchema(req.body);
        const newScore = await score.save();
        res.status(200).json(newScore);
    } catch (error) {
        res.json({message:error});
    }
});

//Get all scores
router.get('/scores',async(req, res)=>{
    try {
        const scores= await scoreSchema.find();
        res.status(200).json(scores);
    } catch (error) {
        res.json({message:error});
    }
});

//Get a score by id
router.get('/scores/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const aScore = await scoreSchema.findById(id);
        res.status(200).json(aScore);
    } catch (error) {
        res.json({message:error});
    }
});

//update a score by id
router.put('/scores/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const { id_dogwalker, id_owner, score, comment } = req.body;
        const scoreUpdated = await scoreSchema.updateOne({_id: id}, { $set: { id_dogwalker, id_owner, score, comment } });
        res.status(200).json(scoreUpdated);
    } catch (error) {
        res.json({message:error});
    }
});

//Delete a score by id
router.delete('/scores/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const scoreDeleted = await scoreSchema.remove({_id: id});
        res.status(200).json(scoreDeleted);
    } catch (error) {
        res.json({message:error});
    }
});


module.exports = router;
