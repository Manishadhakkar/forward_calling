import React from "react";
import { Link, Typography } from "@mui/material";
import { WEBSITE_LABEL } from "../../../pages/auth/signin/container/loginString";

const BottomBar = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://www.textricks.com/">
        {WEBSITE_LABEL}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default BottomBar;