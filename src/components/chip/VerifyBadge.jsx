import React from "react";
import { Box } from "@mui/material";
import { GoVerified, GoUnverified } from "react-icons/go";

const VerifyBadge = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      {props.value === 1 ? (
        <GoVerified size="15" color="blue" />
      ) : (
        <GoUnverified size="15" color="red" />
      )}
    </Box>
  );
};

export default VerifyBadge;
