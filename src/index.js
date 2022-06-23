const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes = require('./routes/user');
const ownerRoutes = require('./routes/owner');
const serviceRoutes = require('./routes/service');
const scoreRoutes =require('./routes/score')
const cors = require('cors');

const res = require('express/lib/response');

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(cors());
app.use('/api',userRoutes);
app.use('/api',ownerRoutes);
app.use('/api',serviceRoutes);
app.use('/api',scoreRoutes);

//Routes
app.get("/",(req,res)=>{
    res.send('Welcome to my API');
})

//mongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log('Connected to MongoDB Atlas')).catch(()=>console.error(error));

app.listen(port,()=>console.log('server listening on port',port));