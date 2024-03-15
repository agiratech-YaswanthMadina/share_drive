import React, { useState, useEffect } from "react";
import "./bookride.css"; 

function FindRide() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/rides")
      .then((response) => response.json())
      .then((data) => setRides(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleBookRide = (rideId) => {
    // Implement your booking logic here, based on the ride ID
    console.log(`Booking ride with ID ${rideId}`);
  };

  return (
    <div className="ride-table-container">
      <center>
        <h2>Available Rides</h2>
      </center>

      <table className="ride-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>StartLocation</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Time</th>
            <th>SeatsAvailable</th>
            <th>DriverName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.StartLocation}</td>
              <td>{ride.Destination}</td>
              <td>{ride.Date}</td>
              <td>{ride.Time}</td>
              <td className="adjust">{ride.SeatsAvailable}</td>
              <td>{ride.DriverName}</td>
              <td>
                <button onClick={() => handleBookRide(ride.id)}>
                  Book Ride
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FindRide;
