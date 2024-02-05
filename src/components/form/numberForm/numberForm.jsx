import "../styles.css";
import { useEffect } from "react";
import React, { useState } from "react";
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
import FormTextField from "../../textfield/FormTextField";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { tokens } from "../../../assets/color/theme";
import {
  getAllActiveCarriersRequest,
  getAllCountries,
} from "../../../pages/app/number/service/numbers.request";

const NumberForm = (props) => {
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

  const [didName, setDidName] = useState({
    value: initialValue ? initialValue.did_name : "",
    error: false,
    success: false,
  });
  const [countryList, setCountryList] = useState([]);
  const [selectCountry, setSelectCountry] = useState({
    value: initialValue ? initialValue.country_id : "",
    error: false,
    success: false,
  });
  const [didNumber, setDidNumber] = useState({
    value: initialValue ? initialValue.did_number : "",
    error: false,
    success: false,
  });
  const typeList = [
    { id: 1, label: "Local", value: "Local" },
    { id: 2, label: "Toll Free", value: "Tollfree" },
  ];
  const [didType, setDidType] = useState({
    value: initialValue ? initialValue.type : "",
    error: false,
    success: false,
  });
  const [description, setDescription] = useState({
    value: initialValue ? initialValue.description : "",
    error: false,
    success: false,
  });
  const [carrierData, setCarrierData] = useState([]);
  const [assignCarriers, setAssignCarriers] = useState({
    value: initialValue ? initialValue.carrier_id : "",
    error: false,
    success: false,
  });
  const [assignUser, setAssignUser] = useState({
    value: initialValue ? initialValue.assigned_user : "",
    error: false,
    success: false,
  });
  const [prefix, setPrefix] = useState(null);
  const [priceSymbol, setPriceSymbol] = useState(null);
  const [price, setPrice] = useState({
    value: initialValue ? initialValue.price : "",
    error: false,
    success: false,
  });
  const [connectPrice, setConnectPrice] = useState({
    value: initialValue ? initialValue?.connect_charge : "",
    error: false,
    success: false,
  });
  const [sellingPrice, setSellingRate] = useState({
    value: initialValue ? initialValue?.selling_price : "",
    error: false,
    success: false,
  });
  const [minDuration, setMinDuration] = useState({
    value: initialValue ? initialValue?.retail_min_duration : "",
    error: false,
    success: false,
  });
  const [billingBlock, setBillingBlock] = useState({
    value: initialValue ? initialValue?.retail_billing_block : "",
    error: false,
    success: false,
  });

  const handleChangeDidName = (value) => {
    setErrorMessage("");
    setDidName(value);
  };
  const handleChangeCountry = (value) => {
    setSelectCountry(value);
    setErrorMessage("");
  };
  const handleChangeType = (value) => {
    setDidType(value);
    setErrorMessage("");
  };
  const handleChangeDidNumber = (value) => {
    setErrorMessage("");
    setDidNumber(value);
  };
  const handleChangeDidDescripton = (value) => {
    setErrorMessage("");
    setDescription(value);
  };
  const handleChangePrice = (value) => {
    setErrorMessage("");
    setPrice(value);
  };
  const handleChangeCarriers = (value) => {
    setErrorMessage("");
    setAssignCarriers(value);
  };
  const handleChangeConnectPrice = (value) => {
    setErrorMessage("");
    setConnectPrice(value);
  };
  const handleChangeSellingPrice = (value) => {
    setErrorMessage("");
    setSellingRate(value);
  };
  const handleChangeDuration = (value) => {
    setErrorMessage("");
    setMinDuration(value);
  };
  const handleChangeBillingBlock = (value) => {
    setErrorMessage("");
    setBillingBlock(value);
  };

  useEffect(() => {
    getAllCountries()
      .then((res) => {
        const filterCountry = res.data.data.map((ele) => {
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
    getAllActiveCarriersRequest()
      .then((res) => {
        const carrier_data = res.data.data.map((ele) => {
          return {
            value: ele.id,
            label: ele.name,
          };
        });
        setCarrierData(carrier_data);
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
      setPriceSymbol(filterCountryData[0]?.currency_symbol);
    }
  }, [selectCountry.value, countryList]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !didName.value ||
      !didNumber.value ||
      !assignCarriers.value ||
      !prefix ||
      !selectCountry.value ||
      !connectPrice.value ||
      !minDuration.value ||
      !billingBlock.value ||
      !sellingPrice.value ||
      !price.value
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    const data = {
      did_name: didName.value,
      did_number: didNumber.value,
      carrier_id: assignCarriers.value,
      description: description.value,
      country_code: parseInt(prefix),
      country_id: selectCountry.value,
      price: price.value,
      connect_charge: connectPrice.value,
      retail_min_duration: minDuration.value,
      retail_billing_block: billingBlock.value,
      selling_price: sellingPrice.value,
      type: didType.value,
    };
    handleFormData(data);
  };

  return (
    <>
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
          title={clickedBtn === "add" ? "Add Number" : "Update Number"}
        />
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
        <CardContent color={colors.form[100]}>
          <Box
            sx={{
              "& .MuiTextField-root": { mb: 1 },
            }}
            pr={1}
            className={"formResponsiveHeight"}
            noValidate={true}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormTextField
                  type="alpha"
                  placeholder={"Enter DID Name"}
                  label={"DID Name"}
                  Value={didName.value}
                  onChangeText={handleChangeDidName}
                  Required={true}
                  CustomErrorLine={"Enter proper name"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormTextDropdown
                  Value={selectCountry?.value}
                  onSelect={handleChangeCountry}
                  label={"Country"}
                  CustomErrorLine={"Choose one"}
                  Required={true}
                  Options={countryList}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextDropdown
                  Value={didType.value}
                  onSelect={handleChangeType}
                  label={"Did Type *"}
                  CustomErrorLine={"Choose one"}
                  Required={true}
                  Options={typeList}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextField
                  type="phoneNo"
                  placeholder={"Enter DID Number"}
                  label={"DID Number"}
                  Value={didNumber.value}
                  onChangeText={handleChangeDidNumber}
                  Required={true}
                  CustomErrorLine={"Enter proper number"}
                  prefix={prefix}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextField
                  type="textarea"
                  placeholder={"Enter Description"}
                  label={"Description"}
                  Value={description.value}
                  onChangeText={handleChangeDidDescripton}
                  Required={false}
                  CustomErrorLine={"Enter proper description"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextField
                  type="price"
                  placeholder={"Enter Monthly Price"}
                  label={"Monthly Price"}
                  Value={price.value}
                  onChangeText={handleChangePrice}
                  Required={true}
                  CustomErrorLine={"Enter proper price"}
                  priceSymbol={priceSymbol}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextField
                  type="price"
                  placeholder={"Enter Connect Charge"}
                  label={"Connect Charge"}
                  Value={connectPrice.value}
                  onChangeText={handleChangeConnectPrice}
                  Required={true}
                  CustomErrorLine={"Enter proper charge"}
                  priceSymbol={priceSymbol}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormTextField
                  type="price"
                  placeholder={"Enter Selling Charge"}
                  label={"Selling Charge"}
                  Value={sellingPrice.value}
                  onChangeText={handleChangeSellingPrice}
                  Required={true}
                  CustomErrorLine={"Enter proper charge"}
                  priceSymbol={priceSymbol}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <FormTextField
                  type="number"
                  placeholder={"Enter Minimum Duration"}
                  label={"Minimum Duration"}
                  Value={minDuration.value}
                  onChangeText={handleChangeDuration}
                  Required={true}
                  CustomErrorLine={"Enter proper value"}
                  priceSymbol={priceSymbol}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <FormTextField
                  type="number"
                  placeholder={"Enter Billing Block"}
                  label={"Retail Billing Block"}
                  Value={billingBlock.value}
                  onChangeText={handleChangeBillingBlock}
                  Required={true}
                  CustomErrorLine={"Enter proper value"}
                  priceSymbol={priceSymbol}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextDropdown
                  Value={assignCarriers.value}
                  onSelect={handleChangeCarriers}
                  label={"Assign Carriers"}
                  CustomErrorLine={"Choose one"}
                  Required={false}
                  Options={carrierData}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                    <FormTextDropdown
                      Value={assignUser.value}
                      onSelect={handleChangeUser}
                      label={"Assign User"}
                      CustomErrorLine={"Choose one"}
                      Required={false}
                      Options={user_list}
                    />
                  </Grid> */}
            </Grid>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", m: 1 }}>
          <Button size="small" variant="contained" onClick={onHandleClose}>
            {"Cancel"}
          </Button>
          <Button
            size="small"
            onClick={(e) => handleSubmitForm(e)}
            sx={{ backgroundColor: colors.greenAccent[500] }}
            variant="contained"
            type="submit"
            // disabled={clickedBtn === "add" ? disable : isValueNOTChanged}
          >
            {clickedBtn === "add" ? "Save" : "Update"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default NumberForm;
