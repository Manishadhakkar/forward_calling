import React from "react";
import Notsfound from "../../../assets/images/PageNotFound.svg";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found-container">
      <img src={Notsfound} alt="Page Not Found" className="not-found-image" />
      <button onClick={()=> navigate("/")} className="centered-button">Go to Homepage</button>
    </div>
  );
};

export default PageNotFound;
