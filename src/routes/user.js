const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

//Create user
router.post('/users', async(req, res)=>{
    try {
        const user = userSchema(req.body);
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.json({message:error})
    }
});

//Create a user
/*
router.post('/users', (req, res)=>{
    const user = userSchema(req.body);
    user
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});
*/


//Get all users

router.get('/users',async(req, res)=>{
    try {
        const dogwalker = await userSchema.find();
        res.status(200).json(dogwalker);
    } catch (error) {
        res.json({message:error});
    }
});

//Get all users
/*
router.get('/users',(req, res)=>{
    userSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});
*/

//Get a user by id
router.get('/users/:id', async(req, res)=>{
    const { id } = req.params;
    try {
        const user = await userSchema.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.json({message:error});
    }
});

//Get a user by id
/*
router.get('/users/:id',(req, res)=>{
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});
*/

//Update a use by id
router.put('/users/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const { name, dni, address, email, status, puntaje } = req.body;
        const userUpdate = await userSchema.updateOne({_id: id}, { $set: {name, dni, address, email,status ,puntaje} });
        res.json(userUpdate);
    } catch (error) {
        res.json({message:error});
    }
});



//update a user by id
/*
router.put('/users/:id',(req, res)=>{
    const { id } = req.params;
    const { name, dni, address, email, puntaje } = req.body;
    userSchema
    .updateOne({_id: id}, { $set: {name, dni, address, email, puntaje} })
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});
*/

//Delete a user by id
router.delete('/users/:id',async(req, res)=>{
    try {
        const { id } = req.params;
        const userRemoved = await userSchema.remove({_id: id});
        res.status(200).json(userRemoved);
    } catch (error) {
        res.json({message:error});
    }
});

//Delete a user by id
/*
router.delete('/users/:id',(req, res)=>{
    const { id } = req.params;
    userSchema
    .remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}));
});
*/

module.exports = router;
