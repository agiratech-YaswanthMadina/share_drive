import React, { useState, useEffect } from "react";
import "./findride.css";
import Axios from "axios"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FindRide() {
  const [rides, setRides] = useState([]);
  const driverEmail=""
  var RideId = "";
  useEffect(() => {
    fetch("http://localhost:8855/api/rides")
      .then((response) => response.json())
      .then((res) =>{
        setRides(res)
        console.log(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // useEffect(()=>{

  //   Axios.get(`http://localhost:8001/api/rides`)
  //   .then((res) => {
  //     setRides(res.data)
  //     console.log(data);
  //   })
  //   .catch((err)=>console.log(err))
  // }, []);

  const handleBookRide = (rideId) => {
    // Implement your booking logic here, based on the ride ID
    toast.success('Ride Request sent Successfully');

    Axios.post(`http://localhost:8300/api/requestRide`, {
      rideId  
  })
    .then((res)=>console.log(res.data))

    .catch((err)=>console.log(err))
    
  };

  const returnvalue = <div className="ride-cards-container">
  <center>
    <h2>Available Rides</h2>
  </center>
  <div className="ride-cards">
    {rides.map((ride, index) => (
      <div key={index} className="ride-card">
        <h3>{ride.StartLocation} to {ride.Destination}</h3>
        <p>Date: {ride.Date}</p>
        <p>Time: {ride.Time}</p>
        <p>Seats Available: {ride.SeatsAvailable}</p>
        <p>Driver: {ride.DriverName}</p>
        <button id={ride.RideId} className="ridebutton" onClick={() => handleBookRide(ride.RideId)}>
          Request Ride
        </button>
      </div>
    ))}
  </div>
</div>;

  return (
    returnvalue
  );
}

export default FindRide;
