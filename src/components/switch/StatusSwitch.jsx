import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {  useTheme } from "@mui/material";
import { tokens } from "../../assets/color/theme";

const StatusSwitch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const RedChip = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.switchColor[100],
      "&:hover": {
        backgroundColor: alpha(
          colors.switchColor[100],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: colors.switchColor[100],
    },
  }));

  return (
      <RedChip defaultChecked size="small" />
  );
};

export default StatusSwitch;