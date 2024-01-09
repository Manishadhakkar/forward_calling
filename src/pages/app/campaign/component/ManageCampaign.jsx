import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Typography,
  Snackbar,
  IconButton,
  InputLabel,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
  Button,
  InputBase,
  Tooltip,
  Zoom,
  CardActions,
  Alert,
} from "@mui/material";
import { TbAssembly, TbBrandCampaignmonitor, TbHome2 } from "react-icons/tb";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import { MdDeleteForever, MdExpandMore } from "react-icons/md";
import { FcCallTransfer } from "react-icons/fc";
import {
  getAllActiveNumber,
  getAllTargetReq,
  getCampaignByIdRequest,
  updateCampaignRequest,
} from "../service/campaign.request";
import Loader from "../../../../components/Loader/Loader";
import { PiCopySimpleThin } from "react-icons/pi";
import FormTextDropdown from "../../../../components/dropdown/FormTextDropdown";
import FormTextField from "../../../../components/textfield/FormTextField";
import NumberDropdown from "../../../../components/dropdown/SearchableDropdown";
import SwitchCall from "../../../../components/chip/SwichCall";
import { useLocation, useNavigate } from "react-router-dom";
import { SiWebmoney } from "react-icons/si";
import { FaMobileRetro } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import "./styles.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.75rem;
  font-family: inherit;
  font-weight: 200;
  line-height: 0.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 8px;
  margin: 0 5px;
  padding: 5px 6px;
  outline: 0;
  min-width: 0;
  width: 2.5rem;
  text-align: center;
  &:hover {
    border-color: ${blue[400]};
  }
  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.5rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 25px;
  height: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Campaign",
    icon: <TbBrandCampaignmonitor />,
    path: "campaigns",
  },
  {
    name: "Update Campaign",
    icon: <TbAssembly />,
  },
];

