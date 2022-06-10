const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

//Create user
router.post('/users',(req, res)=>{
    const user = userSchema(req.body);
    user
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get all users
router.get('/users',(req, res)=>{
    userSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Get a user by id
router.get('/users/:id',(req, res)=>{
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//update a user by id
router.put('/users/:id',(req, res)=>{
    const { id } = req.params;
    const { name, dni, address, email } = req.body;
    userSchema
    .updateOne({_id: id}, { $set: {name, dni, address, email} })
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});

//Delete a user by id
router.delete('/users/:id',(req, res)=>{
    const { id } = req.params;
    userSchema
    .remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});


module.exports = router;
