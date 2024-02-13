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
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { tokens } from "../../../assets/color/theme";
import "../styles.css";
import { getAllActiveMedia } from "../../../pages/app/ivrManage/service/ivr.request";

const authTypeList = [
  {
    value: 1,
    label: "Single key authentication",
  },
  {
    value: 2,
    label: "Two key authentication",
  },
  {
    value: 3,
    label: "Any random key authentication",
  },
  {
    value: 4,
    label: "4 digit mobile number",
  },
];

const IvrForm = (props) => {
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

  const [authType, setAuthType] = useState({
    value: initialValue ? initialValue.input_auth_type : "",
    error: false,
    success: false,
  });
  const [name, setName] = useState({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });
  const [description, setDescription] = useState({
    value: initialValue ? initialValue.description : "",
    error: false,
    success: false,
  });
  const [ivrId, setIvrId] = useState({
    value: initialValue ? initialValue.ivr_media_id : "",
    error: false,
    success: false,
  });
  const [timeOut, setTimeout] = useState({
    value: initialValue ? initialValue.timeout : "",
    error: false,
    success: false,
  });
  const [ivr_option, setivr_option] = useState([]);

  const handleChangeAuthType = (value) => {
    setErrorMessage("");
    setAuthType(value);
  };
  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };
  const handleChangeDescription = (value) => {
    setErrorMessage("");
    setDescription(value);
  };
  const handleChangeIvr = (value) => {
    setErrorMessage("");
    setIvrId(value);
  };
  const handleChangeTimeout = (value) => {
    setErrorMessage("");
    setTimeout(value);
  };

  useEffect(() => {
    getAllActiveMedia()
      .then((res) => {
        const filterData = res.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.name,
          };
        });
        setivr_option(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      input_auth_type: authType.value,
      name: name.value,
      description: description.value,
      ivr_media_id: ivrId.value,
      timeout: timeOut.value,
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
        title={clickedBtn === "add" ? "Add Ivr" : "Update Ivr"}
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
            <Grid item xs={12} md={6}>
              <FormTextDropdown
                Value={ivrId.value}
                onSelect={handleChangeIvr}
                label={"Select Media *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={ivr_option}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormTextField
                type="alpha"
                placeholder={"Enter Ivr Name"}
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
                Value={authType.value}
                onSelect={handleChangeAuthType}
                label={"Auth Type *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={authTypeList}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormTextField
                type="number"
                placeholder={"Enter connection time out"}
                label={"Connection timeout"}
                Value={timeOut.value}
                onChangeText={handleChangeTimeout}
                Required={false}
                CustomErrorLine={"Enter proper number"}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", mr: 1, ml: 1 }}>
        <Button size="small" variant="contained" onClick={onHandleClose}
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
        >
          {clickedBtn === "add" ? "Save" : "Update"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default IvrForm;
