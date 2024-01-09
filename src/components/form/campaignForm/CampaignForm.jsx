import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputLabel,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import SwitchCall from "../../chip/SwichCall";
import {
  getAllActiveNumber
} from "../../../pages/app/campaign/service/campaign.request";
import Loader from "../../Loader/Loader";
import "./styles.css";
import NumberDropdown from "../../dropdown/SearchableDropdown";

const CampaignForm = (props) => {
  const {
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const format_list = [
    { id: 1, label: "(###) #### ### ###", value: "(###) #### ### ###" },
    { id: 2, label: "(##) ### ### ####", value: "(##) ### ### ####" },
  ];

  const [isLoader, setIsLoader] = useState(false);

  const [name, setName] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [description, setDescription] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [timeout, setTimeout] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [tfnList, setTFNList] = useState([]);
  const [tfnNo, setTFNNo] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [numberFormat, setNumberFormat] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getAllActiveNumber()
      .then((res) => {
        setIsLoader(false);
        const result = res?.data?.data?.map((ele) => {
          return {
            value: ele.id,
            label: ele.did_number,
          };
        });
        const tfn_data = result === undefined ? [] : result;
        setTFNList(tfn_data);
      })
      .catch(() => {
        setIsLoader(false);
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
  const handleChangeTimeout = (value) => {
    setErrorMessage("");
    setTimeout(value);
  };
  const handleChangeTFN = (value) => {
    setErrorMessage("");
    setTFNNo(value);
  };
  const handleChangeRecord = (value) => {
    setErrorMessage("");
    setIsRecording(value);
  };

  const handleChangeFormat = (value) => {
    setErrorMessage("");
    setNumberFormat(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const did_value = tfnList?.find((no) => no.label == tfnNo.value);
    const data = {
      name: name.value,
      description: description.value,
      did_number_format: numberFormat.value,

      did_number_id: did_value?.value,
      connection_timeout: timeout.value,
      recording: isRecording === true ? 1 : 0,
    };
    handleFormData(data);
  };

  return (
    <>
      {isLoader && <Loader />}
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
          title={clickedBtn === "add" ? "Add Campaign" : "Update Campaign"}
        />
        {errorMessage && <span className="error_msg">{errorMessage}</span>}
        <CardContent
          color={colors.form[100]}
          className="contentResponsiveHeight"
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormTextField
                type="alpha"
                placeholder={"Enter Campaign Name"}
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
                Value={numberFormat.value}
                onSelect={handleChangeFormat}
                placeholder={"Select one"}
                label={"Number Format"}
                CustomErrorLine={"Choose one"}
                multiSelect={false}
                Required={false}
                disable={false}
                Options={format_list}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <NumberDropdown
                format_type={numberFormat.value}
                Value={tfnNo.value}
                Options={tfnList}
                onSelect={handleChangeTFN}
                label={"TFN Number"}
                CustomErrorLine={"Choose one"}
                Required={false}
                disable={false}
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
            <Grid item xs={6} md={3}>
              <InputLabel
                id="demo-select-small-label"
                sx={{ color: colors.btn[100], marginTop: 3 }}
              >
                Call recording
              </InputLabel>
            </Grid>
            <Grid item xs={6} md={3}>
              <SwitchCall
                isChecked={isRecording}
                handleSwitch={handleChangeRecord}
                style={{ marginTop: "20px" }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", mr: 2, ml: 1 }}>
          <Button size="small" variant="contained" onClick={onHandleClose}>
            {"Cancel"}
          </Button>
          <Button
            type="submit"
            size="small"
            onClick={(e) => handleSubmitForm(e)}
            sx={{ backgroundColor: colors.greenAccent[500] }}
            variant="contained"
          >
            {clickedBtn === "add" ? "Save" : "Update"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CampaignForm;
