const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/one_time_ride', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for one-time ride requests
const rideRequestSchema = new mongoose.Schema({
    passengerName: String,
    origin: String,
    destination: String,
    date: Date,
    seatsNeeded: Number
});

const RideRequest = mongoose.model('RideRequest', rideRequestSchema);

const app = express();
app.use(bodyParser.json());

// API endpoint for posting a one-time ride request
app.post('/api/rideRequests', async (req, res) => {
    try {
        const newRideRequest = new RideRequest(req.body);
        await newRideRequest.save();
        res.status(201).json(newRideRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// exports.a={
//     name:"lkjhgfcd",
//     email:"likujhgfd@jkdnf.com"
// }