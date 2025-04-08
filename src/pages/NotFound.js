// src/pages/NotFound.js
import React from "react";
import "../styles/NotFound.css";
import Error404 from "../assets/img/404-error.png";

const NotFound = () => {
  return (
    <div className="not-container">

      <h1>Error 404 Pagina No encotrada</h1>
      <img src={Error404} alt="Error 404" title="NotFound" />

      
    </div>
  );
};

export default NotFound;
