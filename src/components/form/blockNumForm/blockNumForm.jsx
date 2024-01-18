import React, { useState, useEffect } from "react";
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
import { getAllCompanyRequest } from "../../../pages/auth/users/service/users.request";
import "../styles.css";
import { getAllGroupsRequest } from "../../../pages/app/blockNumber/service/blocknumber.request";

const BlockNumForm = (props) => {
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

  const subjectList = [
    {
      label: "Prefix",
      value: "prefix",
    },
    {
      label: "Phone",
      value: "phonenumber",
    },
  ];
  const [subjectId, setSubjectId] = useState({
    value: initialValue ? initialValue?.subject : "prefix",
    error: false,
    success: false,
  });
  const [number, setNumber] = useState({
    value: initialValue ? initialValue.digits : "",
    error: false,
    success: false,
  });
  const [transferNumber, setTransferNumber] = useState({
    value: initialValue ? initialValue?.transfer_number : "",
    error: false,
    success: false,
  });

  const ruleTypeList = [
    {
      label: "Transfer",
      value: "transfer",
    },
    {
      label: "Block",
      value: "block",
    },
  ];
  const [ruleId, setRuleId] = useState({
    value: initialValue ? initialValue?.ruletype : "transfer",
    error: false,
    success: false,
  });

  const blockTypeList = [
    {
      label: "Busy",
      value: "busy",
    },
    {
      label: "Congestion",
      value: "congestion",
    },
    {
      label: "Hang-up",
      value: "hangup",
    },
  ];

  const [blockId, setBlockId] = useState({
    value: initialValue ? initialValue?.blocktype : "busy",
    error: false,
    success: false,
  });

  const handleChangeSubject = (value) => {
    setErrorMessage("");
    setSubjectId(value);
  };
  const handleChangeNum = (value) => {
    setErrorMessage("");
    setNumber(value);
  };
  const handleChangeTransferNum = (value) => {
    setErrorMessage("");
    setTransferNumber(value);
  };
  const handleChangerule = (value) => {
    setErrorMessage("");
    setRuleId(value);
  };
  const handleChangeBlock = (value) => {
    setErrorMessage("");
    setBlockId(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!subjectId.value || !number.value || !ruleId.value) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    const data = {
      digits: number.value,
      subject: subjectId.value,
      ruletype: ruleId.value,
      transfer_number:
        ruleId.value === "transfer" ? transferNumber.value : null,
      blocktype: ruleId.value === "block" ? blockId.value : null,
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
        title={
          clickedBtn === "add" ? "Add Block Number" : "Update Block Number"
        }
      />
      {errorMessage && <span className="error_msg">{errorMessage}</span>}
      <CardContent color={colors.form[100]}>
        <Box
          sx={{
            "& .MuiTextField-root": { mb: 1 },
          }}
          className={"formResponsiveHeight"}
          noValidate={true}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <FormTextDropdown
                Value={subjectId.value}
                onSelect={handleChangeSubject}
                label={"Subject *"}
                CustomErrorLine={"Select one"}
                Required={true}
                Options={subjectList}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextField
                type="num"
                placeholder={
                  subjectId.value === "prefix" ? "Enter prefix" : "Enter number"
                }
                label={
                  subjectId.value === "prefix" ? "Enter prefix" : "Enter number"
                }
                Value={number.value}
                onChangeText={handleChangeNum}
                Required={true}
                CustomErrorLine={"Enter proper number"}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormTextDropdown
                Value={ruleId.value}
                onSelect={handleChangerule}
                label={"Rule type *"}
                CustomErrorLine={"Select one"}
                Required={true}
                Options={ruleTypeList}
              />
            </Grid>
            {ruleId.value === "transfer" && (
              <Grid item xs={12} md={12}>
                <FormTextField
                  type="num"
                  placeholder={"Enter transfer number"}
                  label={"Transfer number"}
                  Value={transferNumber.value}
                  onChangeText={handleChangeTransferNum}
                  Required={true}
                  CustomErrorLine={"Enter proper number"}
                />
              </Grid>
            )}
            {ruleId.value === "block" && (
              <Grid item xs={12} md={12}>
                <FormTextDropdown
                  Value={blockId.value}
                  onSelect={handleChangeBlock}
                  label={"Block type *"}
                  CustomErrorLine={"Select one"}
                  Required={true}
                  Options={blockTypeList}
                />
              </Grid>
            )}
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
        >
          {clickedBtn === "add" ? "Save" : "Update"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlockNumForm;
