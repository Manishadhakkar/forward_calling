import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { tokens } from "../../../assets/color/theme";
import "./styles.css";
import FormTextField from "../../textfield/FormTextField";
import {
  getAllCountryRequest,
  getStateByCountry,
} from "../../../pages/auth/users/service/users.request";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import Loader from "../../Loader/Loader";

const CompanyForm = ({
  handleFormData,
  onHandleClose,
  errorMessage,
  setErrorMessage,
  clickedBtn,
  initialValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoader, setLoader] = useState(false);
  const [companyName, setCompanyName] = useState({
    value: clickedBtn === "edit" ? initialValue.company_name : "",
    error: false,
    success: false,
  });
  const [fullName, setFullName] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [email, setEmail] = useState({
    value: clickedBtn === "edit" ? initialValue.email : "",
    error: false,
    success: false,
  });
  const [phone, setPhone] = useState({
    value: clickedBtn === "edit" ? initialValue.mobile : "",
    error: false,
    success: false,
  });
  const [address, setAddress] = useState({
    value: clickedBtn === "edit" ? initialValue.billing_address : "",
    error: false,
    success: false,
  });
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState({
    value: clickedBtn === "edit" ? initialValue.country_id : "",
    error: false,
    success: false,
  });
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState({
    value: initialValue ? initialValue.state_id : "",
    error: false,
    success: false,
  });
  const [city, setCity] = useState({
    value: clickedBtn === "edit" ? initialValue.city : "",
    error: false,
    success: false,
  });
  const [zipCode, setZipCode] = useState({
    value: clickedBtn === "edit" ? initialValue.zip : "",
    error: false,
    success: false,
  });

  useEffect(() => {
    setLoader(true);
    getAllCountryRequest()
      .then((res) => {
        const filterCountry = res.data.data.map((ele) => {
          return {
            value: ele.id,
            label: ele.country_name,
            phone_code: ele.phone_code,
          };
        });
        setCountryList(filterCountry);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (country.value !== "") {
      getStateByCountry(country.value)
        .then((res) => {
          const filterState = res.data.data.map((ele) => {
            return {
              value: ele.id,
              label: ele.state_name,
            };
          });
          setStateList(filterState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [country]);

  const handleChangeCompanyName = (value) => {
    setErrorMessage("");
    setCompanyName(value);
  };
  const handleChangeFullName = (val) => {
    setErrorMessage("");
    setFullName(val);
  };
  const handleChangeEmail = (val) => {
    setErrorMessage("");
    setEmail(val);
  };
  const handleChangePhone = (val) => {
    setErrorMessage("");
    setPhone(val);
  };
  const handleChangeAddress = (val) => {
    setErrorMessage("");
    setAddress(val);
  };
  const handleChangeCountry = (value) => {
    setErrorMessage("");
    setCountry(value);
  };
  const handleChangeState = (value) => {
    setErrorMessage("");
    setState(value);
  };
  const handleChangeCity = (value) => {
    setErrorMessage("");
    setCity(value);
  };
  const handleChangeZip = (value) => {
    setErrorMessage("");
    setZipCode(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const value = {
      company_name: companyName.value,
      name: fullName.value,
      email: email.value,
      mobile: phone.value,
      address: address.value,
      country_id: country.value,
      state_id: state.value,
      city: city.value,
      zip: parseInt(zipCode.value),
    };
    handleFormData(value);
  };
  return (
    <>
      {isLoader && <Loader />}
      <Box component="form" noValidate>
        <Card
          sx={{
            boxShadow: "none",
            backgroundColor: colors.form[500],
            color: colors.form[100],
          }}
        >
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={onHandleClose}>
                <MdClose color={colors.form[100]} />
              </IconButton>
            }
            title={clickedBtn === "add" ? "Create Company" : "Edit Company"}
          />
          {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <CardContent color={colors.form[100]}>
            <Box className={"formResponsiveHeight"}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormTextField
                    type="textarea"
                    placeholder={"Enter Company Name"}
                    label={"Company Name"}
                    Value={companyName.value}
                    onChangeText={handleChangeCompanyName}
                    Required={true}
                    CustomErrorLine={"Enter proper name"}
                    isDisable={clickedBtn === "edit" && true}
                  />
                </Grid>
                {clickedBtn === "add" && (
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      type="text"
                      label={"User Name"}
                      placeholder={"Enter User Name"}
                      CustomErrorLine="Please enter a full name"
                      value={fullName.value}
                      onChangeText={handleChangeFullName}
                      Required
                      isDisable={clickedBtn === "edit" && true}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    type="email"
                    label={"Email"}
                    placeholder={"Enter Email"}
                    CustomErrorLine="Please enter a proper email"
                    value={email.value}
                    onChangeText={handleChangeEmail}
                    Required
                    isDisable={clickedBtn === "edit" && true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    type="phoneno"
                    label={"Phone No"}
                    placeholder={"Enter Phone No."}
                    CustomErrorLine="Please enter a phone no."
                    value={phone.value}
                    onChangeText={handleChangePhone}
                    Required
                    isDisable={clickedBtn === "edit" && true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    type="textarea"
                    label={"Address"}
                    placeholder={"Enter Address"}
                    CustomErrorLine="Please enter address"
                    value={address.value}
                    onChangeText={handleChangeAddress}
                    Required
                    isMultiline
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextDropdown
                    Value={country.value}
                    onSelect={handleChangeCountry}
                    label={"Country *"}
                    placeholder={"Enter Country Name"}
                    CustomErrorLine={"Choose one"}
                    Required={true}
                    Options={countryList}
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
                    Options={stateList}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormTextField
                    type="text"
                    label={"City"}
                    placeholder={"Enter City Name"}
                    CustomErrorLine="Please enter a city name"
                    value={city.value}
                    onChangeText={handleChangeCity}
                    Required
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
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
              </Grid>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", mr: 1, ml: 1 }}>
            <Button
              size="small"
              variant="contained"
              onClick={onHandleClose}
              sx={{
                textTransform: "none",
                backgroundColor: colors.redAccent[700],
                ":hover": {
                  backgroundColor: colors.redAccent[800],
                },
              }}
            >
              {"Cancel"}
            </Button>
            <Button
              type="submit"
              size="small"
              onClick={(e) => handleSubmitForm(e)}
              sx={{
                textTransform: "none",
                backgroundColor: colors.greenAccent[700],
                ":hover": {
                  backgroundColor: colors.greenAccent[800],
                },
              }}
              variant="contained"
            >
              {clickedBtn === "add" ? "Save" : "Update"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default CompanyForm;
