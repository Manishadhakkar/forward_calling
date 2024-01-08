import React, { useEffect } from "react";
import Loader from "../../../../components/Loader/Loader";
import { useState } from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { tokens } from "../../../../assets/color/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./styles.css";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { MdOutlineLock } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import FormTextField from "../../../../components/textfield/FormTextField";
import {
  forgotConfirmRequest,
  forgotOtpRequest,
} from "../service/forgor.request";

const defaultTheme = createTheme();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgotPassword = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [screen, setScreen] = useState(1);
  const [value, setValue] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;
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
  const [userRepassword, setUserRepassword] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [confirmErr, setConfirmErr] = useState(false);

  useEffect(() => {
    if (userPassword.value !== "") {
      if (
        userPassword.value !== userRepassword.value &&
        userRepassword.value !== ""
      ) {
        setConfirmErr(true);
      } else {
        setConfirmErr(false);
      }
    } else {
      setConfirmErr(false);
    }
  }, [userPassword, userRepassword]);

  const handleChangeEmail = (val) => {
    setUserEmail(val);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };
  const matchIsNumeric = (text) => {
    const textTest = /[a-zA-Z]/gm;
    const isNumber = typeof text === "number";
    const isString = !textTest.test(String(text).toLowerCase());
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  };
  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleChangePassword = (value) => {
    setUserPassword(value);
  };
  const handleChangeRepassword = (value) => {
    setUserRepassword(value);
  };
  const handleReqSendOtp = () => {
    setLoader(true);
    let sendOtp = {
      email: userEmail.value,
    };
    forgotOtpRequest(sendOtp)
      .then((res) => {
        setLoader(false);
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setTimeout(() => setScreen(2), 1000);
        setValue("");
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
        setBarVariant("error");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setScreen(1);
        setValue("");
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    let resetData = {
      otp: value,
      data: {
        password: userPassword.value,
        password_confirmation: userRepassword.value,
      },
    };
    setLoader(true);
    forgotConfirmRequest(resetData)
      .then((res) => {
        setLoader(false);
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setValue("");
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
        setBarVariant("error");
        setSnackbarOpen({ ...snackbarOpen, open: true });
      });
  };

  let isDisable =
    userEmail.value === "" || userEmail.error || userEmail.success === false;

  return (
    <>
      {loader && <Loader />}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={barVariant}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            className="forget_left_grid"
            item
            xs={false}
            sm={6}
            md={6}
            sx={{
              backgroundColor: colors.primary[500],
            }}
          />
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            elevation={5}
            square
            sx={{
              boxShadow: "none",
              paddingLeft: "10px",
              paddingRight: "10px",
              margin: "auto",
            }}
          >
            {screen === 1 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "none !important",
                  width: "100%",
                }}
              >
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "80%",
                    [theme.breakpoints.up("md")]: {
                      width: "60%",
                    },
                  }}
                >
                  <Typography textAlign="center" alignItems="center">
                    <Avatar sx={{ bgcolor: "secondary.main" }}>
                      <MdOutlineLock />
                    </Avatar>
                  </Typography>
                  <Typography variant="h6" mb={2} mt={2}>
                    {"Forgot your password"}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="center"
                    mb={2}
                  >
                    {
                      "Please enter the email address you'd like your password reset otp sent to"
                    }
                  </Typography>
                  <FormTextField
                    type="email"
                    label={"Email Address"}
                    placeholder={"Enter email address"}
                    CustomErrorLine="Please enter a valid email"
                    value={userEmail.value}
                    onChangeText={handleChangeEmail}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    mt={3}
                  >
                    <Button
                      // type="submit"
                      variant="contained"
                      disabled={isDisable}
                      sx={{
                        textTransform: "none",
                      }}
                      onClick={(e) => handleReqSendOtp(e)}
                    >
                      Request OTP
                    </Button>
                    <Button
                      sx={{
                        textTransform: "none",
                      }}
                      variant="outlined"
                      onClick={() => navigate("/")}
                    >
                      Back To Login
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  padding: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "none !important",
                  width: "100%",
                }}
              >
                <Box component="form">
                  <Box
                    sx={{
                      padding: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxShadow: "none !important",
                      width: "100%",
                    }}
                  >
                    <Typography textAlign="center" alignItems="center">
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        <FaUserLock />
                      </Avatar>
                    </Typography>
                    <Typography variant="h6" mb={2} mt={2}>
                      {"Set Password"}
                    </Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                      <MuiOtpInput
                        mt={2}
                        length={6}
                        TextFieldsProps={{ placeholder: "-" }}
                        value={value}
                        onChange={handleChange}
                        validateChar={validateChar}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography
                        component="h6"
                        variant="body2"
                        gutterBottom
                        align="right"
                        mt={1}
                        mb={1}
                      >
                        {"Didn't recieve the OTP?"}
                        <strong
                          style={{ cursor: "pointer" }}
                          onClick={(e) => handleReqSendOtp(e)}
                        >
                          {" "}
                          Resend
                        </strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <FormTextField
                        type="password"
                        label={"Password"}
                        placeholder={"Enter Password"}
                        CustomErrorLine="Please enter a proper password"
                        value={userPassword.value}
                        onChangeText={handleChangePassword}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormTextField
                        type="password"
                        label={"Confirm Password"}
                        placeholder={"Re-enter Password"}
                        CustomErrorLine="Please enter a proper same password"
                        value={userRepassword.value}
                        onChangeText={handleChangeRepassword}
                        Required
                        confirmErr={confirmErr}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    mt={3}
                  >
                    <Button
                      onClick={(e) => handleResetPassword(e)}
                      sx={{
                        textTransform: "none",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      Reset Password
                    </Button>
                    <Button
                      onClick={() => navigate("/")}
                      sx={{
                        textTransform: "none",
                      }}
                      variant="outlined"
                    >
                      Back To Login
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default ForgotPassword;
