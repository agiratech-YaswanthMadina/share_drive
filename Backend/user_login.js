const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserSchema = require('./models/user');
const cors = require("cors");
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/user_login");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create a schema for rides
const rideSchema = new mongoose.Schema({
  mail: String,
  mobile: String,
  name: String,
});

const Ride = mongoose.model("UserLogin", rideSchema);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.post("/api/user_login", async (req, res) => {
//   try {
//     const newRide = new Ride(req.body);
//     await newRide.save();
//     res.status(201).json(newRide);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

app.post("/api/user_login", async (req, res, next) => {
  const { name, mailId, phone, employeeId } = req.body;
  console.log(req?.body)
  try {
    const user = await UserSchema.findOne({ employeeId: employeeId });
    if (!user) {
      const u= new UserSchema({
        mail: mailId,
        name: name,
        phoneNumber: phone,
        employeeId: employeeId,
      });
      await u.save();
      console.log(u);
    }
    res.status(200).send({ message: "inserted details successful" , response: user});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
