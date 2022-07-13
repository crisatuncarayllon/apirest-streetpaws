const express = require('express');
const serviceSchema = require('../models/service');

const router = express.Router();

//Create a service
router.post('/services',(req, res)=>{
    const service = serviceSchema(req.body);
    service
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get all services
router.get('/services',(req, res)=>{
    serviceSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get a service by id
router.get('/services/:id',(req, res)=>{
    const { id } = req.params;
    serviceSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//update a service by id
router.put('/services/:id',(req, res)=>{
    const { id } = req.params;
    const { id_dogwalker, id_dog, estado } = req.body;
    serviceSchema
    .updateOne({_id: id}, { $set: { id_dogwalker, id_dog, estado } })
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Delete a service by id
router.delete('/services/:id',(req, res)=>{
    const { id } = req.params;
    serviceSchema
    .remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

module.exports = router;
