import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Loader from "../../../../components/Loader/Loader.jsx";
import { tokens } from "../../../../assets/color/theme.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  buyerSignupReq,
  getCountry,
  getState,
  verifyBuyerTokenReq,
} from "../service/buyer.signup.request.js";
import FormTextField from "../../../../components/textfield/FormTextField.jsx";
import FormTextDropdown from "../../../../components/dropdown/FormTextDropdown.jsx";
import { Avatar, Button, Link, Typography } from "@mui/material";
import { MdOutlineLock } from "react-icons/md";
const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BuyerSignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useParams();

  const colors = tokens(theme.palette.mode);

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);

  const [isValid, setIsValid] = useState(null);
  const [companyData, setCompanyData] = useState({});

  const [companyName, setCompanyName] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [fullName, setFullName] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [userEmail, setUserEmail] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [userPhone, setUserPhone] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [userAddress, setUserAddress] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [userCountry, setUserCountry] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [state, setState] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [userCity, setUserCity] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [zipCode, setZipCode] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [userPassword, setUserPassword] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [confirmErr, setConfirmErr] = useState(false);

  const [userRepassword, setUserRepassword] = useState({
    value: "",
    error: false,
    success: false,
  });

  const { vertical, horizontal, open } = snackbarOpen;

  let btnDisable =
    companyName.error ||
    fullName.error ||
    userEmail.error ||
    userPhone.error ||
    userAddress.error ||
    userCountry.error ||
    state.error ||
    userCity.error ||
    zipCode.error ||
    userPassword.error ||
    userRepassword.error ||
    companyName.value === "" ||
    fullName.value === "" ||
    userEmail.value === "" ||
    userPhone.value === "" ||
    userAddress.value === "" ||
    userCountry.value === "" ||
    state.value === "" ||
    userCity.value === "" ||
    zipCode.value === "" ||
    userPassword.value === "" ||
    userRepassword.value === "" ||
    companyName.success === false ||
    fullName.success === false ||
    userEmail.success === false ||
    userPhone.success === false ||
    userAddress.success === false ||
    userCountry.success === false ||
    state.success === false ||
    userCity.success === false ||
    zipCode.success === false ||
    userPassword.success === false ||
    userRepassword.success === false;

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

  const handleChangeCompanyName = (value) => {
    setCompanyName(value);
  };
  const handleChangeFullName = (val) => {
    setFullName(val);
  };
  const handleChangeEmail = (val) => {
    setUserEmail(val);
  };
  const handleChangeUserPhone = (val) => {
    setUserPhone(val);
  };
  const handleChangeAddress = (val) => {
    setUserAddress(val);
  };
  const handleChangeCountry = (value) => {
    setUserCountry(value);
  };
  const handleChangeState = (value) => {
    setState(value);
  };
  const handleChangeCity = (value) => {
    setUserCity(value);
  };
  const handleChangeZip = (value) => {
    setZipCode(value);
  };
  const handleChangePassword = (value) => {
    setUserPassword(value);
  };
  const handleChangeRepassword = (value) => {
    setUserRepassword(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  useEffect(() => {
    verifyBuyerTokenReq(token)
      .then((res) => {
        setIsValid(res.data.status);
        setMessage(res.data.message);
        setCompanyData(res?.data?.data);
        setUserEmail({ value: res?.data?.data?.email, success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isValid) {
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
    }
  }, [isValid]);

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

  useEffect(() => {
    userStateChange(userCountry.value);
  }, [userCountry]);

  const handleRegister = (e) => {
    e.preventDefault();
    const queryData = {
      token: companyData.token,
      user_id: companyData.user_id,
      company_id: companyData.company_id,
      company_name: companyName.value,
      name: fullName.value,
      email: userEmail.value,
      mobile: userPhone.value,
      address: userAddress.value,
      country_id: userCountry.value,
      state_id: state.value,
      city: userCity.value,
      zip: parseInt(zipCode.value),
      password: userPassword.value,
    };
    setLoader(true);
    buyerSignupReq(queryData)
      .then((res) => {
        setLoader(false);
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
            bgcolor={colors.primary[500]}
          />
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            // component={Paper}
            // elevation={5}
            square
            sx={{
              boxShadow: "none",
              paddingLeft: "10px",
              paddingRight: "10px",
              margin: "auto",
            }}
          >
            {isValid ? (
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
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <MdOutlineLock />
                </Avatar>
                <Typography variant="h6">{"Register"}</Typography>
                <Typography
                  mt={2}
                  variant="subtitle1"
                  color={colors.blueAccent[200]}
                >
                  {userEmail.value}
                </Typography>
                <Box className="signup_right_box">
                  <Grid container spacing={1} component="form">
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="textarea"
                        label={"Company Name"}
                        placeholder={"Enter company name"}
                        CustomErrorLine="Please enter a company name"
                        value={companyName.value}
                        onChangeText={handleChangeCompanyName}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="textarea"
                        label={"Full Name"}
                        placeholder={"Enter full name"}
                        CustomErrorLine="Please enter a full name"
                        value={fullName.value}
                        onChangeText={handleChangeFullName}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="phoneno"
                        label={"Phone No"}
                        placeholder={"Enter Phone No."}
                        CustomErrorLine="Please enter a phone no."
                        value={userPhone.value}
                        onChangeText={handleChangeUserPhone}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="textarea"
                        label={"Address"}
                        placeholder={"Enter Address"}
                        CustomErrorLine="Please enter address"
                        value={userAddress.value}
                        onChangeText={handleChangeAddress}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextDropdown
                        Value={userCountry.value}
                        onSelect={handleChangeCountry}
                        label={"Country *"}
                        placeholder={"Enter Country Name"}
                        CustomErrorLine={"Choose one"}
                        Required={true}
                        Options={countryData}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextDropdown
                        Value={state.value}
                        onSelect={handleChangeState}
                        label={"State *"}
                        placeholder={"Enter State Name"}
                        CustomErrorLine={"Choose one"}
                        Required={true}
                        Options={stateData}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="textarea"
                        label={"City"}
                        placeholder={"Enter City Name"}
                        CustomErrorLine="Please enter a city name"
                        value={userCity.value}
                        onChangeText={handleChangeCity}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="num"
                        label={"Zip"}
                        placeholder={"Enter Zip Code"}
                        CustomErrorLine="Please enter a zip code"
                        value={zipCode.value}
                        onChangeText={handleChangeZip}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
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
                    <Button
                      fullWidth
                      size="small"
                      type="submit"
                      onClick={handleRegister}
                      sx={{ backgroundColor: colors.greenAccent[500] }}
                      variant="contained"
                      disabled={btnDisable}
                    >
                      {"Sign Up"}
                    </Button>
                  </Grid>
                  <Grid container justifyContent={"flex-end"}>
                    <Grid item>
                      <Typography
                        component="h5"
                        variant="body2"
                        gutterBottom
                        align="center"
                        mt={3}
                        mb={2}
                        textAlign="center"
                      >
                        {"Already have an account ?"}{" "}
                        <Link sx={{ textDecoration: "none" }} href="/">
                          {"Sign In"}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ) : (
              <Typography variant="h6">{message}</Typography>
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default BuyerSignUp;
