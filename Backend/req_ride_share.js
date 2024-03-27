const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const cors = require('cors');
const nodemailer = require('nodemailer');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rides');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for ride share requests
const rideShareRequestSchema = new mongoose.Schema({
    passengerID: String,
    RideID: String,
    Status: String,
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

// Connection URI
const uri = 'mongodb://localhost:27017';
// Database Name
const dbName = 'ride_info';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
var dbCol = client.connect().then(() => {
    console.log('Connected to MongoDB');

    // Specify the database to use
    const db = client.db(dbName);

    // Use the collection you want to query
    var collection = db.collection('rides');

    // Query the collection to find documents
    collection.findOne({RideId:1}).then((rides) => {
    console.log('Retrieved rides:', rides.DriverName);
    }).catch((error) => {
        console.error('Error retrieving rides:', error);
    });
   
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


app.post(`/api/requestRide`,async(req,res)=>{
    const rideId = req.body.rideId;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yaswanth35000@gmail.com',
            pass: 'bmct egzh pqca jzsp'
        }
    });

    
    
    const dbClient = await client.connect();
    const db = await dbClient.db('ride_info');
    var collection = await db.collection('rides');
    var ride = await collection.findOne({RideId:rideId});

    const returnvalue = `<div className="ride-cards-container">
  <center>

    <h2>Hello, You got a new ride request !! </h2>
    <h2>Ride Details:</h2>
  </center>
  <div className="ride-cards">
      <div key={index} className="ride-card">
        <center> <h3>${ride.StartLocation} to ${ride.Destination}</h3> </center> 
        <center> <p>Date: ${ride.Date}</p> </center> 
        <center> <p>Time: ${ride.Time}</p> </center> 
        <center> <p>Seats Available: ${ride.SeatsAvailable}</p> </center>
        <center> <p>Driver: ${ride.DriverName}</p> </center>
        <center> 
        <a href="http://localhost:3000/myrides"  id="myBtn" style="display: inline-block; padding: 5px 10px; margin-right: 10px; color: white; background-color: green; text-decoration: none; border-radius: 5px;">Accept</a>
        <a href="http://localhost:3000/myrides"  style="display: inline-block; padding: 5px 10px; color: white; background-color: red; text-decoration: none; border-radius: 5px;">Decline</a>
        </center>
        </div>
  </div>
</div>`;
    // let findRideReturnValue = res.body.returnValue;
    // Setup email data


    let mailOptions = {
        from: 'yaswanth35000@gmail.com',
        to: 'yaswanth3511@gmail.com',
        subject: 'Test Email',
        html: returnvalue        
    };

    // `<p>Hello Yaswanth you Got a Ride Request</p>
    // 
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.json({message:"mail Sent",driverName:driverName})
    });
})

const PORT = process.env.PORT || 8300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
