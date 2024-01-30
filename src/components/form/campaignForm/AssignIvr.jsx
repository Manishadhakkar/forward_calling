import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { tokens } from "../../../assets/color/theme";
import "../styles.css";
import FormTextField from "../../textfield/FormTextField";
import FormTextDropdown from "../../dropdown/FormTextDropdown";

const AssignIvrForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    desinationTypeList,
    ivrList,
    ivrTargets,
  } = props;
  console.log(initialValue);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [input_digit, setInput_digit] = useState({
    value: initialValue ? initialValue.input_digit : "",
    error: false,
    success: false,
  });

  const [destination_type, setDestination_type] = useState({
    value: initialValue ? initialValue.destination_type : "",
    error: false,
    success: false,
  });

  const [destination_id, setDestination_id] = useState({
    value: initialValue ? initialValue.destination_id : "",
    error: false,
    success: false,
  });

  const handleChangeDigits = (value) => {
    setInput_digit(value);
  };

  const handleChangeDestinationType = (value) => {
    setDestination_type(value);
  };

  const handleChangeRemainsIvr = (value) => {
    setDestination_id(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      input_digit: input_digit.value,
      destination_type: destination_type.value,
      destination_id: destination_id.value,
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
        title={clickedBtn === "add" ? "Add Assign Ivr" : "Update Assign Ivr"}
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
          <Grid container spacing={1}>
            <Grid item xs={6} md={4}>
              <FormTextField
                type="number"
                placeholder={"Enter digit"}
                label={"Digit"}
                Value={input_digit.value}
                onChangeText={handleChangeDigits}
                Required={true}
                CustomErrorLine={"Enter proper digits"}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormTextDropdown
                Value={destination_type.value}
                onSelect={handleChangeDestinationType}
                label={"Destination Type *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={desinationTypeList}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormTextDropdown
                Value={destination_id.value}
                onSelect={handleChangeRemainsIvr}
                label={
                  destination_type.value === "Ivr"
                    ? "Select Ivr *"
                    : "Select Target *"
                }
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={
                  destination_type.value === "Ivr" ? ivrList : ivrTargets
                }
              />
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

export default AssignIvrForm;
