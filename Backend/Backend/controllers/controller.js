const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const nodemailer = require("nodemailer");

exports.postVehicleInfo = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/vehicle_info", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const vehicleSchema = new mongoose.Schema({
    model: String,
    year: Number,
    type: String,
  });
  const Vehicle = mongoose.model("Vehicle", vehicleSchema);
  try {
    const { model, year, type } = req.body;
    const vehicle = new Vehicle({ model, year, type });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.postUserLogin = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/user_login");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  const rideSchema = new mongoose.Schema({
    mail: String,
    mobile: String,
    name: String,
  });
  const Ride = mongoose.model("UserLogin", rideSchema);
  try {
    const newRide = new Ride(req.body);
    await newRide.save();
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.postRegister = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const username = req.body.username;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.sendStatus(201);
};

exports.postLogin = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.json({ message: "Login successful" });
};
exports.postRides = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/ride_info");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  const rideSchema = new mongoose.Schema({
    StartLocation: String,
    Destination: String,
    Date: String,
    Time: String,
    SeatsAvailable: Number,
    DriverName: String,
    // DriverEmail:String
    RideId: Number,
  });
  const Ride = mongoose.model("Ride", rideSchema);
  try {
    const newRide = new Ride(req.body);
    await newRide.save();
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getRides = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/ride_info");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  const rideSchema = new mongoose.Schema({
    StartLocation: String,
    Destination: String,
    Date: String,
    Time: String,
    SeatsAvailable: Number,
    DriverName: String,
    // DriverEmail:String
    RideId: Number,
  });
  const Ride = mongoose.model("Ride", rideSchema);
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getRideById = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/ride_info");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  const rideSchema = new mongoose.Schema({
    StartLocation: String,
    Destination: String,
    Date: String,
    Time: String,
    SeatsAvailable: Number,
    DriverName: String,
    // DriverEmail:String
    RideId: Number,
  });
  const Ride = mongoose.model("Ride", rideSchema);
  const rideId = req.params.id;
  const ride = await Ride.find((ride) => ride.id === rideId);

  if (!ride) {
    return res.status(404).json({ message: "Ride not found" });
  }
  res.json(ride);
};
exports.postRequestRide = async (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yaswanth35000@gmail.com",
      pass: "bmct egzh pqca jzsp",
    },
  });
  let mailOptions = {
    from: "yaswanth35000@gmail.com",
    to: "yaswanth3511@gmail.com",
    subject: "Test Email",
    html: `<p>Hello Yaswanth you Got New Ride</p> 
        <a href="http://localhost:3000/" style="display: inline-block; padding: 10px 20px; margin: 0 10px; text-decoration: none; color: #fff; background-color: #28a745; border: 1px solid #28a745; border-radius: 5px; cursor: pointer;">Accept</a>
        <a href="http://localhost:3000/" style="display: inline-block; padding: 10px 20px; margin: 0 10px; text-decoration: none; color: #fff; background-color: #dc3545; border: 1px solid #dc3545; border-radius: 5px; cursor: pointer;">Decline</a>
        `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.json({ message: "mail Sent", driverName: driverName });
  });
};
exports.postRideShareRequests = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/rides");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  const rideShareRequestSchema = new mongoose.Schema({
    passengerID: String,
    RideID: String,
    Status: String,
  });
  const RideShareRequest = mongoose.model(
    "RideShareRequest",
    rideShareRequestSchema
  );
  try {
    const newRideShareRequest = new RideShareRequest(req.body);
    await newRideShareRequest.save();
    res.status(201).json(newRideShareRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getRideShareRequests = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/rides");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  const rideShareRequestSchema = new mongoose.Schema({
    passengerID: String,
    RideID: String,
    Status: String,
  });
  const RideShareRequest = mongoose.model(
    "RideShareRequest",
    rideShareRequestSchema
  );
  try {
    const rides = await RideShareRequest.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.postRequestRide = async (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yaswanth35000@gmail.com",
      pass: "bmct egzh pqca jzsp",
    },
  });
  let mailOptions = {
    from: "yaswanth35000@gmail.com",
    to: "yaswanth3511@gmail.com",
    subject: "Test Email",
    html: `<p>Hello Yaswanth you Got New Ride</p> 
        <a href="http://localhost:3000/" style="display: inline-block; padding: 10px 20px; margin: 0 10px; text-decoration: none; color: #fff; background-color: #28a745; border: 1px solid #28a745; border-radius: 5px; cursor: pointer;">Accept</a>
        <a href="http://localhost:3000/" style="display: inline-block; padding: 10px 20px; margin: 0 10px; text-decoration: none; color: #fff; background-color: #dc3545; border: 1px solid #dc3545; border-radius: 5px; cursor: pointer;">Decline</a>
        `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.json({ message: "mail Sent", driverName: driverName });
  });
};
exports.postRecurringRides = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/recurring-rides", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const recurringRideSchema = new mongoose.Schema({
    userId: String,
    pickupLocation: String,
    dropOffLocation: String,
    recurrencePattern: String,
  });
  const RecurringRide = mongoose.model("RecurringRide", recurringRideSchema);
  try {
    const { userName, pickupLocation, dropOffLocation, recurrencePattern } =
      req.body;

    // Create a new recurring ride document
    const newRecurringRide = new RecurringRide({
      userName,
      pickupLocation,
      dropOffLocation,
      recurrencePattern,
    });

    // Save the document to the database
    await newRecurringRide.save();

    res.status(201).json(newRecurringRide);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.postRideRequest = async (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/one_time_ride", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  const rideRequestSchema = new mongoose.Schema({
    passengerName: String,
    origin: String,
    destination: String,
    date: Date,
    seatsNeeded: Number,
  });

  const RideRequest = mongoose.model("RideRequest", rideRequestSchema);
  try {
    const newRideRequest = new RideRequest(req.body);
    await newRideRequest.save();
    res.status(201).json(newRideRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
