import React from "react";
import { Box, Chip, useTheme } from "@mui/material";
import { tokens } from "../../assets/color/theme";

const StatusBadge = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: "100%" }}>
      <Chip
        sx={{
          height: "auto",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "nowrap",
          },
          backgroundColor:
            props.value === 1 ? colors.greenAccent[600] : colors.redAccent[600],
          color: "black",
        }}
        label={props.value === 1 ? "Active" : "Inactive"}
        variant="filled"
      />
    </Box>
  );
};

export default StatusBadge;
