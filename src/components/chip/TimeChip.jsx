import { Box, Chip } from "@mui/material";
import React from "react";

const TimeChip = (props) => {
  return (
    <Box sx={{ width: 100 }}>
      <Chip
        sx={{
          height: "auto",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "wrap",
          },
        }}
        label={props?.value}
      />
    </Box>
  );
};

export default TimeChip;
