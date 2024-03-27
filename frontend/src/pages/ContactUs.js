import React from "react";
import "./contactus.css";
import Navbar from "../Navbar";
export default function ContactUS() {
  return (
    
    <section class="contact-section">
    <div class="container">
        <h2>Contact Us</h2>
        <p>Have a question or want to get in touch? Fill out the form below.</p>
        <form>
            <label for="name">Name:</label>
            <input type="text" autoComplete="off" id="name" name="name" required />
            
            <label for="email">Email:</label>
            <input type="email" autoComplete="off" id="email" name="email" required />
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            
            <button type="submit">Submit</button>

        </form>
        
    </div>
</section>

  );
}
