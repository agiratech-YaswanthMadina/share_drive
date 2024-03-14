import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import image2 from "./taxiBookingPhoneImg.svg";
export default function Home() {
  return (
    <>
      <div className="bg1">
        <div></div>

        <div>
          <div>
           <Link to="/bookRide"><button className="button">Find a Ride</button></Link> 
          </div>

          <div>
            <Link to="/offerRide"> <button className="button">Offer a Ride</button> </Link>
          </div>
        </div>
      </div>

      <div className="second-box">
        <div>
          <h1 className="heading">Why Share Drive Ride</h1>
          <p className="paragraph">
            A Ride For All Your Travel Needs “On Time & Affordable"
          </p>
        </div>

        <div>
          <img className="image_settings" src={image2} />
        </div>
      </div>
    </>
  );
}
