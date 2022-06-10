const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes = require('./routes/user');

const res = require('express/lib/response');

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use('/api',userRoutes);

//Routes
app.get("/",(req,res)=>{
    res.send('Welcome to my API');
})

//mongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log('Connected to MongoDB Atlas')).catch(()=>console.error(error));

app.listen(port,()=>console.log('server listening on port',port));