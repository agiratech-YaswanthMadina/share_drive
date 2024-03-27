import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import image2 from "./taxiBookingPhoneImg.svg";
import image1 from "./Group 801.png"
import image3 from "./greenTimer.svg"
import image4 from "./greenTaxiCab.svg"
import image5 from "./greenSupportImage.svg"
import image6 from "./greenTaxiDriver.svg"
import image7 from "./greenNoLastMin.svg"
import Navbar from "../Navbar";
import Login_page from "./login_page";

export default function Home({data}) {

  
  return (

    !(data) ?
    <>
    <Login_page />
    
    </>
   :
    <>
      <Navbar />
      <div className="bg1">
        <div>
          <h1 className="heading1">Best Ride . Best Fare</h1>
          <img className="firstimage" src={image1} />
        </div>

        <div className="homebuttons">
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

      <div className="third-box">
        <div className="adjustment">
          <div className="container1">
            <img className="image" src={image3} />
            <p className="paragraph_box">On Time Every Time</p>
          </div>

          <div className="container3">
            <img className="image" src={image4} />
            <p className="paragraph_box">Assured Rides</p>
          </div>

          <div className="container2">
            <img className="image" src={image3} />
            <p className="paragraph_box">On Time Every Time</p>
          </div>
        </div>

        <div className="last_container">
          <div className="container1 container4">
            <img className="image" src={image5} />
            <p className="paragraph_box">Feedback</p>
          </div>

          <div className="container3">
            <img className="image" src={image6} />
            <p className="paragraph_box">Curteous Drivers</p>
          
          </div>

          <div className="container2">
            <img className="image" src={image7} />
            <p className="paragraph_box">No Last Min
            <br></br>
            Cancellation</p>
          </div>
        </div>
      </div>

     <div>
     <footer className="footer-card">
    <div className="footer-card-content">
        <h3>Contact Us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
        <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> 123 Street, City, Country</p>
            <p><i className="fas fa-envelope"></i> info@example.com</p>
            <p><i className="fas fa-phone"></i> +123-456-7890</p>
        </div>
    </div>
</footer>


     </div>
    </>
  );
}
