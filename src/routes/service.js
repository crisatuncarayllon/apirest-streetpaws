const express = require('express');
const serviceSchema = require('../models/service');

const router = express.Router();

//Create a service
router.post('/services',async(req, res)=>{
    try {
        const service = serviceSchema(req.body);
        const newService = await service.save();
        res.status(200).json(newService);
    } catch (error) {
        res.json({message:error});
    }
});

//Get all services
router.get('/services',async(req, res)=>{
    try {
        const services = await serviceSchema.find();
        res.status(200).json(services);
    } catch (error) {
        res.json({message:error});
    }
});

//Get a service by id
router.get('/services/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const aService = await serviceSchema.findById(id);
        res.status(200).json(aService);
    } catch (error) {
        res.json({message:error});
    }
});

//update a service by id
router.put('/services/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const { id_dogwalker, id_dog, estado } = req.body;
        const serviceUpdated = await serviceSchema.updateOne({_id: id}, { $set: { id_dogwalker, id_dog, estado } });
        res.status(200).json(serviceUpdated);
    } catch (error) {
        res.json({message:error});
    }
});

//Delete a service by id
router.delete('/services/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const serviceDeleted = await serviceSchema.remove({_id: id});
        res.status(200).json(serviceDeleted)
    } catch (error) {
        res.json({message:error});
    }
});

module.exports = router;
