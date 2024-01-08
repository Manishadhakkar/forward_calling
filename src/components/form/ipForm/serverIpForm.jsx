import React, { useEffect, useState } from "react";
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
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { getAllCompanyRequest } from "../../../pages/app/serverIp/service/serverIp.request";

const ServerIpForm = (props) => {
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

  let isValueNOTChanged =
    ip.value === initialValue.ip_name &&
    name.value === initialValue.name &&
    prefix.value === initialValue.prefix;

  let disable =
    ip.error ||
    ip.value === "" ||
    ip.success === false ||
    name.error ||
    name.value === "" ||
    name.success === false ||
    prefix.error;

  const handleChangeCompany = (value) => {
    setErrorMessage("");
    setCompanyId(value);
  };

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
      // company_id: company_id === "0" ? companyId.value : company_id,
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
            {/* {company_id === "0" && (
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
            )} */}
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
          <Button size="small" variant="contained" onClick={onHandleClose}>
            {"Cancel"}
          </Button>
          <Button
            type="submit"
            size="small"
            onClick={(e) => handleClick(e)}
            sx={{ backgroundColor: colors.greenAccent[500] }}
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
