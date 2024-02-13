import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import FormTextField from "../../textfield/FormTextField";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { tokens } from "../../../assets/color/theme";
import { getActiveIpRequest } from "../../../pages/app/serverIp/service/serverIp.request";
import "../styles.css";

const CarriersForm = (props) => {
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

  const [server_list, setServer_list] = useState([]);
  const [name, setName] = useState({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });

  const [userName, setUserName] = useState({
    value: initialValue ? initialValue.user_name : "",
    error: false,
    success: false,
  });
  const [userPassword, setUserPassword] = useState({
    value: initialValue ? initialValue.user_password : "",
    error: false,
    success: false,
  });
  const [serverIp, setServerIp] = useState({
    value: initialValue ? initialValue?.serverip?.id : "",
    error: false,
    success: false,
  });
  const [type, setType] = useState(
    initialValue ? initialValue.carrier_type : "IP"
  );

  useEffect(() => {
    getActiveIpRequest()
      .then((res) => {
        const filterIp = res.data.data?.map((ele) => {
          return {
            label: ele.ip_name,
            value: ele.id,
          };
        });
        setServer_list(filterIp);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let disable =
    name.error ||
    name.value === "" ||
    name.success === false ||
    serverIp.error ||
    serverIp.value === "" ||
    serverIp.success === false;

  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };
  const handleChangeIp = (value) => {
    setErrorMessage("");
    setServerIp(value);
  };
  const handleChangeType = (event) => {
    setErrorMessage("");
    setType(event.target.value);
  };
  const handleChangePassword = (value) => {
    setErrorMessage("");
    setUserPassword(value);
  };
  const handleChangeUserName = (value) => {
    setErrorMessage("");
    setUserName(value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      name: name.value,
      carrier_type: type,
      ip_name: serverIp.value,
      user_name: userName.value,
      user_password: userPassword.value,
    };
    handleFormData(data);
  };

  return (
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
        title={clickedBtn === "add" ? "Add Carriers" : "Update Carriers"}
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
            <Grid item xs={12} md={12}>
              <FormTextField
                type="alpha"
                placeholder={"Enter Carriers Name"}
                label={"Name"}
                Value={name.value}
                onChangeText={handleChangeName}
                Required={true}
                CustomErrorLine={"Enter proper name"}
              />
            </Grid>
            {clickedBtn === "edit" && (
              <Grid item xs={12} md={12}>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  sx={{ ml: 1.5 }}
                  defaultValue={type}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleChangeType}
                >
                  <FormControlLabel
                    value={"IP"}
                    control={<Radio />}
                    label="Server"
                  />
                  <FormControlLabel
                    value={"USER"}
                    control={<Radio />}
                    label="User"
                  />
                </RadioGroup>
              </Grid>
            )}

            <Grid item xs={12} md={12}>
              <FormTextDropdown
                Value={serverIp.value}
                onSelect={handleChangeIp}
                label={"Server IP *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={server_list}
              />
            </Grid>
            {type == "USER" ? (
              <>
                <Grid item xs={12} md={12}>
                  <FormTextField
                    type="alpha"
                    placeholder={"Enter User Name"}
                    label={"User Name"}
                    Value={userName.value}
                    onChangeText={handleChangeUserName}
                    CustomErrorLine={"Enter proper username"}
                    Required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormTextField
                    type="password"
                    label={"User Password"}
                    placeholder={"Enter User Password"}
                    CustomErrorLine="Please enter a proper password"
                    value={userPassword.value}
                    onChangeText={handleChangePassword}
                    Required={true}
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", m: 1 }}>
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
          size="small"
          type="submit"
          onClick={(e) => handleSubmitForm(e)}
          sx={{
            textTransform: "none",
            backgroundColor: colors.greenAccent[700],
            ":hover": {
              backgroundColor: colors.greenAccent[800],
            },
          }}
          variant="contained"
          disabled={clickedBtn === "add" ? disable : false}
        >
          {clickedBtn === "add" ? "Save" : "Update"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CarriersForm;
