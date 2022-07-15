const express = require('express');
const ownerSchema = require('../models/owner');

const router = express.Router();

//Create an owner
router.post('/owners',async(req, res)=>{
    try {
        const owner = ownerSchema(req.body);
        const newOwner = await owner.save();
        res.status(200).json(newOwner);
    } catch (error) {
        res.json({message:error});   
    }
});

//Get all owners
router.get('/owners',async(req, res)=>{
    try {
        const owners = await ownerSchema.find(); 
        res.status(200).json(owners);
    } catch (error) {
        res.json({message:error});
    }
});

//Get an owner by id
router.get('/owners/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const owner = await ownerSchema.findById(id);
        res.status(200).json(owner);
    } catch (error) {
        res.json({message:error});
    }
});

//update an owner by id
//No se modifica el arreglo de "dogs" el cual almacena un arreglo de los perros que pertenecen a cada dueño
router.put('/owners/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const { name, dni, address, email, status } = req.body;
        const ownerUpdated = await ownerSchema.updateOne({_id: id}, { $set: { name, dni, address, email, status } });
        res.status(200).json(ownerUpdated);
    } catch (error) {
        (error)=>res.json({message:error});
    }
});


//Delete an owner by id
router.delete('/owners/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const ownerDeleted = await ownerSchema.remove({_id: id});
        res.status(200).json(ownerDeleted);
    } catch (error) {
        res.json({message:error});
    }
});


module.exports = router;
