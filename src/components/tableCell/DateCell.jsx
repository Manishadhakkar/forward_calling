import React from "react";
import moment from "moment";

const DateCell = ({ value }) => {
  const date = moment(value).format("DD MMM YYYY, h:mm a");

  return (
    <div>{date}</div>
  );
};

export default DateCell;
