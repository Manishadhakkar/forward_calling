import React from "react";
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
import { MuiOtpInput } from "mui-one-time-password-input";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOtpRequest, verifyOtpRequest } from "../service/otp.request";

const defaultTheme = createTheme();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VerifyOtp = (props) => {
  // const userData = JSON.parse(localStorage.getItem("userData"));
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const userData = location.state?.login_id;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let sendData = {
      email: userData,
      otp: value,
    };
    setLoader(true);
    verifyOtpRequest(sendData)
      .then((res) => {
        setLoader(false);
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
        setBarVariant("error");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setValue("");
      });
  };
  const handleResend = () => {
    let reqData = {
      email: userData,
    };
    setLoader(true);
    sendOtpRequest(reqData)
      .then((res) => {
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
        setBarVariant("error");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setValue("");
      });
  };

  let isDisable = value === "" || value.length < 6;

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
            className="verify_left_grid"
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
            <Box
              component="form"
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "none !important",
              }}
            >
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <MdOutlineLock />
              </Avatar>
              <Typography variant="h6" mb={2} mt={2}>
                {"Verify with OTP"}
              </Typography>
              <Typography variant="body2" gutterBottom align="center" mb={2}>
                {
                  "To ensure your security, please enter the One-Time Password (OTP) sent to your register email below."
                }
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <MuiOtpInput
                  mt={2}
                  length={6}
                  TextFieldsProps={{ placeholder: "-" }}
                  value={value}
                  onChange={handleChange}
                  validateChar={validateChar}
                />
              </Box>
              <Typography
                component="h6"
                variant="body2"
                gutterBottom
                align="center"
                mt={3}
                mb={3}
              >
                {"Didn't recieve the OTP?"}
                <strong style={{ cursor: "pointer" }} onClick={handleResend}>
                  {" "}
                  Resend
                </strong>
              </Typography>
              <Box sx={{ mt: 1, display: "flex" }}>
                <IconButton onClick={(e) => handleSubmit(e)}>
                  <Button
                    size="large"
                    variant="contained"
                    type="submit"
                    disabled={isDisable}
                  >
                    Submit
                  </Button>
                </IconButton>
                <IconButton onClick={() => navigate("/")}>
                  <Button size="large" variant="outlined">
                    Cancel
                  </Button>
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default VerifyOtp;
