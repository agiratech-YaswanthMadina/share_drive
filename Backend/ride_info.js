const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
// Cors
app.use(cors())


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ride_info");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create a schema for rides
const rideSchema = new mongoose.Schema({
  StartLocation: String,
  Destination: String,
  Date: String,
  Time: String,
  SeatsAvailable: Number,
  DriverName: String,
  // DriverEmail:String
  RideId: Number
});

const Ride = mongoose.model("Ride", rideSchema);


app.use(bodyParser.json());

// API endpoint for posting a ride
app.post("/api/rides", async (req, res) => {
  try {
    const newRide = new Ride(req.body);
    await newRide.save();
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/rides', async (req, res) => {
    try {
        const rides = await Ride.find();
        console.log(rides);
        res.json(rides);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get ride by ID

app.get('/api/rides/:id', (req, res) => {
  const rideId = req.params.id;
  const ride = rides.find(ride => ride.id === rideId);
  
  if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
  }
  res.json(ride);
});


const PORT = process.env.PORT || 8855;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
