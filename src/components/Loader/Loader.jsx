import React from "react";
import "./styles.css";
import { RingLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-backdrop"></div>
      <div className="loader">
        <RingLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default Loader;
