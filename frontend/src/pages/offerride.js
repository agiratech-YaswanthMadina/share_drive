import React, { useState } from "react";
import axios from "axios";
import "./offerride.css";

const Offerride = () => {
  const [StartLocation, setStartLocation] = useState("");
  const [EndLocation, setEndLocation] = useState("");
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [SeatsAvailable, setSeatsAvailable] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [RideId, setRideId] = useState("");

  //   const [formData, setFormData] = useState({
  //     StartLocation: setStartLocation,
  //     EndLocation: setEndLocation,
  //     Date: setDate,
  //     Time: setTime,
  //     SeatsAvailable: setSeatsAvailable,
  //     DriverName: setDriverName,
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8855/api/rides", {
        StartLocation: StartLocation,
        Destination: EndLocation,
        Date: Date,
        Time: Time,
        SeatsAvailable: SeatsAvailable,
        DriverName: DriverName,
        RideId: RideId,
      })
      .then((response) => {
        console.log(response.data);
        // Handle success, maybe show a success message
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, maybe show an error message
      });
    setStartLocation("");
    setEndLocation("");
    setDate("");
    setTime("");
    setSeatsAvailable("");
    setDriverName("");
    setRideId("");
    alert("Details Added Succesfully");
  };

  const generate = (e) => {
    e.preventDefault();
    const newRideId = generateRideId();
    setRideId(newRideId);
  };

  const generateRideId = () => {
    return Math.floor(100 + Math.random() * 900).toString();
  };

  return (
    <div>
      <section class="contact">
        <h2>Enter Vehicle Details</h2>
        <form action="#" onSubmit={handleSubmit} method="post">
          <label for="vehicleNumber">Start Location:</label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            autoComplete="off"
            value={StartLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
          />

          <label for="vehicleName">End Location:</label>
          <input
            type="text"
            id="endLocation"
            name="endLocation"
            autoComplete="off"
            value={EndLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
          />

          <label autoComplete="off" for="vehicleType">
            Vehicle Number:
          </label>
          <input
            type="text"
            id="vehicleNumber"
            name="vehicleNumber"
            autoComplete="off"
            required
          />

          <label for="rideDate">Date:</label>

          <input
            type="date"
            autoComplete="off"
            id="rideDate"
            name="rideDate"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label for="rideTime">Time:</label>
          <input
            autoComplete="off"
            type="time"
            id="rideTime"
            name="rideTime"
            value={Time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label for="seatAvailability">SeatsAvailable:</label>
          <input
            type="number"
            id="seatAvailability"
            name="seatAvailability"
            min="1"
            max="4"
            value={SeatsAvailable}
            onChange={(e) => setSeatsAvailable(e.target.value)}
            required
          />

          {/* <label for="rideID">Enter a Ride ID:</label>
          <input
            type="number"
            id="seatAvailability"
            name="seatAvailability"
            value={RideId}
            onChange={(e) => setRideId(e.target.value)}
            required
          /> */}

          <div className="rideid">
            <label className="headinglabel" for="rideID">Ride ID:</label>
            <input className="input"
              type="number"
              id="rideId"
              name="rideId"
              value={RideId}
              onChange={(e) => setRideId(e.target.value)}
              required
            />
            <button className="buttonalignment" onClick={generate}>Generate Ride ID</button>
          </div>

          <label autoComplete="off" for="DriverName">
            Driver Name:
          </label>
          <input
            type="text"
            id="DriverName"
            name="Driver Name"
            autoComplete="off"
            value={DriverName}
            onChange={(e) => setDriverName(e.target.value)}
            required
          />

          <button onSubmit={handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Offerride;
