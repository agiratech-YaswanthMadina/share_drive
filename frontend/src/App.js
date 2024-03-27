import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import React from "react";
import AboutUs from "./pages/AboutUs";
import ContactUS from "./pages/ContactUs";
import Bookride from "./pages/findride";
import Offerride from "./pages/offerride";
import { ToastContainer} from 'react-toastify';
import { useState } from 'react';
import Modal from './pages/popup';
// import Navbar from "./Navbar";

let isLoggedIn = false;
if(localStorage.getItem("employee-id")){
  isLoggedIn = true;
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div> 
      <ToastContainer />
      {/* <Bookride /> */}
      <Routes>
        <Route path="/" element={<Home data={isLoggedIn} />} />
        <Route path="/About-us" element={<AboutUs />} />
        <Route path="/Contact-us" element={<ContactUS />} />
        <Route path="/bookRide"element={<Bookride/>}/>
        <Route path="/offerRide"element={<Offerride/>}/>
      </Routes>
      </div>
  );
}

export default App;
