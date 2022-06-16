const express = require('express');
const ownerSchema = require('../models/owner');

const router = express.Router();

//Create an owner
router.post('/owners',(req, res)=>{
    const owner = ownerSchema(req.body);
    owner
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get all owners
router.get('/owners',(req, res)=>{
    ownerSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get an owner by id
router.get('/owners/:id',(req, res)=>{
    const { id } = req.params;
    ownerSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//update an owner by id


//Delete an owner by id
router.delete('/owners/:id',(req, res)=>{
    const { id } = req.params;
    ownerSchema
    .remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});


module.exports = router;
