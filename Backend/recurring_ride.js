const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8600;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recurring-rides', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Mongoose schema for recurring rides
const recurringRideSchema = new mongoose.Schema({
    userId: String,
    pickupLocation: String,
    dropOffLocation: String,
    recurrencePattern: String
});

const RecurringRide = mongoose.model('RecurringRide', recurringRideSchema);

app.use(bodyParser.json());

// API endpoint to post a new recurring ride
app.post('/recurring-rides', async (req, res) => {
    try {
        const { userName, pickupLocation, dropOffLocation, recurrencePattern } = req.body;

        // Create a new recurring ride document
        const newRecurringRide = new RecurringRide({
            userName,
            pickupLocation,
            dropOffLocation,
            recurrencePattern
        });

        // Save the document to the database
        await newRecurringRide.save();

        res.status(201).json(newRecurringRide);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
