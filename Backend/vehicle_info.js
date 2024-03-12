const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { MongoMissingCredentialsError } = require('mongodb');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/vehicle_info', {useNewUrlParser: true, useUnifiedTopology: true});

const vehicleSchema = new mongoose.Schema({
    model: String,
    year: Number,
    type: String,

});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

app.use(bodyParser.json());

//API 

app.post('/vehicleinfo', async(req, res) => {
    try{
        const {model, year, type} = req.body;
        const vehicle = new Vehicle({model, year,type});
        await vehicle.save();
        res.status(201).json(vehicle);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
})
