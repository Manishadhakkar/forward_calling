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
import React, { useState } from "react";
import FormTextField from "../../textfield/FormTextField";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { tokens } from "../../../assets/color/theme";
import { useEffect } from "react";
import { getStateByCountry } from "../../../pages/auth/users/service/users.request";
import { getUserByIdRequest } from "../../../pages/auth/account/service/account.request";
import { isAuthorizedFunc } from "../../../utility/utilty";
import { UPDATE_USER } from "../../../utility/constant";

const UserDetails = (props) => {
  const { handleUserFormData, errorMessage, setErrorMessage, countryList } =
    props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [id, setId] = useState(null);

  const [details, setDetails] = useState();
  const [userName, setUserName] = useState({
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

  const handleChangeName = (value) => {
    setErrorMessage("");
    setUserName(value);
  };
  const handleChangeEmail = (val) => {
    setErrorMessage("");
    setUserEmail(val);
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
    if (user?.user_data) {
      let id = user?.user_data?.id;
      getUserByIdRequest(id)
        .then((res) => {
          let userData = res.data.data;
          setUserName({ value: userData.name });
          setUserEmail({ value: userData.email });
          setUserCountry({ value: userData.country.id });
          setUserPhone({ value: userData.mobile });
          setUserAddress({ value: userData.address });
          setState({ value: userData.state.id });
          setUserCity({ value: userData.city });
          setZipCode({ value: userData.zip });
          setDetails(user?.user_data);
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
        .catch((err) => {});
    }
  }, [userCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = {
      id: details.id,
      name: userName.value,
      email: userEmail.value,
      country_id: userCountry.value,
      mobile: userPhone.value,
      state_id: state.value,
      city: userCity.value,
      zip: zipCode.value,
      address: userAddress.value,
      role_id: details.roles[0].id,
      company_id: details.company.id,
      status: details.status,
    };
    handleUserFormData(value);
  };

  return (
    <Box noValidate>
      <Card
        component="form"
        sx={{
          backgroundColor: colors.form[500],
          color: colors.form[100],
        }}
      >
        <CardHeader
          subheader="Some information can't be edited"
          title="User Detail"
        />
        <Divider />
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
        <CardContent>
          <Grid container spacing={0.5}>
            <Grid item md={6} xs={12}>
              <FormTextField
                type="textarea"
                label={"User Name"}
                placeholder={"Enter user name"}
                CustomErrorLine="Please enter a user name"
                value={userName.value}
                onChangeText={handleChangeName}
                Required
                isDisable
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormTextField
                type="email"
                label={"Email Address"}
                placeholder={"Enter Email Address"}
                CustomErrorLine="Please enter a proper email"
                value={userEmail.value}
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
                isDisable={!isAuthorizedFunc(UPDATE_USER)}
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
                disable={!isAuthorizedFunc(UPDATE_USER)}
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
                disable={!isAuthorizedFunc(UPDATE_USER)}
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
                isDisable={!isAuthorizedFunc(UPDATE_USER)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                type="alpha"
                label={"Zip"}
                placeholder={"Enter Zip Code"}
                CustomErrorLine="Please enter a zip code"
                value={zipCode.value}
                onChangeText={handleChangeZip}
                Required
                isDisable={!isAuthorizedFunc(UPDATE_USER)}
              />
            </Grid>
          </Grid>
        </CardContent>
        {isAuthorizedFunc(UPDATE_USER) && (
          <>
            <Divider />
            <CardActions sx={{ justifyContent: "end", m: 1 }}>
              <Button
                type="submit"
                size="small"
                sx={{ backgroundColor: colors.greenAccent[500] }}
                variant="contained"
                onClick={(e) => handleSubmit(e)}
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

export default UserDetails;
