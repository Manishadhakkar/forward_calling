import React from "react";

export default function Timer(props) {
  let difference;
  if (props.time2 != null) {
    difference = Number(props.time) - Number(props.time2);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>
        <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}</span>
      </div>
    </div>
  );
}
