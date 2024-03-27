const mongoose = require("mongoose");
const { MongoMissingCredentialsError } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";
// Database Name
const dbName = "ride_info";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB server
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");

    // Specify the database to use
    const db = client.db(dbName);

    // Use the collection you want to query
    const collection = db.collection("rides");

    // Query the collection to find documents
    collection
      .findOne({ RideId: 1 })
      .then((rides) => {
        console.log("Retrieved rides:", rides.DriverName);
      })
      .catch((error) => {
        console.error("Error retrieving rides:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = client;
