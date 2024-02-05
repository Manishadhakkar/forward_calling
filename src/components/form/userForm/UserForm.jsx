import React, { useState } from "react";
import "../styles.css";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import CustomizedButtons from "../../button/CustomizedButtons";
import {
  getAllActiveRole,
  getAllCountryRequest,
  getStateByCountry,
} from "../../../pages/auth/users/service/users.request";
import { useEffect } from "react";
import { getAllCompanyRequest } from "../../../pages/app/serverIp/service/serverIp.request";

const UserForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
    company_id,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });
  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState({
    value: initialValue ? initialValue.company_id : "",
    error: false,
    success: false,
  });
  const [userEmail, setUserEmail] = useState({
    value: initialValue ? initialValue.email : "",
    error: false,
    success: false,
  });
  const [userRole, setUserRole] = useState({
    value: clickedBtn === "edit" ? initialValue?.roles[0]?.id : "",
    error: false,
    success: false,
  });
  const [roleList, setRoleList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [userPhone, setUserPhone] = useState({
    value: initialValue ? initialValue.mobile : "",
    error: false,
    success: false,
  });
  const [userAddress, setUserAddress] = useState({
    value: initialValue ? initialValue.address : "",
    error: false,
    success: false,
  });
  const [selectCountry, setSelectCountry] = useState({
    value: initialValue ? initialValue.country_id : "",
    error: false,
    success: false,
  });
  const [stateData, setStateData] = useState([]);
  const [state, setState] = useState({
    value: initialValue ? initialValue.state_id : "",
    error: false,
    success: false,
  });
  const [userCity, setUserCity] = useState({
    value: initialValue ? initialValue.city : "",
    error: false,
    success: false,
  });
  const [zipCode, setZipCode] = useState({
    value: initialValue ? initialValue.zip : "",
    error: false,
    success: false,
  });
  const [prefix, setPrefix] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setIsAdmin(userData?.user_data.roles?.some((ele) => ele.slug === "admin"));
  }, []);

  useEffect(() => {
    getAllCompanyRequest()
      .then((res) => {
        const result = res.data?.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.company_name,
          };
        });
        setCompanyList(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getAllActiveRole()
      .then((res) => {
        const filterRole = res.data.data?.map((ele) => {
          return {
            label: ele.name,
            value: ele.id,
          };
        });
        setRoleList(filterRole);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    getAllCountryRequest()
      .then((res) => {
        const filterCountry = res.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.country_name,
            currency_symbol: ele.currency_symbol,
            phone_code: ele.phone_code,
          };
        });
        setCountryList(filterCountry);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (selectCountry.value !== "") {
      let filterCountryData = countryList.filter(
        (ele) => ele.value == selectCountry.value
      );
      setPrefix(filterCountryData[0]?.phone_code);
    }
  }, [selectCountry.value, countryList]);

  useEffect(() => {
    if (selectCountry.value !== "") {
      getStateByCountry(selectCountry.value)
        .then((res) => {
          const filterState = res.data?.data?.map((ele) => {
            return {
              label: ele.state_name,
              value: ele.id,
            };
          });
          setStateData(filterState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectCountry]);

  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };
  const handleChangeCompany = (value) => {
    setErrorMessage("");
    setCompanyId(value);
  };
  const handleChangeEmail = (value) => {
    setErrorMessage("");
    setUserEmail(value);
  };
  const handleChangeUserPhone = (val) => {
    setErrorMessage("");
    setUserPhone(val);
  };
  const handleChangeAddress = (val) => {
    setUserAddress(val);
  };
  const handleChangeCountry = (value) => {
    setSelectCountry(value);
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
  const handleChangeRole = (value) => {
    setErrorMessage("");
    setUserRole(value);
  };

  const handleSubmitForm = () => {
    const data = {
      name: name.value,
      email: userEmail.value,
      role_id: isAdmin ? 7 : userRole.value,
      country_id: selectCountry.value,
      state_id: state.value,
      city: userCity.value,
      zip: zipCode.value,
      mobile: userPhone.value,
      address: userAddress.value,
      company_id: company_id === "0" ? companyId.value : company_id,
    };
    handleFormData(data);
  };

  return (
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
          title={clickedBtn === "add" ? "Add User" : "Update User"}
        />
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
        <CardContent color={colors.form[100]}>
          <Box className={"formResponsiveHeight"}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <FormTextField
                  type="textarea"
                  placeholder={"Enter Name"}
                  label={"Name"}
                  Value={name.value}
                  onChangeText={handleChangeName}
                  Required={true}
                  CustomErrorLine={"Enter proper name"}
                />
              </Grid>
              {company_id === "0" && (
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
              <Grid item xs={12} md={12}>
                <FormTextField
                  type="email"
                  placeholder={"Enter Email"}
                  label={"Email"}
                  Value={userEmail.value}
                  onChangeText={handleChangeEmail}
                  Required={true}
                  CustomErrorLine={"Enter proper email"}
                  isDisable={clickedBtn === "edit" ? true : false}
                />
              </Grid>
              {!isAdmin && (
                <Grid item xs={12} md={12}>
                  <FormTextDropdown
                    Value={userRole.value}
                    onSelect={handleChangeRole}
                    label={"User Type" + " *"}
                    CustomErrorLine={"Choose one"}
                    Required={true}
                    Options={roleList}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12}>
                <FormTextDropdown
                  Value={selectCountry.value}
                  onSelect={handleChangeCountry}
                  label={"Country *"}
                  placeholder={"Enter Country Name"}
                  CustomErrorLine={"Choose one"}
                  Required={true}
                  Options={countryList}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
                <FormTextField
                  type="alpha"
                  label={"Zip"}
                  placeholder={"Enter Zip Code"}
                  CustomErrorLine="Please enter zip code properly"
                  value={zipCode.value}
                  onChangeText={handleChangeZip}
                  Required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormTextField
                  type="phoneNo"
                  placeholder={"Enter Number"}
                  label={"Phone Number"}
                  Value={userPhone.value}
                  onChangeText={handleChangeUserPhone}
                  Required={true}
                  CustomErrorLine={"Enter proper number"}
                  prefix={prefix}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormTextField
                  type="textarea"
                  placeholder={"Enter Address"}
                  label={"Address"}
                  Value={userAddress.value}
                  onChangeText={handleChangeAddress}
                  Required={true}
                  CustomErrorLine={"Enter proper address"}
                  isMultiline={true}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", mr: 1, ml: 1 }}>
          <CustomizedButtons
            label={"Cancel"}
            type={"cancel"}
            onClickBtn={onHandleClose}
          />
          <CustomizedButtons
            label={clickedBtn === "add" ? "Save" : "Update"}
            type={"add"}
            onClickBtn={handleSubmitForm}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserForm;
