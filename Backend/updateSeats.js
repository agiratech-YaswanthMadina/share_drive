const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'ride_info';

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to the database');
    return;
  }

  const db = client.db(dbName);
  const collection = db.collection('rides');


app.put('/rides/:rideId', (req, res) => {
    const { rideId } = req.params;

    collection.findOneAndUpdate(
      { _id: new ObjectID(rideId), availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          console.error('Failed to update ride');
          res.status(500).send('Failed to update ride');
          return;
        }

        if (!result.value) {
          res.status(404).send('Ride not found or no available seats');
          return;
        }

        res.json(result.value);
      }
    );
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});