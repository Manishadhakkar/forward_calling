import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import FormTextField from "../../../../components/textfield/FormTextField";
import {
  SIGNIN_EMAIL_LABEL,
  SIGNIN_EMAIL_PLACEHOLDER,
  SIGNIN_HEADER_LABEL,
  SIGNIN_PASSWORD_ERROR,
  SIGNIN_PASSWORD_LABEL,
  SIGNIN_PASSWORD_PLACEHOLDER,
  SIGNIN_SUBMIT_LABEL,
  SIGNUP_HYPERTEXT,
} from "../container/loginString";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "../../../../components/button/FormButton";
import Link from "@mui/material/Link";
import { MdOutlineLock } from "react-icons/md";
import "./auth.css";

const UserSignIn = (props) => {
  const { handleFormData } = props;

  const [userEmail, setUserEmail] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [userPassword, setUserPassword] = useState({
    value: "",
    error: false,
    success: false,
  });

  let disable =
    userEmail.error ||
    userPassword.error ||
    userEmail.value === "" ||
    userPassword.value === "" ||
    userEmail.success === false ||
    userPassword.success === false;

  const handleChangeEmail = (val) => {
    setUserEmail(val);
  };
  const handleChangePassword = (val) => {
    setUserPassword(val);
  };

  const handleSignIn = (e) => {
    const value = {
      email: userEmail.value,
      password: userPassword.value,
    };
    handleFormData(value);
  };

  return (
    <>
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <MdOutlineLock />
      </Avatar>
      <Typography variant="h6" mb={2} mt={2}>
        {SIGNIN_HEADER_LABEL}
      </Typography>
      <Box component="form" className="login_right_box" noValidate>
        <Grid>
          <FormTextField
            type="email"
            label={SIGNIN_EMAIL_LABEL}
            placeholder={SIGNIN_EMAIL_PLACEHOLDER}
            CustomErrorLine="Please enter a valid email"
            value={userEmail.value}
            onChangeText={handleChangeEmail}
            Required
          />
        </Grid>
        <Grid>
          <FormTextField
            type="password"
            label={SIGNIN_PASSWORD_LABEL}
            placeholder={SIGNIN_PASSWORD_PLACEHOLDER}
            CustomErrorLine={SIGNIN_PASSWORD_ERROR}
            value={userPassword.value}
            onChangeText={handleChangePassword}
            Required
          />
        </Grid>
        <Typography
          component="h4"
          variant="caption"
          gutterBottom
          textAlign="end"
        >
          <Link sx={{ textDecoration: "none" }} href="/forgotpassword">
            {SIGNUP_HYPERTEXT}
          </Link>
        </Typography>
        <Grid mt={1}>
          <FormButton
            onAddclick={handleSignIn}
            label={SIGNIN_SUBMIT_LABEL}
            isDisable={disable}
          />
        </Grid>
      </Box>
      <div className="signup_div">
        <Typography
          component="h5"
          variant="body2"
          gutterBottom
          align="center"
          mt={3}
          mb={3}
        >
          {"Don't have an account ?"}{" "}
          <Link sx={{ textDecoration: "none" }} href="/signup">
            {"Register Now"}
          </Link>
        </Typography>
      </div>
    </>
  );
};

export default UserSignIn;
