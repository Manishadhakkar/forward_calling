import React from "react";
import TripleToggleSwitch from "./triple";

const StateSwitch = (props) => {
  const labels = {
    left: {
      title: "RU",
      value: "left"
    },
    right: {
      title: "EN",
      value: "right"
    },
    center: {
      title: "EN",
      value: "US"
    }
  };

  const onChange = (value) => console.log("value", value);

  return (
    <div>
      <TripleToggleSwitch labels={labels} onChange={onChange} />
    </div>
  );
};

export default StateSwitch;