const UpdateCampaign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = useState("panel1");
  const [message, setMessage] = useState("");

  const [searchTargetData, setSearchTargetData] = useState([]);
  const [searchCampaignData, setSearchCampaignData] = useState([]);

  const [searchTargetParams, setSearchTargetParams] = useState("");
  const [searchCampaignParams, setSearchCampaignParams] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const [initialValue, setInitValue] = useState({});

  const campaign_id = location?.state?.campaign_id;

  const format_list = [
    { id: 1, label: "(###) #### ### ###", value: "(###) #### ### ###" },
    { id: 2, label: "(##) ### ### ####", value: "(##) ### ### ####" },
  ];
  const calls_types = [
    { id: 1, label: "Same target", value: "Same target" },
    { id: 2, label: "Different target", value: "Different target" },
    { id: 3, label: "Random", value: "Random" },
  ];

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");

  const [openClip, setOpenClip] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [randomId, setRandomId] = useState({
    value: "",
  });

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

  const [callsType, setCallsType] = useState({
    value: null,
    error: false,
    success: false,
  });

  const [numberFormat, setNumberFormat] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [isRecording, setIsRecording] = useState(false);

  const [isStrict, setIsStrict] = useState(false);
  const [isDuplicatesCalls, setIsDuplicatesCalls] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isSilent, setIsSilent] = useState(false);
  const [dialAttempt, setDialAttempt] = useState(null);

  const [targetList, setTargetList] = useState([]);
  const [campaignTarget, setCampaignTarget] = useState([]);

  const { vertical, horizontal, open } = snackbarOpen;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (!searchTargetParams) {
      setSearchTargetData(targetList);
    }
    const filteredData = targetList?.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTargetParams.toLowerCase()) ||
        item.destination
          .toLowerCase()
          .includes(searchTargetParams.toLowerCase())
      );
    });
    setSearchTargetData(filteredData);
  }, [searchTargetParams, targetList]);

  useEffect(() => {
    if (!searchCampaignParams) {
      setSearchCampaignData(campaignTarget);
    }
    const filteredData = campaignTarget?.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchCampaignParams.toLowerCase()) ||
        item.destination
          .toLowerCase()
          .includes(searchCampaignParams.toLowerCase())
      );
    });
    setSearchCampaignData(filteredData);
  }, [searchCampaignParams, campaignTarget]);

  const handleChangeSearch = (e) => {
    setSearchTargetParams(e.target.value);
  };
  const handleChangeCampaignSearch = (e) => {
    setSearchCampaignParams(e.target.value);
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
        setTFNList(result);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }, []);

  const handleChangeName = (value) => {
    setName(value);
  };
  const handleChangeDescription = (value) => {
    setDescription(value);
  };
  const handleChangeTimeout = (value) => {
    setTimeout(value);
  };
  const handleChangeTFN = (value) => {
    setTFNNo(value);
  };
  const handleChangeStrict = (value) => {
    setIsStrict(value);
  };
  const handleChangeRecord = (value) => {
    console.log(isRecording, value);
    setIsRecording(value);
  };
  const handleChangeDuplicateCalls = (value) => {
    setIsDuplicatesCalls(value);
  };
  const handleChangeWaitCall = (value) => {
    setIsWaiting(value);
  };
  const handleChangeSilentCall = (value) => {
    setIsSilent(value);
  };
  const handleChangeCallsType = (value) => {
    setCallsType(value);
  };
  const handleChangeFormat = (value) => {
    setNumberFormat(value);
  };

  useEffect(() => {
    if (campaign_id) {
      getCampaignByIdRequest(campaign_id)
        .then((res) => {
          setInitValue(res.data.data[0]);
          setRandomId({ value: res.data.data[0]?.campaign_random_id });
          setName({ value: res.data.data[0]?.name });
          setDescription({ value: res.data.data[0]?.description });
          setNumberFormat({ value: res.data.data[0]?.did_number_format });
          setTimeout({ value: res.data.data[0]?.connection_timeout });
          setTFNNo({
            value: res.data.data[0]?.number?.did_number,
          });
          setIsRecording(res.data.data[0].recording !== 1 ? false : true);

          setCallsType({
            value: res.data?.data[0]?.route_previously_connected_calls,
          });
          setIsStrict(res.data.data[0]?.strict !== 1 ? false : true);
          setIsDuplicatesCalls(
            res.data.data[0]?.anonymous_duplicate_call !== 1 ? false : true
          );
          setIsWaiting(res.data.data[0]?.call_waiting !== 1 ? false : true);
          setIsSilent(res.data.data[0]?.trim_silence !== 1 ? false : true);
          setDialAttempt(res.data.data[0]?.dial_attempt_target);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [campaign_id]);

  useEffect(() => {
    if (initialValue) {
      getAllTargetReq()
        .then((res) => {
          const result_data = res.data?.data?.map((ele) => ({
            id: ele.id,
            name: ele.name,
            destination: ele.forwarding_number,
            type: ele.type,
            status: ele.status,
            weightage: null,
            priority: null,
          }));
          setTargetList(result_data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [initialValue]);
  // const user = JSON.parse(localStorage.getItem("user"));
  // let headers = {
  //   "Content-Type": "application/json",
  // };
  // headers["Authorization"] = `Bearer ${user.token}`;
  // axios
  //   .get(
  //     "http://139.84.169.123/portalforwarding/backend/public/api/target/active",
  //     {
  //       timeout: 7000, // Set a timeout of  seconds
  //       headers,
  //     }
  //   )
  //   .then((response) => {
  //     console.log(response.data.data);
  //     const result_data = response?.data?.data?.map((ele) => ({
  //       id: ele.id,
  //       name: ele.name,
  //       destination: ele.forwarding_number,
  //       type: ele.type,
  //       status: ele.status,
  //       weightage: null,
  //       priority: null,
  //     }));
  //     setTargetList(result_data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const handleClick = () => {
    setOpenClip(true);
    navigator.clipboard.writeText(randomId.value);
  };

  const handleClickCart = (val) => {
    const filter_target_list = targetList?.filter((ele) => ele.id !== val.id);
    setTargetList(filter_target_list);
    setCampaignTarget([...campaignTarget, val]);
  };

  const handleClickRemove = (val) => {
    const filter_campaign_targets = campaignTarget?.filter(
      (ele) => ele.id !== val.id
    );
    setTargetList([...targetList, val]);
    setCampaignTarget(filter_campaign_targets);
  };

  const handleChangePriority = (e, id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, priority: parseInt(e.target.value) } : item
      )
    );
  };

  const handleDecrementPriority = (id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, priority: parseInt(item.priority) - 1 }
          : item
      )
    );
  };

  const handleIncrementPriority = (id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, priority: parseInt(item.priority) + 1 }
          : item
      )
    );
  };

  const handleDecrementWeightage = (id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, weightage: parseInt(item.weightage) - 1 }
          : item
      )
    );
  };

  const handleIncrementWeightage = (id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, weightage: parseInt(item.weightage) + 1 }
          : item
      )
    );
  };

  const handleChangeWeightage = (e, id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, weightage: parseInt(e.target.value) } : item
      )
    );
  };

  const handleChangeAttempt = (e) => {
    e.preventDefault();
    setDialAttempt(e.target.value);
  };

  const handleDecrementAttempt = (e) => {
    e.preventDefault();
    setDialAttempt((prevValue) => prevValue - 1);
  };

  const handleInrementAttempt = (e) => {
    e.preventDefault();
    setDialAttempt((prevValue) => prevValue + 1);
  };

  const handleUpdateCampaign = (e) => {
    e.preventDefault();
    const did_value = tfnList?.find((no) => no.label == tfnNo.value);
    const data = {
      data: {
        name: name.value,
        description: description.value,
        did_number_format: numberFormat.value,
        did_number_id: did_value?.value,
        connection_timeout: timeout.value?.toString(),
        recording: isRecording === true ? 1 : 0,
        route_previously_connected_calls: callsType.value,
        strict:
          callsType.value !== "Same target" ? (isStrict === true ? 1 : 0) : 0,
        anonymous_duplicate_call: isDuplicatesCalls === true ? 1 : 0,
        call_waiting: isRecording === true ? (isWaiting === true ? 1 : 0) : 0,
        trim_silence: isRecording === true ? (isSilent === true ? 1 : 0) : 0,
        dial_attempt_target: dialAttempt,
      },
      id: initialValue.id,
    };
    setIsLoader(true);
    updateCampaignRequest(data)
      .then((res) => {
        setIsLoader(false);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
      })
      .catch((err) => {
        setIsLoader(false);
        setErrorMessage(err.message);
      });
  };

  return (
    <>
      {isLoader && <Loader />}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={barVariant}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          "& .rs-pagination-group": {
            color: colors.layoutColor[200],
          },
          "& .MuiTypography-root": {
            color: colors.layoutColor[200],
          },
          mt: 1,
          ml: 2,
          mr: 2,
          mb: 2,
          height: "80%",
          backgroundColor: "inherit",
        }}
      >
        <Breadcrumb pathList={paths} />
        <Box
          sx={{
            mt: 1,
          }}
        >
          <Box>
            <Typography variant="h5">{"Update Campaigns"}</Typography>
          </Box>

          <Box
            component="div"
            pt={1}
            pb={1}
            sx={{
              "&css-1pttoqb-MuiPaper-root-MuiCard-root": {
                backgroundColor: "inherit",
                backgroundImage: "none",
              },
            }}
          >
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5">{"Campaign Info"}</Typography>
              </AccordionSummary>
              <Divider />

              <AccordionDetails>
                <Grid container spacing={1}>
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
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            autoHideDuration={2000}
                            onClose={() => setOpenClip(false)}
                            open={openClip}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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
                      label={"Number Format" + " *"}
                      CustomErrorLine={"Choose one"}
                      multiSelect={false}
                      Required={true}
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
                  <Grid item xs={12} md={6}>
                    <FormTextDropdown
                      Value={callsType.value}
                      onSelect={handleChangeCallsType}
                      placeholder={"Select one"}
                      label={"Send duplicate calls to" + " *"}
                      CustomErrorLine={"Choose one"}
                      multiSelect={false}
                      Required={true}
                      disable={false}
                      Options={calls_types}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ color: colors.btn[100], marginTop: 1 }}
                    >
                      Call Recording
                    </InputLabel>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <SwitchCall
                      isChecked={isRecording}
                      handleSwitch={handleChangeRecord}
                    />
                  </Grid>
                  {callsType.value !== "Same target" && (
                    <>
                      <Grid item xs={6} md={3}>
                        <InputLabel
                          id="demo-select-small-label"
                          sx={{ color: colors.btn[100], marginTop: 1 }}
                        >
                          Strict Mode
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <SwitchCall
                          isChecked={isStrict}
                          handleSwitch={handleChangeStrict}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={6} md={3}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ color: colors.btn[100], marginTop: 1 }}
                    >
                      Handle Anonymous Calls as Duplicate
                    </InputLabel>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <SwitchCall
                      isChecked={isDuplicatesCalls}
                      handleSwitch={handleChangeDuplicateCalls}
                    />
                  </Grid>

                  {isRecording === true && (
                    <>
                      <Grid item xs={6} md={3}>
                        <InputLabel
                          id="demo-select-small-label"
                          sx={{ color: colors.btn[100], marginTop: 1 }}
                        >
                          Call Waiting
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <SwitchCall
                          isChecked={isWaiting}
                          handleSwitch={handleChangeWaitCall}
                        />
                      </Grid>
                    </>
                  )}
                  {isRecording === true && (
                    <>
                      <Grid item xs={6} md={3}>
                        <InputLabel
                          id="demo-select-small-label"
                          sx={{ color: colors.btn[100], marginTop: 1 }}
                        >
                          Call Silent
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <SwitchCall
                          isChecked={isSilent}
                          handleSwitch={handleChangeSilentCall}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={6} md={3}>
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ color: colors.btn[100], marginTop: 1 }}
                    >
                      Target Dial Attempts
                    </InputLabel>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <StyledButton
                        onClick={(e) => {
                          handleDecrementAttempt(e);
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </StyledButton>
                      <StyledInput
                        value={dialAttempt}
                        onChange={(e) => handleChangeAttempt(e)}
                        type="number"
                        min="0"
                        max={999}
                        onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
                      />
                      <StyledButton
                        onClick={(e) => {
                          handleInrementAttempt(e);
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </StyledButton>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 1.5,
                }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  onClick={() => navigate("/campaigns")}
                >
                  {"Cancel"}
                </Button>
                <Button
                  size="medium"
                  type="submit"
                  onClick={(e) => {
                    handleUpdateCampaign(e);
                  }}
                  sx={{ backgroundColor: colors.greenAccent[500] }}
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">{"Call Routing"}</Typography>
                <Divider />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item md={5} sm={12}>
                    <div>
                      <div>
                        <Paper
                          component="form"
                          sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: "50%",
                            border: `1px solid  ${colors.blueAccent[700]}`,
                          }}
                        >
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search ..."
                            inputProps={{ "aria-label": "search..." }}
                            value={searchTargetParams}
                            onChange={handleChangeSearch}
                          />
                        </Paper>
                      </div>
                      <div>
                        <TableContainer
                          sx={{
                            width: "100%",
                            bgcolor: colors.blueAccent[900],
                            maxHeight: 400,
                          }}
                        >
                          <Table
                            size={"small"}
                            sx={{ width: "100%" }}
                            aria-label="Target table"
                            stickyHeader
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell align="center">
                                  Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Type
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Destination
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Status
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Action
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {searchTargetData.length > 0 ? (
                                searchTargetData.map((row) => (
                                  <StyledTableRow key={row.id}>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        placement="right-start"
                                        TransitionComponent={Zoom}
                                        arrow
                                        title={row.name}
                                      >
                                        <span>{row.name}</span>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        TransitionComponent={Zoom}
                                        title={row.type}
                                        arrow
                                        placement="right-start"
                                      >
                                        <IconButton
                                          aria-label="add"
                                          size="small"
                                          disableRipple
                                          sx={{ cursor: "default" }}
                                        >
                                          {row.type === "Number" ? (
                                            <FaMobileRetro size="18px" />
                                          ) : (
                                            <SiWebmoney size="18px" />
                                          )}
                                        </IconButton>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        TransitionComponent={Zoom}
                                        title={row.destination}
                                        arrow
                                        placement="right-start"
                                      >
                                        <span>{row.destination}</span>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        title={
                                          row.status === 1
                                            ? "Live"
                                            : row.status === 2
                                            ? "Pause"
                                            : "Inactive"
                                        }
                                        arrow
                                        placement="right-start"
                                        TransitionComponent={Zoom}
                                      >
                                        <IconButton
                                          aria-label="add"
                                          size="small"
                                          disableRipple
                                          sx={{ cursor: "default" }}
                                        >
                                          {row.status === 1 ? (
                                            <FaCircle
                                              size="15px"
                                              color={colors.green[100]}
                                            />
                                          ) : row.status === 2 ? (
                                            <FaCircle
                                              size="15px"
                                              color="yellow"
                                            />
                                          ) : (
                                            <FaCircle size="15px" color="red" />
                                          )}
                                        </IconButton>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        placement="right-start"
                                        TransitionComponent={Zoom}
                                        arrow
                                        title="Add"
                                      >
                                        <IconButton
                                          aria-label="add"
                                          size="18px"
                                          onClick={(e) => handleClickCart(row)}
                                        >
                                          <FcCallTransfer
                                            color={colors.greenAccent[300]}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <StyledTableCell>
                                    No records found
                                  </StyledTableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={7} sm={12}>
                    <div>
                      <div>
                        <Paper
                          component="form"
                          sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: "50%",
                            border: `1px solid  ${colors.blueAccent[700]}`,
                          }}
                        >
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search ..."
                            inputProps={{ "aria-label": "search..." }}
                            value={searchCampaignParams}
                            onChange={handleChangeCampaignSearch}
                          />
                        </Paper>
                      </div>
                      <div>
                        <TableContainer
                          sx={{
                            width: "100%",
                            maxHeight: 400,
                            bgcolor: colors.blueAccent[900],
                          }}
                        >
                          <Table
                            size={"small"}
                            sx={{ width: "100%" }}
                            aria-label="Campaign target table"
                            stickyHeader
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">
                                  Type
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Destination
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Priority
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Weightage
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Status
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Action
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {searchCampaignData.length > 0 ? (
                                searchCampaignData.map((row) => (
                                  <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                      <Tooltip
                                        placement="right-start"
                                        TransitionComponent={Zoom}
                                        arrow
                                        title={row.name}
                                      >
                                        <span> {row.name}</span>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        TransitionComponent={Zoom}
                                        title={row.type}
                                        arrow
                                        placement="right-start"
                                      >
                                        <IconButton
                                          aria-label="add"
                                          size="small"
                                          disableRipple
                                          sx={{ cursor: "default" }}
                                        >
                                          {row.type === "Number" ? (
                                            <FaMobileRetro size="18px" />
                                          ) : (
                                            <SiWebmoney size="18px" />
                                          )}
                                        </IconButton>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        TransitionComponent={Zoom}
                                        title={row.destination}
                                      >
                                        <span> {row.destination}</span>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <StyledButton
                                          onClick={() =>
                                            handleDecrementPriority(row.id)
                                          }
                                        >
                                          <RemoveIcon fontSize="small" />
                                        </StyledButton>
                                        <StyledInput
                                          value={row.priority}
                                          onChange={(e) =>
                                            handleChangePriority(e, row.id)
                                          }
                                          type="number"
                                          min={0}
                                          max={999}
                                        />
                                        <StyledButton
                                          onClick={() =>
                                            handleIncrementPriority(row.id)
                                          }
                                        >
                                          <AddIcon fontSize="small" />
                                        </StyledButton>
                                      </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <StyledButton
                                          onClick={() =>
                                            handleDecrementWeightage(row.id)
                                          }
                                        >
                                          <RemoveIcon fontSize="small" />
                                        </StyledButton>
                                        <StyledInput
                                          value={row.weightage}
                                          onChange={(e) =>
                                            handleChangeWeightage(e, row.id)
                                          }
                                          min="0"
                                          type="number"
                                          onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
                                        />
                                        <StyledButton
                                          onClick={() =>
                                            handleIncrementWeightage(row.id)
                                          }
                                        >
                                          <AddIcon fontSize="small" />
                                        </StyledButton>
                                      </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        title={
                                          row.status === 1
                                            ? "Live"
                                            : row.status === 2
                                            ? "Pause"
                                            : "Inactive"
                                        }
                                        arrow
                                        placement="right-start"
                                        TransitionComponent={Zoom}
                                      >
                                        <IconButton
                                          aria-label="add"
                                          size="small"
                                          disableRipple
                                          sx={{ cursor: "default" }}
                                        >
                                          {row.status === 1 ? (
                                            <FaCircle
                                              size="15px"
                                              color={colors.green[100]}
                                            />
                                          ) : row.status === 2 ? (
                                            <FaCircle
                                              size="15px"
                                              color="yellow"
                                            />
                                          ) : (
                                            <FaCircle size="15px" color="red" />
                                          )}
                                        </IconButton>
                                      </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Tooltip
                                        placement="right-start"
                                        TransitionComponent={Zoom}
                                        title="Delete"
                                      >
                                        <IconButton
                                          aria-label="add"
                                          size="small"
                                          onClick={() => handleClickRemove(row)}
                                        >
                                          <MdDeleteForever
                                            fontSize="inherit"
                                            color={colors.redAccent[400]}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <StyledTableCell>
                                    No records found
                                  </StyledTableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <CardActions sx={{ justifyContent: "space-between", m: 1 }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => navigate("/campaigns")}
              >
                {"Cancel"}
              </Button>
              <Button
                size="small"
                type="submit"
                onClick={() => {}}
                sx={{ backgroundColor: colors.greenAccent[500] }}
                variant="contained"
              >
                Update
              </Button>
            </CardActions>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateCampaign;
