const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ride_info', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for rides
const rideSchema = new mongoose.Schema({
    driverName: String,
    origin: String,
    destination: String,
    date: Date,
    seatsAvailable: Number
});

const Ride = mongoose.model('Ride', rideSchema);

const app = express();
app.use(bodyParser.json());

// API endpoint for posting a ride
app.post('/api/rides', async (req, res) => {
    try {
        const newRide = new Ride(req.body);
        await newRide.save();
        res.status(201).json(newRide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
