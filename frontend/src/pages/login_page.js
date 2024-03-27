import React from "react";
import login from "../login";
import "./login_page.css";
import image11 from "./about-us-banner.jpg"

const Login_page = () => {
  return (

    <div className="loginimage">
      <button onClick={login}>Login with Microsoft</button>
    </div>
    
    
  );
};

export default Login_page;
