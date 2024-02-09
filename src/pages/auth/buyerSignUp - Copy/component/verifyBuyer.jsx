import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Loader from "../../../../components/Loader/Loader";
import { tokens } from "../../../../assets/color/theme";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  buyerSignupReq,
  getCountry,
  getState,
  verifyBuyerTokenReq,
} from "../service/buyer.signup.request";
import BuyerSignUp from "./BuyerSignUp";
import axios from "axios";

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VerifyBuyerSignUp = () => {
  const { token } = useParams();

  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const [isValid, setIsValid] = useState(null);
  const [companyData, setCompanyData] = useState({});

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

  useEffect(() => {
    verifyBuyerTokenReq(token)
      .then((res) => {
        setIsValid(res.data.status);
        setMessage(res.data.message);
        setCompanyData(res?.data?.data);
        // setUserEmail({ value: res?.data?.data?.email, success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleBuyerRegister = (data) => {
    console.log(data);
    setLoader(true);

    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/buyer`, data, {
        headers,
      })
      .then((res) => {
        console.log(">>>>>>", res);
        setLoader(false);
        // setMessage(res.data.message);
        // setBarVariant("success");
        // setSnackbarOpen({ ...snackbarOpen, open: true });
        // setTimeout(() => {
        //   navigate("/", { state: userData });
        // }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        //     setMessage(err.message);
        //     setBarVariant("error");
        //     setSnackbarOpen({ ...snackbarOpen, open: true });
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
              <BuyerSignUp
                countryData={countryData}
                userState={userStateChange}
                stateData={stateData}
                handleFormData={handleBuyerRegister}
                companyData={companyData}
                isValid={isValid}
                message={message}
              />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default VerifyBuyerSignUp;
