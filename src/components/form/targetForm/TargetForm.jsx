import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import "../styles.css";
import { getAllCompanyRequest } from "../../../pages/auth/users/service/users.request";
import FormTextDropdown from "../../dropdown/FormTextDropdown";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  boxShadow: "none",
  textAlign: "start",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));
const SwitchItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  boxShadow: "none",
  textAlign: "end",
  color: theme.palette.text.primary,
  flexGrow: 1,
}));

const TargetForm = (props) => {
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
  const [description, setDescription] = useState({
    value: initialValue ? initialValue.description : "",
    error: false,
    success: false,
  });
  const [typeList, setTypeList] = useState([
    { label: "Number", value: "Number" },
    { label: "SIP", value: "SIP" },
  ]);
  const [numberType, setNumberType] = useState({
    value: initialValue ? initialValue?.type : "Number",
    error: false,
    success: false,
  });
  const [number, setNumber] = useState({
    value: initialValue ? initialValue.forwarding_number : "",
    error: false,
    success: false,
  });
  const [timeout, setTimeout] = useState({
    value: initialValue ? initialValue?.connection_timeout : null,
    error: false,
    success: false,
  });
  const [monthlyCap, setMonthlyCap] = useState(
    clickedBtn === "edit"
      ? initialValue.monthly_cap === null
        ? false
        : true
      : false
  );
  const [monthlyValue, setMonthlyValue] = useState({
    value: initialValue ? initialValue.monthly_cap : "",
    error: false,
    success: false,
  });
  const [dailyCap, setDailyCap] = useState(
    clickedBtn === "edit"
      ? initialValue.daily_cap === null
        ? false
        : true
      : false
  );

  const [dailyValue, setDailyValue] = useState({
    value: initialValue ? initialValue.daily_cap : "",
    error: false,
    success: false,
  });
  const [hourlyCap, setHourlyCap] = useState(
    clickedBtn === "edit"
      ? initialValue.hourly_cap === null
        ? false
        : true
      : false
  );
  const [hourlyValue, setHourlyValue] = useState({
    value: initialValue ? initialValue.hourly_cap : "",
    error: false,
    success: false,
  });
  const [maximumCap, setMaximumCap] = useState(
    clickedBtn === "edit"
      ? initialValue.max_concurrency === null
        ? false
        : true
      : false
  );
  const [maximunValue, setMaximumValue] = useState({
    value: initialValue ? initialValue.max_concurrency : "",
    error: false,
    success: false,
  });

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

  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };
  const handleChangeDescription = (value) => {
    setErrorMessage("");
    setDescription(value);
  };
  const handleChangeCompany = (value) => {
    setErrorMessage("");
    setCompanyId(value);
  };
  const handleChangeType = (value) => {
    setErrorMessage("");
    setNumberType(value);
  };
  const handleChangeNo = (value) => {
    setErrorMessage("");
    setNumber(value);
  };
  const handleChangeTimeout = (value) => {
    setErrorMessage("");
    setTimeout(value);
  };
  const handleChangeMonthlyCap = (value) => {
    setErrorMessage("");
    setMonthlyValue(value);
  };
  const handleChangeDailyCap = (value) => {
    setErrorMessage("");
    setDailyValue(value);
  };
  const handleChangeHourlyCap = (value) => {
    setErrorMessage("");
    setHourlyValue(value);
  };
  const handleChangeMaximumCap = (value) => {
    setErrorMessage("");
    setMaximumValue(value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      name: name.value,
      description: description.value,
      forwarding_number: number.value,
      connection_timeout: timeout.value,
      type: numberType.value,
      monthly_cap: monthlyCap === true ? monthlyValue.value : null,
      daily_cap: dailyCap === true ? dailyValue.value : null,
      hourly_cap: hourlyCap === true ? hourlyValue.value : null,
      max_concurrency: maximumCap === true ? maximunValue.value : null,
      company_id:
        company_id === "0" ? parseInt(companyId.value) : parseInt(company_id),
    };
    handleFormData(data);
  };

  return (
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
        title={clickedBtn === "add" ? "Add Target" : "Update Target"}
      />
      <CardContent color={colors.form[100]}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 1 },
            "&::-webkit-scrollbar": {
              width: "6px",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "lightgray",
              borderRadius: "3px",
            },
          }}
          className={"formResponsiveHeight"}
          noValidate={true}
        >
          {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <Grid container spacing={1}>
            {company_id === "0" && (
              <Grid item xs={12} md={6}>
                <FormTextDropdown
                  Value={companyId.value}
                  onSelect={handleChangeCompany}
                  label={"Company *"}
                  CustomErrorLine={"Choose one"}
                  Required={true}
                  Options={companyList}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormTextField
                type="alpha"
                placeholder={"Enter Target Name"}
                label={"Name"}
                Value={name.value}
                onChangeText={handleChangeName}
                Required={true}
                CustomErrorLine={"Enter proper name"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormTextField
                type="textarea"
                placeholder={"Enter Description"}
                label={"Description"}
                Value={description.value}
                onChangeText={handleChangeDescription}
                Required={false}
                CustomErrorLine={"Enter proper description"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormTextDropdown
                Value={numberType.value}
                onSelect={handleChangeType}
                label={"Did Type *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={typeList}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormTextField
                type={numberType.value === "Number" ? "phoneno" : "textarea"}
                placeholder={
                  numberType.value === "Number" ? "Enter Number" : "Enter Sip"
                }
                label={numberType.value === "Number" ? "Number" : "Sip"}
                Value={number.value}
                onChangeText={handleChangeNo}
                Required={true}
                CustomErrorLine={
                  numberType.value === "Number"
                    ? "Enter proper number"
                    : "Enter proper sip"
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormTextField
                type="num"
                placeholder={"Enter connection time out"}
                label={"Connection timeout"}
                Value={timeout.value}
                onChangeText={handleChangeTimeout}
                Required={false}
                CustomErrorLine={"Enter proper description"}
              />
            </Grid>
            <Grid item xs={12} md={12} mb={1}>
              <Typography>Cap Setting</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Item>Monthly Cap</Item>
                <SwitchItem>
                  <Switch
                    checked={monthlyCap}
                    onChange={() => setMonthlyCap(!monthlyCap)}
                    name="inputToggle"
                    color="secondary"
                  />
                </SwitchItem>
                <span style={{ width: "40%" }}>
                  <FormTextField
                    type="capvalue"
                    placeholder={"Enter cap"}
                    label={"Monthly Cap"}
                    Value={monthlyValue.value}
                    onChangeText={handleChangeMonthlyCap}
                    Required={true}
                    CustomErrorLine={"Enter proper cap value"}
                    isHidden={!monthlyCap}
                  />
                </span>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Item>Daily cap</Item>
                <SwitchItem>
                  <Switch
                    checked={dailyCap}
                    onChange={() => setDailyCap(!dailyCap)}
                    name="inputToggle"
                    color="secondary"
                  />
                </SwitchItem>
                <span style={{ width: "40%" }}>
                  <FormTextField
                    type="capvalue"
                    placeholder={"Enter cap"}
                    label={"Daily Cap"}
                    Value={dailyValue.value}
                    onChangeText={handleChangeDailyCap}
                    Required={true}
                    CustomErrorLine={"Enter proper cap value"}
                    isHidden={!dailyCap}
                  />
                </span>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Item>{"Hourly cap"}</Item>
                <SwitchItem>
                  <Switch
                    checked={hourlyCap}
                    onChange={() => setHourlyCap(!hourlyCap)}
                    name="inputToggle"
                    color="secondary"
                  />
                </SwitchItem>
                <span style={{ width: "40%" }}>
                  <FormTextField
                    type="capvalue"
                    placeholder={"Enter cap"}
                    label={"Hourly Cap"}
                    Value={hourlyValue.value}
                    onChangeText={handleChangeHourlyCap}
                    Required={true}
                    CustomErrorLine={"Enter proper cap value"}
                    isHidden={!hourlyCap}
                  />
                </span>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Item>Maximum Concurrency</Item>
                <SwitchItem>
                  <Switch
                    checked={maximumCap}
                    onChange={() => setMaximumCap(!maximumCap)}
                    name="inputToggle"
                    color="secondary"
                  />
                </SwitchItem>
                <span style={{ width: "40%" }}>
                  <FormTextField
                    type="capvalue"
                    placeholder={"Enter cap"}
                    label={"Maximum Concurrency"}
                    Value={maximunValue.value}
                    onChangeText={handleChangeMaximumCap}
                    Required={true}
                    CustomErrorLine={"Enter proper cap value"}
                    isHidden={!maximumCap}
                  />
                </span>
              </Stack>
            </Grid>
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
          onClick={(e) => handleClick(e)}
          sx={{ backgroundColor: colors.greenAccent[500] }}
          variant="contained"
        >
          {clickedBtn === "add" ? "Save" : "Update"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default TargetForm;
