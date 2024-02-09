import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../../assets/color/theme.js";
import FormTextField from "../../../../components/textfield/FormTextField.jsx";
import FormTextDropdown from "../../../../components/dropdown/FormTextDropdown.jsx";
import { Avatar, Button, Link, Typography } from "@mui/material";
import { MdOutlineLock } from "react-icons/md";

const BuyerSignUp = (props) => {
  const {
    handleFormData,
    userState,
    countryData,
    stateData,
    isValid,
    companyData,
    message,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  let btnDisable =
    companyName.error ||
    fullName.error ||
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
  const handleChangeUserPhone = (val) => {
    setUserPhone(val);
  };
  const handleChangeAddress = (val) => {
    setUserAddress(val);
  };
  const handleChangeCountry = (value) => {
    setUserCountry(value);
    userState(value.value);
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

  const handleRegister = () => {
    const queryData = {
      token: companyData.token,
      user_id: companyData.user_id,
      company_id: companyData.company_id,
      company_name: companyName.value,
      name: fullName.value,
      email: companyData.email,
      mobile: userPhone.value,
      address: userAddress.value,
      country_id: userCountry.value,
      state_id: state.value,
      city: userCity.value,
      zip: parseInt(zipCode.value),
    };
    handleFormData(queryData);
  };

  return (
    <>
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
          <Typography mt={2} variant="subtitle1" color={colors.blueAccent[200]}>
            {companyData.email}
          </Typography>
          <Box className="signup_right_box">
            <Grid container spacing={1}>
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
                onClick={handleRegister}
                sx={{ backgroundColor: colors.greenAccent[500], mt: 1 }}
                variant="contained"
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
    </>
  );
};

export default BuyerSignUp;
