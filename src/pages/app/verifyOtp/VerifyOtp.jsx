import React, { useRef, useState } from "react";
import "./style.css";

const VerifyOtpCard = ({handleFormOtp}) => {
  const [otp, setOtp] = useState("");
  const form = useRef();

  const optSubmit = (e) => {
    e.preventDefault();
    handleFormOtp(otp);
  };
  

  return (
    <div>
      <h2>Validation</h2>
      <form className="contain" onSubmit={optSubmit} ref={form}>
        <p>Enter one time password</p>
        <input
          placeholder="OTP"
          type="tel"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          name="otp"
        />
        <input type="submit" className="valBtn" />
      </form>
    </div>
  );
};

export default VerifyOtpCard;
