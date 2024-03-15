import Navbar from "./Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import React from "react";
import AboutUs from "./pages/AboutUs";
import ContactUS from "./pages/ContactUs";
import OurBlog from "./pages/OurBlog";
import Bookride from "./pages/findride";
import Offerride from "./pages/offerride";

function App() {
  return (
    <>
      <Navbar />
      {/* <Bookride /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About-us" element={<AboutUs />} />
        <Route path="/Contact-us" element={<ContactUS />} />
        <Route path="/Blog" element={<OurBlog />} />
        <Route path="/bookRide"element={<Bookride/>}/>
        <Route path="/offerRide"element={<Offerride/>}/>
      </Routes>
    </>
  );
}

export default App;
