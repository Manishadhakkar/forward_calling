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
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { PiCopySimpleThin } from "react-icons/pi";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import SwitchCall from "../../chip/SwichCall";
import {
  getAllActiveNumber,
  getAllTargetReq,
} from "../../../pages/app/campaign/service/campaign.request";
import SelectAllTransferList from "../../transfer/SelectAllTransferList";
import CustomTargetTbl from "../../tables/CampaignTargetTable";
import Loader from "../../Loader/Loader";
import { getAllCompanyRequest } from "../../../pages/auth/users/service/users.request";
import { compareArrays } from "../../../utility/utilty";
import "./styles.css";
import NumberDropdown from "../../dropdown/SearchableDropdown";

const CampaignForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
    targetColumn,
    company_id,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ivr_list = [
    { label: "IVR 1", value: "IVR 1" },
    { label: "IVR 2", value: "IVR 2" },
  ];

  const format_list = [
    { id: 1, label: "(###) #### ### ###", value: "(###) #### ### ###" },
    { id: 2, label: "(##) ### ### ####", value: "(##) ### ### ####" },
  ];
  const calls_types = [
    { id: 1, label: "Send target", value: 1 },
    { id: 2, label: "Different target", value: 2 },
    { id: 3, label: "Random", value: 3 },
  ];

  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState({
    value: initialValue ? initialValue.company_id : "",
    error: false,
    success: false,
  });
  const [isLoader, setIsLoader] = useState(false);
  const [randomId, setRandomId] = useState({
    value: initialValue ? initialValue.randomId : "",
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

  const [timeout, setTimeout] = useState({
    value: initialValue ? initialValue.timeout : "",
    error: false,
    success: false,
  });

  const [tfnList, setTFNList] = useState([]);
  const [tfnNo, setTFNNo] = useState({
    value: initialValue ? initialValue.number : "",
    error: false,
    success: false,
  });

  const [selectIvr, setSelectIvr] = useState({
    value: initialValue ? initialValue?.ivr?.id : "",
    error: false,
    success: false,
  });

  const [callsType, setCallsType] = useState({
    value: 1,
    error: false,
    success: false,
  });

  const [numberFormat, setNumberFormat] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [isRecording, setIsRecording] = useState(
    clickedBtn === "edit" ? initialValue.isRecording : false
  );
  const [targetList, setTargetList] = useState([]);
  const [campaignTarget, setCampaignTarget] = useState([]);
  const [open, setOpen] = useState(false);

  const [prevData, setPrevData] = useState([]);
  const [renderTimes, setRenderTimes] = useState(0);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(randomId.value);
  };

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
      .catch((err) => {
        setIsLoader(false);
      });
  }, []);

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

  useEffect(() => {
    clickedBtn === "edit" &&
      getAllTargetReq()
        .then((res) => {
          const fetchTargets = res?.data?.data?.data?.map((ele) => {
            return {
              id: parseInt(ele.id),
              name: ele.name,
            };
          });
          const newArr = fetchTargets?.map((item) => {
            const matchingItem = initialValue?.targets.find(
              (i) => i.id == item.id
            );
            return {
              id: item.id,
              name: item.name,
              weightage: matchingItem ? matchingItem.weightage : null,
              priority: matchingItem ? matchingItem.priorities : null,
            };
          });
          const filterIds = initialValue?.targets.map((ele) =>
            parseInt(ele.id)
          );
          const filteredArr = newArr.filter((item) =>
            filterIds.includes(item.id)
          );

          if (prevData.length === 0 && renderTimes === 0) {
            setPrevData(initialValue?.targets);
            const filterRemainsTarget = newArr.filter(
              (item) => !filterIds.includes(item.id)
            );
            setRenderTimes(1);
            setCampaignTarget(filteredArr === undefined ? [] : filteredArr);
            setTargetList(
              filterRemainsTarget === undefined ? [] : filterRemainsTarget
            );
          } else {
            const hasChanged = compareArrays(prevData, initialValue?.targets);
            if (hasChanged) {
              const filterRemainsTarget = newArr.filter(
                (item) => !filterIds.includes(item.id)
              );
              setCampaignTarget(filteredArr === undefined ? [] : filteredArr);

              setTargetList(
                filterRemainsTarget === undefined ? [] : filterRemainsTarget
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, [initialValue]);

  useEffect(() => {
    clickedBtn === "add" &&
      getAllTargetReq()
        .then((res) => {
          const fetchTargets = res?.data?.data?.data?.map((ele) => {
            return {
              id: ele.id,
              name: ele.name,
              weightage: ele.weightage,
              priorities: ele.priority,
              status: ele.status,
            };
          });
          setTargetList(fetchTargets === undefined ? [] : fetchTargets);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handleChangeCompany = (value) => {
    setErrorMessage("");
    setCompanyId(value);
  };
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
  const handleChangeIvr = (value) => {
    setErrorMessage("");
    setSelectIvr(value);
  };
  const handleChangeCallsType = (value) => {
    setCallsType(value);
  };
  const handleChangeFormat = (value) => {
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
          {/* {clickedBtn === "edit" && (
            <Grid container>
              <Grid item xs={4} md={2}>
                <Typography gutterBottom variant="body1" component="div">
                  Random ID
                </Typography>
              </Grid>
              <Grid item xs={8} md={4}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {randomId.value}
                      <IconButton size="small" onClick={handleClick}>
                        <PiCopySimpleThin />
                      </IconButton>
                      <Snackbar
                        message="Copied to clibboard"
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        autoHideDuration={2000}
                        onClose={() => setOpen(false)}
                        open={open}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={0} md={6}></Grid>
            </Grid>
          )} */}
          <Grid container spacing={1}>
            {/* {company_id === "0" && (
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
            )} */}
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
            {/* <Grid item xs={12} md={6}>
              <FormTextDropdown
                Value={callsType.value}
                onSelect={handleChangeCallsType}
                placeholder={"Select one"}
                label={"Route Previously Connected Calls"}
                CustomErrorLine={"Choose one"}
                multiSelect={false}
                Required={false}
                disable={false}
                Options={calls_types}
              />
            </Grid> */}

            {/* <Grid item xs={12} md={6}>
              <FormTextDropdown
                Value={selectIvr.value}
                onSelect={handleChangeIvr}
                placeholder={"Select one"}
                label={"IVR Name"}
                CustomErrorLine={"Choose one"}
                multiSelect={false}
                Required={false}
                disable={false}
                Options={ivr_list}
              />
            </Grid> */}
            {/* {company_id !== "0" && <Grid item xs={0} md={6}></Grid>} */}
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
            {/* <Grid item xs={0} md={6}></Grid> */}
            {/* {clickedBtn === "edit" && (
              <SelectAllTransferList
                targetList={targetList}
                setTargetList={setTargetList}
                campaignTarget={campaignTarget}
                setCampaignTarget={setCampaignTarget}
              />
            )}
            {clickedBtn === "edit" && (
              <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                <CustomTargetTbl
                  targetColumn={targetColumn}
                  data={campaignTarget}
                />
              </Grid>
            )} */}
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
