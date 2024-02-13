import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { tokens } from "../../assets/color/theme";

const CustomizedButtons = (props) => {
  const { label, onClickBtn, type, isDisable } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const SaveButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    padding: "10px",
    border: "none",
    lineHeight: 1,
    backgroundColor: colors.greenAccent[700],
    color: colors.grey[100],
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: colors.greenAccent[800],
      border: "none",
    },
  });
  const CancelButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    padding: "10px",
    border: "none",
    lineHeight: 1,
    backgroundColor: colors.redAccent[700],
    color: colors.grey[100],
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: colors.redAccent[800],
      border: "none",
    },
  });

  const handleClickBtn = (e) => {
    e.preventDefault();
    onClickBtn();
  };

  return (
    <Stack direction="row" spacing={2}>
      {type === "add" ? (
        <SaveButton
          size="large"
          type="submit"
          variant="outlined"
          disabled={isDisable}
          onClick={(e) => handleClickBtn(e)}
        >
          {label}
        </SaveButton>
      ) : (
        <CancelButton size="large" variant="outlined" onClick={handleClickBtn}>
          {label}
        </CancelButton>
      )}
    </Stack>
  );
};
export default CustomizedButtons;
