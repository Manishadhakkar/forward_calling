import React from "react";
import { Box,useTheme } from "@mui/material";

const RecordChip = ({ value }) => {
  return <Box sx={{ width: 100 }}>{value === 1 ? "Yes" : "No"}</Box>;
};

export default RecordChip;
