import React from "react";
import "./contactus.css";
export default function ContactUS() {
  return (
    <div className="bg">
      <section class="contact">
        <h2>Contact Us</h2>
        <form action="#" method="post">
          <label for="name">Name:</label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            name="name"
            required
          />

          <label for="email">Email:</label>
          <input
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            required
          />

          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
