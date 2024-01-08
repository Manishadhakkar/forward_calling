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

  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState({
    value: initialValue ? initialValue.company_id : "",
    error: false,
    success: false,
  });
  const [groupList, setGroupList] = useState([]);
  const [groupId, setGroupId] = useState({
    value: initialValue ? initialValue.group_id : "",
    error: false,
    success: false,
  });
  const [number, setNumber] = useState({
    value: initialValue ? initialValue.rule_number : "",
    error: false,
    success: false,
  });
  const handleChangeCompany = (value) => {
    setErrorMessage("");
    setCompanyId(value);
  };
  const handleChangeNum = (value) => {
    setErrorMessage("");
    setNumber(value);
  };
  const handleChangeGroup = (value) => {
    setErrorMessage("");
    setGroupId(value);
  };

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
      .catch(() => { });
  }, []);

  useEffect(() => {
    getAllGroupsRequest(companyId.value)
      .then((res) => {
        console.log(res.data.data)
        const result = res.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.group_name,
          };
        });
        setGroupList(result);
      })
      .catch(() => { });
  }, [companyId]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !groupId.value ||
      (company_id === "0" && !companyId.value) ||
      !number.value
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    const data = {
      group_id: groupId.value,
      rule_number: number.value,
      company_id: company_id === "0" ? companyId.value : company_id,
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
        title={clickedBtn === "add" ? "Add Group" : "Update Group"}
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
            {company_id === "0" && (
              <Grid item xs={12} md={12}>
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
            <Grid item xs={12} md={12}>
              <FormTextDropdown
                Value={groupId.value}
                onSelect={handleChangeGroup}
                label={"Group *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={groupList}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormTextField
                type="num"
                placeholder={"Enter Number"}
                label={"Number Name"}
                Value={number.value}
                onChangeText={handleChangeNum}
                Required={true}
                CustomErrorLine={"Enter proper number"}
              />
            </Grid>

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
