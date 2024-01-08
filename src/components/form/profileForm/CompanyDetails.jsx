import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  useTheme,
} from "@mui/material";
import FormTextField from "../../textfield/FormTextField";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { getStateByCountry } from "../../../pages/auth/users/service/users.request";
import { getCompanyByIdRequest } from "../../../pages/auth/account/service/account.request";
import { tokens } from "../../../assets/color/theme";
import { UPDATE_COMPANY } from "../../../utility/constant";
import { isAuthorizedFunc } from "../../../utility/utilty";

const CompanyDetails = (props) => {
  const { handleCompanyFormData, errorMessage, setErrorMessage, countryList } =
    props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [id, setId] = useState(null);
  const [companyName, setCompanyName] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [companyEmail, setCompanyEmail] = useState({
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
  const [stateList, setStateList] = useState([]);
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

  const handleChangeCompanyName = (value) => {
    setErrorMessage("");
    setCompanyName(value);
  };
  const handleChangeEmail = (val) => {
    setErrorMessage("");
    setCompanyEmail(val);
  };
  const handleChangeUserPhone = (val) => {
    setErrorMessage("");
    setUserPhone(val);
  };
  const handleChangeAddress = (val) => {
    setErrorMessage("");
    setUserAddress(val);
  };
  const handleChangeCountry = (value) => {
    setErrorMessage("");
    setUserCountry(value);
  };
  const handleChangeState = (value) => {
    setErrorMessage("");
    setState(value);
  };
  const handleChangeCity = (value) => {
    setErrorMessage("");
    setUserCity(value);
  };
  const handleChangeZip = (value) => {
    setErrorMessage("");
    setZipCode(value);
  };

  useEffect(() => {
    if (user.user_data.company_id !== "0") {
      let id = user.user_data.company_id;
      getCompanyByIdRequest(id)
        .then((res) => {
          const companyData = res.data.data;
          setId(companyData.id);
          setCompanyName({ value: companyData.company_name });
          setCompanyEmail({ value: companyData.email });
          setUserPhone({ value: companyData.mobile });
          setUserAddress({ value: companyData.billing_address });
          setUserCountry({ value: companyData.country_id });
          setState({ value: companyData.state_id });
          setUserCity({ value: companyData.city });
          setZipCode({ value: companyData.zip });
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (userCountry.value !== "") {
      getStateByCountry(userCountry.value)
        .then((res) => {
          const filterState = res.data.data.map((ele) => {
            return {
              value: ele.id,
              label: ele.state_name,
            };
          });
          setStateList(filterState);
        })
        .catch(() => {});
    }
  }, [userCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = {
      id: id,
      company_name: companyName.value,
      email: companyEmail.value,
      mobile: userPhone.value,
      address: userAddress.value,
      country_id: userCountry.value,
      state_id: state.value,
      city: userCity.value,
      zip: parseInt(zipCode.value),
    };
    handleCompanyFormData(value);
  };

  return (
    <Box noValidate>
      <Card component="form"
       sx={{
        backgroundColor: colors.form[500],
        color: colors.form[100],
      }}
      >
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <CardHeader
            subheader="Some information can't be edited"
            title="Company Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={0.5}>
              <Grid item md={6} xs={12}>
                <FormTextField
                  type="text"
                  label={"Company Name"}
                  placeholder={"Enter company name"}
                  CustomErrorLine="Please enter a company name"
                  value={companyName.value}
                  onChangeText={handleChangeCompanyName}
                  Required
                  isDisable
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormTextField
                  type="email"
                  label={"Email Address"}
                  plaeholder={"Enter Email Address"}
                  CustomErrorLine="Please enter a proper email"
                  value={companyEmail.value}
                  onChangeText={handleChangeEmail}
                  Required
                  isDisable
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormTextField
                  type="phoneno"
                  label={"Phone No"}
                  placeholder={"Enter Phone No."}
                  CustomErrorLine="Please enter a phone no."
                  Value={userPhone.value}
                  onChangeText={handleChangeUserPhone}
                  Required
                  isDisable
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormTextField
                  type="textarea"
                  label={"Address"}
                  placeholder={"Enter Address"}
                  CustomErrorLine="Please enter address"
                  value={userAddress.value}
                  onChangeText={handleChangeAddress}
                  Required
                  isDisable={!isAuthorizedFunc(UPDATE_COMPANY)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormTextDropdown
                  Value={userCountry.value}
                  onSelect={handleChangeCountry}
                  label={"Country *"}
                  placeholder={"Enter Country Name"}
                  CustomErrorLine={"Choose one"}
                  Required={true}
                  Options={countryList}
                  disable={!isAuthorizedFunc(UPDATE_COMPANY)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormTextDropdown
                  Value={state.value}
                  onSelect={handleChangeState}
                  label={"State *"}
                  placeholder={"Enter State Name"}
                  CustomErrorLine={"Choose one"}
                  Required={true}
                  Options={stateList}
                  disable={!isAuthorizedFunc(UPDATE_COMPANY)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormTextField
                  type="text"
                  label={"City"}
                  placeholder={"Enter City Name"}
                  CustomErrorLine="Please enter a city name"
                  value={userCity.value}
                  onChangeText={handleChangeCity}
                  Required
                  isDisable={!isAuthorizedFunc(UPDATE_COMPANY)}
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
                  isDisable={!isAuthorizedFunc(UPDATE_COMPANY)}
                />
              </Grid>
            </Grid>
          </CardContent>

          {isAuthorizedFunc(UPDATE_COMPANY) && (
            <>
              <Divider />
              <CardActions>
                <Button
                  type="submit"
                  size="small"
                  onClick={(e) => handleSubmit(e)}
                  sx={{ backgroundColor: colors.greenAccent[500] }}
                  variant="contained"
                >
                  Save
                </Button>
              </CardActions>
            </>
          )}
      </Card>
    </Box>
  );
};

export default CompanyDetails;
