import React, { useState, useEffect } from "react";
import Timer from "./Timer";

function StopWatch() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((time) => time + 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Timer time={time} />;
}

export default StopWatch;
