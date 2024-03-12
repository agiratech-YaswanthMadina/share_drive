const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rides');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for ride share requests
const rideShareRequestSchema = new mongoose.Schema({
    passengerName: String,
    origin: String,
    destination: String,
    date: Date,
    seatsNeeded: Number
});

const RideShareRequest = mongoose.model('RideShareRequest', rideShareRequestSchema);

const app = express();
app.use(bodyParser.json());
app.use(cors())

// API endpoint for requesting a ride share
app.post('/api/rideShareRequests', async (req, res) => {
    try {
        const newRideShareRequest = new RideShareRequest(req.body);
        await newRideShareRequest.save();
        res.status(201).json(newRideShareRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/rideShareRequests', async (req, res) => {
    try {
        const rides = await RideShareRequest.find();
        res.json(rides);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
