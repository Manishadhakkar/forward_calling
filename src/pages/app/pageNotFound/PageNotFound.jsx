import React from "react";
import Notsfound from "../../../assets/images/PageNotFound.svg";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../../assets/color/theme";

const PageNotFound = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <div className="page-not-found-container">
      <img src={Notsfound} alt="Page Not Found" className="not-found-image" />
      <Button
        variant="contained"
        size="medium"
        onClick={() => navigate("/")}
        sx={{
          textTransform: "none",
          backgroundColor: colors.greenAccent[800],
        }}
        className="centered-button"
      >
        Back to home
      </Button>
    </div>
  );
};

export default PageNotFound;
