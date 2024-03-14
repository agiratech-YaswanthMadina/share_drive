import React from "react";
import "./offerride.css"
const Offerride = () => {
  return (
    <div>
      <section class="contact">
        <h2>Offer a Ride</h2>
        <form action="#" method="post">
          <label for="vehicleNumber">Vehicle Number:</label>
          <input type="text" id="vehicleNumber" name="vehicleNumber" autoComplete="off" required />

          <label for="vehicleName">Vehicle Name:</label>
          <input type="text" id="vehicleName" name="vehicleName" autoComplete="off" required />

          <label for="seatAvailability">Seat Availability:</label>
          <input
            type="number"
            id="seatAvailability"
            name="seatAvailability"
            required
          />

          <label autoComplete="" for="vehicleType">Vehicle Type:</label>
          <select autoComplete="off" id="vehicleType" name="vehicleType" required>
            <option autoComplete="off" value="car">Two Wheeler</option>
            <option autoComplete="off" value="bike">Four Wheeler</option>
          </select>

          <label for="rideTime">Time:</label>
          <input autoComplete="off" type="time" id="rideTime" name="rideTime" required />

          <label for="rideDate">Date:</label>
          <input autoComplete="off" type="date" id="rideDate" name="rideDate" required />

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Offerride;
