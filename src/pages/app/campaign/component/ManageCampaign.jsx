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
  Fab,
  Stack,
} from "@mui/material";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import {
  MdAdd,
  MdDeleteForever,
  MdEdit,
  MdExpandMore,
  MdRemove,
  MdSave,
  MdUpdate,
} from "react-icons/md";
import { FcCallTransfer } from "react-icons/fc";
import {
  assignCampaignTargetReq,
  createIvrReq,
  getAllActiveNumber,
  getAllIvrListReq,
  getAllIvrReq,
  getAllTargetReq,
  getCampaignByIdRequest,
  getCompanyTargetAndRemainsReq,
  removeCampaignTargetReq,
  removeIvrReq,
  setCampaignIvrReq,
  updateCampaignRequest,
  updateIvrReq,
  updateTargetPriorityReq,
  updateTargetWeightageReq,
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Add } from "iconsax-react";
import CustomTabPanel, {
  a11yProps,
} from "../../../../components/customPanel/CustomTabPanel";
import {
  calls_types,
  desinationTypeList,
  format_list,
  paths,
} from "../container/CustomFunction";
import { Table as IVRTable } from "rsuite";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import { convertIvrArray } from "../../../../utility/utilty";
import AssignIvrForm from "../../../../components/form/campaignForm/AssignIvr";

