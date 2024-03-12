import Navbar from "./Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import React from "react";
import AboutUs from "./pages/AboutUs";
import ContactUS from "./pages/ContactUs";
import OurBlog from "./pages/OurBlog";


function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About-us" element={<AboutUs />} />
          <Route path="/Contact-us" element={<ContactUS />} />
          <Route path="/Blog" element={<OurBlog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
