const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.post("/vehicle_info", controller.postVehicleInfo);
router.post("/user_login", controller.postUserLogin);
router.post("/register", controller.postRegister);
router.post("/login", controller.postLogin);
router.post("/rides", controller.postRides);
router.post("/requestRide", controller.postRequestRide);
router.post("/recurring-rides", controller.postRecurringRides);
router.post("/rideShareRequests", controller.postRideShareRequests);
router.post("/rideRequests", controller.postRideRequest);
router.get("/rides", controller.getRides);
router.get("/rides", controller.getRideById);
router.get("/rideShareRequests", controller.getRideShareRequests);

module.exports = router;
