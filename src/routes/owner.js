const express = require('express');
const ownerSchema = require('../models/owner');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');
const saltRounds =  10;

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
        const anOwner = await ownerSchema.findById(id);
        res.status(200).json(anOwner);
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

//LOGIN Y REGISTRO

router.post('/registro',async function(req,res){

    var data = req.body; 
    var usuarios_arr = []; //creamos un array para almacenar los usuarios

    usuarios_arr = await ownerSchema.find({email:data.email}); //buscamos en si ya exuste en la bd el email

    //validamos si ya existe el correo en la base de datos
    if(usuarios_arr.length==0){
        
        //comprobamos si hay password
        if(data.password){
            bcrypt.hash(data.password,saltRounds,async function(err,hash){
                if(hash){
                    //console.log(hash);
                    data.password = hash;
                    // const usuario = {
                    //     email   : email,
                    //     password : password
                    // }
                    //creamos el usuario con el password encriptado
                    var reg = await ownerSchema.create(data);
                    res.status(200).json({data:reg});
                }else{
                    res.status(200).json({message:error});
                }
            })
        }else{
            res.status(200).send({message:'No hay una contraseña'});
        }
        
    
    }else{
        res.status(200).send({message:'el correo ya existe en el DB',data:undefined});
    }

});

router.post('/login',async function(req,res) {

    var data = req.body; 
    var usuarios_arr = []; //creamos un array para almacenar los usuarios

    usuarios_arr = await ownerSchema.find({email:data.email});

    if(usuarios_arr==0){
        res.status(200).send({message:'No se encuentra el correo en la BD',data:undefined});
    }else{
        //Si se encuentra el usuario
        let user = usuarios_arr[0];

        bcrypt.compare(data.password,user.password,async function(error,check){
            if(check){
                res.status(200).json({data:user, token: jwt.createToken(user)});
            }else{
                res.status(200).send({message:'La contraseña no concide',data:undefined});
            }
        })
  
    }
   
})


module.exports = router;
