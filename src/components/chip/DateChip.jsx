import { Box, Chip } from "@mui/material";
import React from "react";
import moment from "moment";

const DateChip = (props) => {
  const formattedDate = moment(props?.value, "YYYY-MM-DD HH:mm:ss").format(
    "DD-MM-YYYY hh:mm a"
  );

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
        label={formattedDate}
      />
    </Box>
  );
};

export default DateChip;
