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
import { tokens } from "../../../assets/color/theme";
import "../styles.css";

const ServerIpForm = (props) => {
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

  const [ip, setIp] = useState({
    value: initialValue ? initialValue.ip_name : "",
    error: false,
    success: false,
  });
  const [name, setName] = useState({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });
  const [prefix, setPrefix] = useState({
    value: initialValue ? initialValue.prefix : "",
    error: false,
    success: false,
  });

  let disable =
    ip.error ||
    ip.value === "" ||
    ip.success === false ||
    name.error ||
    name.value === "" ||
    name.success === false ||
    prefix.error;

  const handleChangeIp = (value) => {
    setErrorMessage("");
    setIp(value);
  };
  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };
  const handleChangePrefix = (value) => {
    setErrorMessage("");
    setPrefix(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!ip.value || !name.value) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    const data = {
      ip_name: ip.value,
      name: name.value,
      prefix: prefix.value,
    };
    handleFormData(data);
  };

  return (
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
          title={clickedBtn === "add" ? "Add Server Ip" : "Update Server Ip"}
        />
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
        <CardContent color={colors.form[100]}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <FormTextField
                type="alpha"
                placeholder={"Enter Server Name"}
                label={"Server Name"}
                Value={name.value}
                onChangeText={handleChangeName}
                Required={true}
                CustomErrorLine={"Enter proper name"}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextField
                type="textarea"
                isMultiline={false}
                placeholder={"Enter Server Ip"}
                label={"Server Ip"}
                Value={ip.value}
                onChangeText={handleChangeIp}
                Required={true}
                CustomErrorLine={"Enter proper server ip"}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextField
                type="textarea"
                isMultiline={false}
                placeholder={"Enter prefix"}
                label={"Prefix"}
                Value={prefix.value}
                onChangeText={handleChangePrefix}
                Required={false}
                CustomErrorLine={"Enter proper prefix"}
              />
            </Grid>
          </Grid>
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
            type="submit"
            size="small"
            onClick={(e) => handleClick(e)}
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
    </Box>
  );
};

export default ServerIpForm;
