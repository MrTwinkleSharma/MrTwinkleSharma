require('dotenv/config');

//3rd Party Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(morgan('dev'));
}



app.use((error, req, res, next)=>{
    res.status(error.code || 500); 
    res.json({success:false, message:error.message || "An Unknown error has been occured, Sorry for Inconvenience!"})
});


mongoose.connect(`${process.env.MONGODB_URL}`,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    console.log("Connection To Database Established Successfully!");
})
.catch((error)=>{
    console.log("Error has been occurred while connecting to database!!");
});

module.exports = app;