const { Column, HeaderCell, Cell } = IVRTable;

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
  color: ${theme.palette.mode === "dark" ? "#C7D0DD" : "#1C2025"};
  background: ${theme.palette.mode === "dark" ? "#1C2025" : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? "#434D5B" : "#DAE2ED"};
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
    border-color: "#3399ff";
  }
  &:focus {
    border-color: "#3399ff";
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? "#0059B2" : "#b6daff"
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
  border-color: ${theme.palette.mode === "dark" ? "#303740" : "#DAE2ED"};
  background: ${theme.palette.mode === "dark" ? "#1C2025" : "#F3F6F9"};
  color: ${theme.palette.mode === "dark" ? "#DAE2ED" : "#1C2025"};
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
    background: ${theme.palette.mode === "dark" ? "#0059B2" : "#007fff"};
    border-color: ${theme.palette.mode === "dark" ? "#007fff" : "#3399ff"};
    color: F3F6F9;
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const ActionCell = ({
  rowData,
  dataKey,
  onClickEdit,
  onClickAdd,
  onClickDelete,
  style,
  ...props
}) => {
  return (
    <Cell {...props} style={style}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
        width={"100%"}
      >
        {rowData.destination_type === "Ivr" && (
          <Fab
            aria-label="add"
            size="small"
            sx={{
              boxShadow: "none",
              backgroundColor: "#0f2922",
              color: "white",
            }}
            onClick={() => {
              onClickAdd(rowData.id);
            }}
          >
            <Tooltip arrow placement="top" title={"Add"}>
              <MdAdd />
            </Tooltip>
          </Fab>
        )}
        <Fab
          aria-label="add"
          size="small"
          sx={{
            boxShadow: "none",
            backgroundColor: "#6870fa",
            color: "white",
          }}
          onClick={() => {
            onClickEdit(rowData.id);
          }}
        >
          <Tooltip arrow placement="top" title={"Edit"}>
            <MdEdit />
          </Tooltip>
        </Fab>
        <Fab
          aria-label="add"
          size="small"
          sx={{
            boxShadow: "none",
            backgroundColor: "#af3f3b",
            color: "white",
          }}
          onClick={() => {
            onClickDelete(rowData.id);
          }}
        >
          <Tooltip arrow placement="top" title={"Delete"}>
            <MdDeleteForever />
          </Tooltip>
        </Fab>
      </Stack>
    </Cell>
  );
};

const UpdateCampaign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = useState("panel1");
  const [message, setMessage] = useState("");

  const [timer, setTimer] = useState(0);

  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const [searchTargetData, setSearchTargetData] = useState([]);
  const [searchCampaignData, setSearchCampaignData] = useState([]);
  const [ivrList, setIvrList] = useState([]);
  const [searchTargetParams, setSearchTargetParams] = useState("");
  const [searchCampaignParams, setSearchCampaignParams] = useState("");
  const [initialValue, setInitValue] = useState({});
  const [ivrRawData, setIvrRawData] = useState([]);
  const [ivrRow, setIvrRow] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState();
  const [ivtBtnType, setBtnType] = useState(1);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const campaign_id = location?.state?.campaign_id;

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
  const [ivrTargets, setIvrTargets] = useState([]);
  const [targetList, setTargetList] = useState([]);
  const [campaignTarget, setCampaignTarget] = useState([]);
  const [campaignIvr, setCampaignIvr] = useState({
    value: "",
    error: false,
    success: false,
  });
  const is_Ivr_disable =
    campaignIvr.value === "" || initialValue.ivr_id == campaignIvr.value;

  const { vertical, horizontal, open } = snackbarOpen;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    if (panel === "panel2" && initialValue.did_number_id === null) {
      setBarVariant("info");
      setMessage("Please select Tfn number first");
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } else {
      setExpanded(isExpanded ? panel : false);
    }
  };

  useEffect(() => {
    const filteredData = !searchTargetParams
      ? targetList
      : targetList?.filter((item) =>
          [item.name, item.destination]
            .map((str) => str.toLowerCase())
            .some((lowercased) =>
              lowercased.includes(searchTargetParams.toLowerCase())
            )
        );
    setSearchTargetData(filteredData);
  }, [searchTargetParams, targetList]);

  useEffect(() => {
    const filterData = !searchCampaignParams
      ? campaignTarget
      : campaignTarget?.filter((item) =>
          [item.name, item.destination]
            .map((str) => str.toLowerCase())
            .some((lowercased) =>
              lowercased.includes(searchCampaignParams.toLowerCase())
            )
        );
    setSearchCampaignData(filterData);
  }, [searchCampaignParams, campaignTarget]);

  useEffect(() => {
    if (expanded === "panel2") {
      // setIsLoader(true);
      getAllTargetReq()
        .then((res) => {
          const result = res.data?.data?.map((ele) => {
            return {
              value: ele.id,
              label: ele.name,
            };
          });
          setIsLoader(false);
          setIvrTargets(result);
        })
        .catch((err) => {
          setIsLoader(false);
        });
    }
  }, [expanded, tabValue]);

  useEffect(() => {
    if (expanded === "panel2" && tabValue === 1) {
      // setIsLoader(true);
      getAllIvrListReq()
        .then((res) => {
          const result = res.data?.data?.map((ele) => {
            return {
              value: ele.id,
              label: ele.name,
            };
          });
          setIsLoader(false);
          setIvrList(result);
        })
        .catch(() => {
          setIsLoader(false);
        });
    }
  }, [expanded, tabValue]);

  const getIvrRows = async () => {
    try {
      // setIsLoader(true);
      const res = await getAllIvrReq(campaign_id);
      setIsLoader(false);
      const data =
        res.data.data.length > 0 ? convertIvrArray(res.data.data) : [];
      setIvrRow(data);
      setIvrRawData(res.data.data);
    } catch (error) {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (expanded === "panel2" && tabValue === 1) {
      getIvrRows();
    }
  }, [expanded, tabValue]);

  const handleChangeSearch = (e) => {
    setSearchTargetParams(e.target.value);
  };
  const handleChangeCampaignSearch = (e) => {
    setSearchCampaignParams(e.target.value);
  };
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
    if (expanded === "panel1") {
      (async () => {
        try {
          // setIsLoader(true);
          const res = await getAllActiveNumber();
          const result = res?.data?.data?.map((ele) => ({
            value: ele.id,
            label: ele.did_number,
          }));
          setTFNList(result);
        } catch (err) {
          setBarVariant("error");
          setMessage(err.message);
          setSnackbarOpen((prev) => ({ ...prev, open: true }));
        } finally {
          setIsLoader(false);
        }
      })();
    }
  }, [expanded]);
  const getCampaignData = async (campaign_id) => {
    if (expanded === "panel1") {
      setIsLoader(true);
      try {
        const res = await getCampaignByIdRequest(campaign_id);
        const data = res.data.data[0];
        setInitValue(data);
        setTabValue(data.ivr_id === null ? 0 : 1);
        setRandomId({ value: data?.campaign_random_id });
        setName({ value: data?.name });
        setDescription({ value: data?.description });
        setNumberFormat({ value: data?.did_number_format });
        setTimeout({ value: data?.connection_timeout });
        setTFNNo({ value: data?.number?.did_number });
        setIsRecording(data.recording !== 1 ? false : true);
        setCallsType({ value: data?.route_previously_connected_calls });
        setIsStrict(data.strict !== 1 ? false : true);
        setIsDuplicatesCalls(
          data.anonymous_duplicate_call !== 1 ? false : true
        );
        setIsWaiting(data.call_waiting !== 1 ? false : true);
        setIsSilent(data.trim_silence);
        setDialAttempt(data.dial_attempt_target);
        setCampaignIvr({ value: data?.ivr_id, success: true });
      } catch (error) {
        setIsLoader(false);
      } finally {
        setIsLoader(false);
      }
    }
  };
  useEffect(() => {
    if (campaign_id) {
      getCampaignData(campaign_id);
    }
  }, [campaign_id]);
  useEffect(() => {
    if (expanded === "panel2") {
      (async () => {
        try {
          setIsLoader(true);
          const res = await getCompanyTargetAndRemainsReq(campaign_id);
          const targetList = res.data.data.AllTargets?.map((ele) => ({
            id: ele.id,
            name: ele.name,
            destination: ele.forwarding_number,
            type: ele.type,
            status: ele.status,
            weightage: null,
            priority: null,
          }));
          const assignTargetList = res.data.data.CampaignMember?.map((ele) => ({
            id: ele.id,
            name: ele.target.name,
            destination: ele.target.forwarding_number,
            type: ele.target.type,
            status: ele.target.status,
            weightage: ele.weightage,
            priority: ele.priority,
          }));
          setCampaignTarget(
            assignTargetList !== undefined ? assignTargetList : []
          );
          setTargetList(targetList !== undefined ? targetList : []);
        } catch (err) {
          setIsLoader(false);
        } finally {
          setIsLoader(false);
        }
      })();
    }
  }, [expanded, timer]);
  const handleClick = () => {
    setOpenClip(true);
    navigator.clipboard.writeText(randomId.value);
  };
  const handleChangePriority = (e, id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, priority: parseInt(e.target.value) } : item
      )
    );
  };
  const handleUpdatePriority = async (e, row) => {
    if (e.target.value !== row.priority) {
      try {
        // setIsLoader(true);
        const reqData = {
          id: row.id,
          data: {
            priority: parseInt(e.target.value),
          },
        };
        const res = await updateTargetPriorityReq(reqData);
        setTimer((prevTimer) => prevTimer + 1);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
      } catch (err) {
        setBarVariant("error");
        setMessage(err.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
      } finally {
        setIsLoader(false);
      }
    }
  };
  const handleDecrementPriority = async (row) => {
    if (row.priority === 0) {
      return;
    }
    try {
      // setIsLoader(true);
      const reqData = {
        id: row.id,
        data: {
          priority: parseInt(row.priority) - 1,
        },
      };
      const res = await updateTargetPriorityReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };
  const handleIncrementPriority = async (row) => {
    try {
      // setIsLoader(true);
      const reqData = {
        id: row.id,
        data: {
          priority: parseInt(row.priority) + 1,
        },
      };
      const res = await updateTargetPriorityReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };
  const handleDecrementWeightage = async (row) => {
    if (row.weightage === 0) {
      return;
    }
    try {
      // setIsLoader(true);
      const reqData = {
        id: row.id,
        data: {
          weightage: parseInt(row.weightage) - 1,
        },
      };
      const res = await updateTargetWeightageReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };
  const handleIncrementWeightage = async (row) => {
    try {
      // setIsLoader(true);
      const reqData = {
        id: row.id,
        data: {
          weightage: parseInt(row.weightage) + 1,
        },
      };
      const res = await updateTargetWeightageReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };
  const handleChangeWeightage = (e, id) => {
    setCampaignTarget((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, weightage: parseInt(e.target.value) } : item
      )
    );
  };
  const handleUpdateWeightage = async (e, row) => {
    if (e.target.value !== row.weightage) {
      try {
        // setIsLoader(true);
        const reqData = {
          id: row.id,
          data: {
            weightage: parseInt(e.target.value),
          },
        };
        const res = await updateTargetWeightageReq(reqData);
        setTimer((prevTimer) => prevTimer + 1);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
      } catch (err) {
        setBarVariant("error");
        setMessage(err.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
      } finally {
        setIsLoader(false);
      }
    }
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
  const handleChangeSelectIvr = (value) => {
    setCampaignIvr(value);
  };
  const handleUpdateCampaign = async (e) => {
    e.preventDefault();
    const did_value = tfnList.find((ele) => ele.label == tfnNo.value);
    const data = {
      data: {
        name: name.value,
        description: description.value,
        did_number_format: numberFormat.value,
        did_number_id: did_value?.value,
        connection_timeout: timeout.value?.toString(),
        recording: isRecording ? 1 : 0,
        route_previously_connected_calls: callsType.value,
        strict: callsType.value !== "Same target" ? (isStrict ? 1 : 0) : 0,
        anonymous_duplicate_call: isDuplicatesCalls ? 1 : 0,
        call_waiting: isRecording ? (isWaiting ? 1 : 0) : 0,
        trim_silence: isRecording ? (isSilent ? 1 : 0) : 0,
        dial_attempt_target: dialAttempt,
      },
      id: initialValue.id,
    };

    try {
      // setIsLoader(true);
      const res = await updateCampaignRequest(data);
      getCampaignData(campaign_id);
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setIsLoader(false);
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };
  const handleClickCart = async (val) => {
    // setIsLoader(true);
    try {
      const reqData = {
        campaign_id: campaign_id,
        target_id: val.id,
        weightage: 0,
        priority: 0,
      };
      const res = await assignCampaignTargetReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };
  const handleClickRemove = async (val) => {
    try {
      // setIsLoader(true);
      const res = await removeCampaignTargetReq(val.id);
      setTimer((prevTimer) => prevTimer + 1);
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setIsLoader(false);
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };
  useEffect(() => {
    if (expanded === "panel2" && tabValue === 0) {
      const myFunction = async () => {
        try {
          // setIsLoader(true);
          const res = await getCompanyTargetAndRemainsReq(campaign_id);
          const targetList = res.data.data.AllTargets?.map((ele) => ({
            id: ele.id,
            name: ele.name,
            destination: ele.forwarding_number,
            type: ele.type,
            status: ele.status,
            weightage: null,
            priority: null,
          }));
          const assignTargetList = res.data.data.CampaignMember?.map((ele) => ({
            id: ele.id,
            name: ele.target.name,
            destination: ele.target.forwarding_number,
            type: ele.target.type,
            status: ele.target.status,
            weightage: ele.weightage,
            priority: ele.priority,
          }));
          setCampaignTarget(
            assignTargetList !== undefined ? assignTargetList : []
          );
          setTargetList(targetList !== undefined ? targetList : []);
        } catch (err) {
          setIsLoader(false);
        } finally {
          setIsLoader(false);
        }
      };
      const intervalId = setInterval(myFunction, 8000);
      return () => clearInterval(intervalId);
    }
  }, [expanded, tabValue]);
  // const handleChangeDigits = (data, id) => {
  //   const addDigits = ivrRow?.map((item, index) => {
  //     if (index + 1 === id) {
  //       return { ...item, input_digits: data };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setIvrRow(addDigits);
  // };
  // const handleChangeDestinationType = (data, id) => {
  //   const addDestination = ivrRow?.map((item, index) => {
  //     if (index + 1 === id) {
  //       return { ...item, destination: data };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setIvrRow(addDestination);
  // };
  // const handleChangeRemainsIvr = (data, id) => {
  //   const result = ivrRow?.map((item, index) => {
  //     if (index + 1 === id) {
  //       return { ...item, destination_id: data };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setIvrRow(result);
  // };
  const handleClickSaveSelectIvr = async (event) => {
    event.preventDefault();
    // setIsLoader(true);
    try {
      const reqData = {
        ivr_id: campaignIvr.value,
        campaign_id: campaign_id,
      };
      const res = await setCampaignIvrReq(reqData);
      getCampaignData(campaign_id);
      getIvrRows();
      setBarVariant("success");
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };

  const selectModal = () => {
    return (
      <AssignIvrForm
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        handleFormData={
          clickedBtn === "add" ? handleAddAssignIvr : handleUpdateAssignIvr
        }
        desinationTypeList={desinationTypeList}
        ivrList={ivrList}
        ivrTargets={ivrTargets}
      />
    );
  };

  const handleAddIvrOpt = (id) => {
    const filterData = ivrRawData.find((ele) => ele.id === id);
    setClickedBtn("add");
    setCurrentType(filterData);
    setIsOpen(true);
    setBtnType(2);
  };

  const handleEditIvrOpt = (id) => {
    const filterData = ivrRawData.find((ele) => ele.id === id);
    setClickedBtn("edit");
    setCurrentType(filterData);
    setIsOpen(true);
  };

  const handleAddAssignIvr = async (value) => {
    // setIsLoader(true);
    try {
      const reqData = {
        campaign_id: campaign_id,
        input_digit: value.input_digit,
        destination_type: value.destination_type,
        destination_id: value.destination_id,
        parent_id: ivtBtnType === 1 ? 0 : currentType.id,
        ivr_id: ivtBtnType === 1 ? campaignIvr.value : currentType?.ivr_id,
      };
      const res = await createIvrReq(reqData);
      setIsOpen(false);
      setBarVariant("success");
      getIvrRows();
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
      setCurrentType({});
    }
  };

  const handleUpdateAssignIvr = async (value) => {
    // setIsLoader(true);
    try {
      const reqData = {
        id: currentType.id,
        data: {
          campaign_id: campaign_id,
          ivr_id: currentType?.ivr_id,
          input_digit: value.input_digit,
          destination_type: value.destination_type,
          destination_id: value.destination_id,
          parent_id: currentType.parent_id,
        },
      };
      const res = await updateIvrReq(reqData);
      setIsOpen(false);
      setBarVariant("success");
      getIvrRows();
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
      setCurrentType({});
    }
  };

  const handleDeleteIvrOpt = async (id) => {
    // setIsLoader(true);
    try {
      const res = await removeIvrReq(id);
      setIsOpen(false);
      setBarVariant("success");
      getIvrRows();
      setMessage(res.data.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      <Modal modal_width={"50%"} isOpen={isOpen}>
        {selectModal()}
      </Modal>
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
                      CustomErrorLine={"Enter proper number"}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormTextDropdown
                      Value={callsType.value}
                      onSelect={handleChangeCallsType}
                      placeholder={"Select one"}
                      label={"Send duplicate calls to"}
                      CustomErrorLine={"Choose one"}
                      multiSelect={false}
                      Required={false}
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
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabValue} onChange={handleChangeTab}>
                      <Tab
                        sx={{
                          "&.Mui-selected": {
                            color: colors.greenAccent[900],
                            backgroundColor: colors.primary[100],
                            fontWeight: 400,
                          },
                          backgroundColor: colors.primary[700],
                          textTransform: "none",
                        }}
                        label="Set Target"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{
                          "&.Mui-selected": {
                            color: colors.greenAccent[900],
                            backgroundColor: colors.primary[100],
                            fontWeight: 400,
                          },
                          backgroundColor: colors.primary[700],
                          textTransform: "none",
                        }}
                        label="Set Ivr"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={tabValue} index={0}>
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
                                                <FaCircle
                                                  size="15px"
                                                  color="red"
                                                />
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
                                              onClick={(e) =>
                                                handleClickCart(row)
                                              }
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
                                      <StyledTableCell
                                        align="center"
                                        colSpan={7}
                                      >
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
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
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
                                                handleDecrementPriority(row)
                                              }
                                            >
                                              <RemoveIcon fontSize="small" />
                                            </StyledButton>
                                            <StyledInput
                                              value={row.priority}
                                              onChange={(e) =>
                                                handleChangePriority(e, row.id)
                                              }
                                              onBlur={(e) => {
                                                handleUpdatePriority(e, row);
                                              }}
                                              type="number"
                                              min={0}
                                              max={999}
                                            />
                                            <StyledButton
                                              onClick={() =>
                                                handleIncrementPriority(row)
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
                                                handleDecrementWeightage(row)
                                              }
                                            >
                                              <RemoveIcon fontSize="small" />
                                            </StyledButton>
                                            <StyledInput
                                              value={row.weightage}
                                              onChange={(e) =>
                                                handleChangeWeightage(e, row.id)
                                              }
                                              onBlur={(e) => {
                                                handleUpdateWeightage(e, row);
                                              }}
                                              min="0"
                                              type="number"
                                              onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
                                            />
                                            <StyledButton
                                              onClick={() =>
                                                handleIncrementWeightage(row)
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
                                                <FaCircle
                                                  size="15px"
                                                  color="red"
                                                />
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
                                              onClick={() =>
                                                handleClickRemove(row)
                                              }
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
                                      <StyledTableCell
                                        align="center"
                                        colSpan={7}
                                      >
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
                  </CustomTabPanel>
                  <CustomTabPanel value={tabValue} index={1}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      mb={1}
                    >
                      <Grid container spacing={1} className="GridIvrContainer">
                        <Grid item xs={12} md={12}>
                          <FormTextDropdown
                            Value={campaignIvr.value}
                            onSelect={handleChangeSelectIvr}
                            label={"Choose Ivr*"}
                            CustomErrorLine={"Choose one"}
                            Required={true}
                            Options={ivrList}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Stack
                            alignContent={"center"}
                            alignItems={"flex-end"}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              sx={{
                                backgroundColor: colors.greenAccent[600],
                                width: "30%",
                                textDecoration: "none",
                              }}
                              onClick={handleClickSaveSelectIvr}
                              disabled={is_Ivr_disable}
                            >
                              {initialValue?.ivr_id !== "" ? "Save" : "Update"}
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                          mb: 1,
                        }}
                      >
                        <div>
                          <Typography variant="subtitle1">
                            Ivr Options
                          </Typography>
                        </div>
                        <div>
                          <Fab
                            aria-label="add"
                            size="small"
                            sx={{
                              boxShadow: "none",
                              backgroundColor: colors.greenAccent[500],
                            }}
                            onClick={() => {
                              setClickedBtn("add");
                              setBtnType(1);
                              setIsOpen(true);
                            }}
                          >
                            <Tooltip title="Add">
                              <Add />
                            </Tooltip>
                          </Fab>
                        </div>
                      </Box>
                      <Box>
                        <IVRTable
                          isTree
                          defaultExpandAllRows
                          rowKey="id"
                          height={350}
                          data={ivrRow}
                          shouldUpdateScroll={false}
                          renderTreeToggle={(icon, rowData) => {
                            if (
                              rowData.children &&
                              rowData.children.length === 0
                            ) {
                              return;
                            }
                            return icon;
                          }}
                          style={{
                            borderRadius: "10px",
                            overflow: "hidden",
                            color: colors.layoutColor[200],
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "#0c101b"
                                : "#a1a4ab",
                            borderBottom: "none",
                          }}
                        >
                          <Column width={250}>
                            <HeaderCell
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor: colors.primary[400],
                                textAlign: "center",
                              }}
                            >
                              Digits
                            </HeaderCell>
                            <Cell
                              dataKey="input_digit"
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "#0c101b"
                                    : "#a1a4ab",
                                textAlign: "center",
                              }}
                            />
                          </Column>
                          <Column width={250}>
                            <HeaderCell
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor: colors.primary[400],
                                textAlign: "center",
                              }}
                            >
                              Destination Type
                            </HeaderCell>
                            <Cell
                              dataKey="destination_type"
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "#0c101b"
                                    : "#a1a4ab",
                                textAlign: "center",
                              }}
                            />
                          </Column>
                          <Column flexGrow={1}>
                            <HeaderCell
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor: colors.primary[400],
                                textAlign: "center",
                                borderBottom: "none",
                              }}
                            >
                              Destination
                            </HeaderCell>
                            <Cell
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "#0c101b"
                                    : "#a1a4ab",
                                textAlign: "center",
                              }}
                              dataKey="destination_name"
                            />
                          </Column>
                          <Column flexGrow={1}>
                            <HeaderCell
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor: colors.primary[400],
                                textAlign: "center",
                              }}
                            >
                              Action
                            </HeaderCell>
                            <ActionCell
                              style={{
                                color: colors.layoutColor[200],
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "#0c101b"
                                    : "#a1a4ab",
                                display: "flex",
                              }}
                              dataKey="id"
                              onClickEdit={handleEditIvrOpt}
                              onClickAdd={handleAddIvrOpt}
                              onClickDelete={handleDeleteIvrOpt}
                            />
                          </Column>
                        </IVRTable>
                      </Box>
                    </Box>
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default UpdateCampaign;
