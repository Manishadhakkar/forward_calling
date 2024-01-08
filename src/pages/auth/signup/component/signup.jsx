import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Loader from "../../../../components/Loader/Loader";
import UserSignUp from "./userSignup";
import { tokens } from "../../../../assets/color/theme";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { getCountry, getState, userSignup } from "../service/signup.request";
const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "left",
  });
  const [barVariant, setBarVariant] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);

  const { vertical, horizontal, open } = snackbarOpen;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  useEffect(() => {
    setLoader(true);
    getCountry()
      .then((res) => {
        const filterCountry = res.data?.data?.map((ele) => {
          return {
            label: ele.country_name,
            value: ele.id,
          };
        });
        setCountryData(filterCountry);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  }, []);

  const userStateChange = (id) => {
    id &&
      getState(id)
        .then((res) => {
          const filterState = res.data?.data?.map((ele) => {
            return {
              label: ele.state_name,
              value: ele.id,
            };
          });
          setStateData(filterState);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
  };

  const handleRegister = (data) => {
    setLoader(true);
    userSignup(data)
      .then((res) => {
        setLoader(false);
        const userData = {
          login_id: res.data.data.email,
        };
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setTimeout(() => {
          navigate("/verify", { state: userData });
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
        setBarVariant("error");
        setSnackbarOpen({ ...snackbarOpen, open: true });
      });
  };

  return (
    <>
      {loader && <Loader />}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
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
            className="left_grid"
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
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "none !important",
                width: "100%",
              }}
            >
              <UserSignUp
                countryData={countryData}
                userState={userStateChange}
                stateData={stateData}
                handleFormData={handleRegister}
              />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
