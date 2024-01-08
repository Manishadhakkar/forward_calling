import React, { useState } from "react";
import "../styles.css";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Switch,
  useTheme,
  Button
} from "@mui/material";
import { MdClose } from "react-icons/md";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import CustomizedButtons from "../../button/CustomizedButtons";
import {
  getAllCountryRequest,
  getStateByCountry,
} from "../../../pages/auth/buyer/service/buyer.request";
import { useEffect } from "react";
import { getAllCompanyRequest } from "../../../pages/auth/buyer/service/buyer.request";
import Loader from "../../Loader/Loader";

const BuyerForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoader, setLoader] = useState(false);
  const [isExist, setIsExist] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState({
    value: initialValue ? initialValue.company_id : "",
    error: false,
    success: false,
  });
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

  const [email, setEmail] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [phone, setPhone] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [address, setAddress] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState({
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

  const [city, setCity] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [zipCode, setZipCode] = useState({
    value: "",
    error: false,
    success: false,
  });

  const handleChangeCompany = (value) => {
    setErrorMessage("");
    setCompanyId(value);
  };
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

  useEffect(() => {
    if (clickedBtn === "add") {
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
    }
  }, []);
  useEffect(() => {
    if (country.value !== "" && clickedBtn === "add") {
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

  useEffect(() => {
    getAllCompanyRequest()
      .then((res) => {
        const result = res.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.company_name,
            email: ele.email,
          };
        });
        setCompanyList(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isExist) {
      let filter_data = companyList?.find(
        (item) => item.value === companyId.value
      );
      const data = {
        company_id: companyId.value,
        email: filter_data.email,
      };
      handleFormData(data);
    } else {
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
        status: 1
      };
      handleFormData(value);
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      <Box noValidate>
        <Card
          component="form"
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
            title={clickedBtn === "add" ? "Add Buyer" : "Update Buyer"}
          />
          {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <CardContent color={colors.form[100]}>
            <Box className={"formResponsiveHeight"}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <FormControl
                    orientation="horizontal"
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <div>
                      <FormLabel>Exist Company</FormLabel>
                      <Switch
                        checked={isExist}
                        onChange={(event) => setIsExist(event.target.checked)}
                        color={isExist ? "success" : "neutral"}
                        variant={isExist ? "solid" : "outlined"}
                        endDecorator={isExist ? "Yes" : "No"}
                        slotProps={{
                          endDecorator: {
                            sx: {
                              minWidth: 24,
                            },
                          },
                        }}
                      />
                    </div>
                  </FormControl>
                </Grid>

                {isExist && (
                  <Grid item xs={12} md={12}>
                    <FormTextDropdown
                      Value={companyId.value}
                      onSelect={handleChangeCompany}
                      label={"Company *"}
                      CustomErrorLine={"Choose one"}
                      Required={true}
                      Options={companyList}
                      disable={clickedBtn === "edit" ? true : false}
                    />
                  </Grid>
                )}
                {!isExist && (
                  <>
                    <Grid item xs={12} md={6}>
                      <FormTextField
                        type="textarea"
                        placeholder={"Enter Company Name"}
                        label={"Company Name"}
                        Value={companyName.value}
                        onChangeText={handleChangeCompanyName}
                        Required={true}
                        CustomErrorLine={"Enter proper name"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="text"
                        label={"User Name"}
                        placeholder={"Enter User Name"}
                        CustomErrorLine="Please enter a full name"
                        value={fullName.value}
                        onChangeText={handleChangeFullName}
                        Required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormTextField
                        type="email"
                        label={"Email"}
                        placeholder={"Enter Email"}
                        CustomErrorLine="Please enter a proper email"
                        value={email.value}
                        onChangeText={handleChangeEmail}
                        Required
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
                  </>
                )}
              </Grid>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between", mr: 1, ml: 1 }}>
            <Button size="small" variant="contained" onClick={onHandleClose}>
              {"Cancel"}
            </Button>
            <Button
              type="submit"
              size="small"
              onClick={(e) => handleSubmitForm(e)}
              sx={{ backgroundColor: colors.greenAccent[500] }}
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

export default BuyerForm;
