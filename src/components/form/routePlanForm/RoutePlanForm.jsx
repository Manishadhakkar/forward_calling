import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Zoom,
  styled,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../assets/color/theme";
import { MdClose } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaCircle, FaMobileRetro } from "react-icons/fa6";
import { SiWebmoney } from "react-icons/si";
import { FcCallTransfer } from "react-icons/fc";
import {
  assignRouteTargetReq,
  getRouteMembersAndRemainsReq,
  removeRouteTargetReq,
  updateRouteTargetPriorityReq,
  updateRouteTargetWeightageReq,
} from "../../../pages/app/IvrRouting/service/routing.request";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../Loader/Loader";

const RoutePlanForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
    routeId,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: colors.primary[900],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    background: colors.grey[900],
    "&:nth-of-type(odd)": {
      background: `linear-gradient(to bottom, ${colors.tableRow[100]}, ${colors.tableRow[200]})`,
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

  const [isLoader, setIsLoader] = useState(false);
  const [timer, setTimer] = useState(0);

  const [allTargetData, setAllTargetData] = useState([]);
  const [allRouteData, setAllRouteData] = useState([]);


  const [searchTargetData, setSearchTargetData] = useState([]);
  const [targetSearchParams, setTargetSearchParams] = useState("");

  const [searchRouteTargetData, setSearchRouteTargetData] = useState([]);
  const [routeTargetParams, setRouteTargetParams] = useState("");

  const [message, setMessage] = useState(false);

  const [name, setName] = useState({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getRouteMembersAndRemainsReq(routeId);
        const targetList = res.data.data.AllTargets?.map((ele) => ({
          id: ele.id,
          name: ele.name,
          destination: ele.forwarding_number,
          type: ele.type,
          status: ele.status,
          weightage: null,
          priority: null,
        }));
        const assignTargetList = res.data.data.IvrRouteMember?.map((ele) => ({
          id: ele.id,
          name: ele.target.name,
          destination: ele.target.forwarding_number,
          type: ele.target.type,
          status: ele.target.status,
          weightage: ele.weightage,
          priority: ele.priority,
        }));
        setAllRouteData(
          assignTargetList !== undefined ? assignTargetList : []
        );
        setAllTargetData(targetList !== undefined ? targetList : []);
      } catch (err) {
      } finally {
      }
    })();
  }, [timer]);

  useEffect(() => {
    if (routeId !== null) {
      (async () => {
        try {
          setIsLoader(true);
          const res = await getRouteMembersAndRemainsReq(routeId);
          const targetList = res.data.data.AllTargets?.map((ele) => ({
            id: ele.id,
            name: ele.name,
            destination: ele.forwarding_number,
            type: ele.type,
            status: ele.status,
            weightage: null,
            priority: null,
          }));
          const assignTargetList = res.data.data.IvrRouteMember?.map((ele) => ({
            id: ele.id,
            name: ele.target.name,
            destination: ele.target.forwarding_number,
            type: ele.target.type,
            status: ele.target.status,
            weightage: ele.weightage,
            priority: ele.priority,
          }));
          setSearchRouteTargetData(
            assignTargetList !== undefined ? assignTargetList : []
          );
          setAllTargetData(targetList !== undefined ? targetList : []);
        } catch (err) {
          setIsLoader(false);
        } finally {
          setIsLoader(false);
        }
      })();
    }
  }, [routeId]);

  useEffect(() => {
    const filteredData = !targetSearchParams
      ? allTargetData
      : allTargetData?.filter((item) =>
          [item.name, item.destination]
            .map((str) => str.toLowerCase())
            .some((lowercased) =>
              lowercased.includes(targetSearchParams.toLowerCase())
            )
        );
    setSearchTargetData(filteredData);
  }, [targetSearchParams, allTargetData]);

  useEffect(() => {
    const filteredData = !routeTargetParams
      ? allRouteData
      : allRouteData?.filter((item) =>
          [item.name, item.destination]
            .map((str) => str.toLowerCase())
            .some((lowercased) =>
              lowercased.includes(routeTargetParams.toLowerCase())
            )
        );
    setSearchRouteTargetData(filteredData);
  }, [routeTargetParams, allRouteData]);

  const handleChangeName = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setName({ value: e.target.value });
  };

  const handleSearchTarget = (e) => {
    setTargetSearchParams(e.target.value);
  };

  const handleSearchRouteTarget = (e) => {
    setRouteTargetParams(e.target.value);
  };

  const handleSavePlanName = (e) => {
    e.preventDefault();
    const data = {
      type: "name",
      name: name.value,
    };
    handleFormData(data);
  };

  const handleClickCart = async (val) => {
    setIsLoader(true);
    try {
      const reqData = {
        route_id: routeId,
        target_id: val.id,
        weightage: 0,
        priority: 0,
      };
      const res = await assignRouteTargetReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoader(false);
    }
  };
  const handleClickRemove = async (val) => {
    try {
      setIsLoader(true);
      const res = await removeRouteTargetReq(val.id);
      setTimer((prevTimer) => prevTimer + 1);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoader(false);
    }
  };
  const handleDecrementPriority = async (row) => {
    if (row.priority === 0) {
      return;
    }
    try {
      const reqData = {
        id: row.id,
        data: {
          priority: parseInt(row.priority) - 1,
        },
      };
      setIsLoader(true);
      const res = await updateRouteTargetPriorityReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoader(false);
    }
  };
  const handleIncrementPriority = async (row) => {
    try {
      const reqData = {
        id: row.id,
        data: {
          priority: parseInt(row.priority) + 1,
        },
      };
      setIsLoader(true);
      const res = await updateRouteTargetPriorityReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoader(false);
    }
  };
  const handleChangePriority = async (e, row) => {
    if (e.target.value === "") {
      setSearchRouteTargetData((prevData) =>
        prevData.map((item) =>
          item.id === row.id
            ? { ...item, priority: parseInt(e.target.value) }
            : item
        )
      );
    } else {
      if (e.target.value !== row.priority) {
        setSearchRouteTargetData((prevData) =>
          prevData.map((item) =>
            item.id === row.id
              ? { ...item, priority: parseInt(e.target.value) }
              : item
          )
        );
        try {
          const reqData = {
            id: row.id,
            data: {
              priority: parseInt(e.target.value),
            },
          };
          setIsLoader(true);
          const res = await updateRouteTargetPriorityReq(reqData);
          setTimer((prevTimer) => prevTimer + 1);
          setMessage(res.data.message);
        } catch (err) {
          setMessage(err.message);
        } finally {
          setIsLoader(false);
        }
      }
    }
  };
  const handleDecrementWeightage = async (row) => {
    if (row.weightage === 0) {
      return;
    }
    try {
      const reqData = {
        id: row.id,
        data: {
          weightage: parseInt(row.weightage) - 1,
        },
      };
      setIsLoader(true);
      const res = await updateRouteTargetWeightageReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoader(false);
    }
  };
  const handleIncrementWeightage = async (row) => {
    try {
      const reqData = {
        id: row.id,
        data: {
          weightage: parseInt(row.weightage) + 1,
        },
      };
      setIsLoader(true);
      const res = await updateRouteTargetWeightageReq(reqData);
      setTimer((prevTimer) => prevTimer + 1);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoader(false);
    }
  };
  const handleUpdateWeightage = async (e, row) => {
    if (e.target.value === "") {
      setSearchRouteTargetData((prevData) =>
        prevData.map((item) =>
          item.id === row.id
            ? { ...item, weightage: parseInt(e.target.value) }
            : item
        )
      );
    } else {
      if (e.target.value !== row.weightage) {
        setSearchRouteTargetData((prevData) =>
          prevData.map((item) =>
            item.id === row.id
              ? { ...item, weightage: parseInt(e.target.value) }
              : item
          )
        );
        try {
          const reqData = {
            id: row.id,
            data: {
              weightage: parseInt(e.target.value),
            },
          };
          setIsLoader(true);
          const res = await updateRouteTargetWeightageReq(reqData);
          setTimer((prevTimer) => prevTimer + 1);
          setMessage(res.data.message);
        } catch (err) {
          setMessage(err.message);
        } finally {
          setIsLoader(false);
        }
      }
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      <Card
        sx={{
          boxShadow: "none",
          backgroundColor: colors.form[500],
          color: colors.form[100],
        }}
        component="form"
      >
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={onHandleClose}>
              <MdClose color={colors.form[100]} />
            </IconButton>
          }
          title={
            clickedBtn === "add"
              ? "Add IVR Target Route"
              : "Update IVR Target Route"
          }
        />
        <CardContent color={colors.form[100]}>
          <Box
            sx={{
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
              <Grid item xs={8} md={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  label={"IVR name"}
                  placeholder={"Enter IVR name"}
                  type={"text"}
                  required={true}
                  value={name.value}
                  onChange={handleChangeName}
                  size="small"
                  sx={{
                    "&:hover": {
                      backgroundColor: "none !important",
                      border: "none",
                    },
                    "&:focused": {
                      backgroundColor: "none !important",
                      border: "none",
                    },
                    "& .MuiInputLabel-root": {
                      color:
                        theme.palette.mode === "dark"
                          ? "#FAF0E6 !important"
                          : "#352F44 !important",
                    },
                    "& .MuiOutlinedInput-input": {
                      backgroundColor: "none !important",
                      border: "none",
                    },
                    "& .MuiOutlinedInput-input :hover": {
                      backgroundColor: "none !important",
                      border: "none",
                    },
                    "& .css-1bbsw9i-MuiInputBase-root-MuiOutlinedInput-root": {
                      paddingRight: "0px",
                    },
                    display: "block",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: colors.greenAccent[500],
                            color: colors.grey[900],
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: colors.greenAccent[600],
                            },
                          }}
                          onClick={handleSavePlanName}
                        >
                          {clickedBtn === "add" ? "Save" : "Update"}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={0} md={6} />

              <Grid item md={5} sm={12}>
                <Stack direction={"column"} spacing={0.5}>
                  <Paper
                    sx={{
                      p: "2px 2px",
                      display: "flex",
                      alignItems: "center",
                      width: "50%",
                      border: `1px solid  ${colors.grey[700]}`,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search ..."
                      inputProps={{ "aria-label": "search..." }}
                      value={targetSearchParams}
                      onChange={handleSearchTarget}
                    />
                  </Paper>
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
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Type</StyledTableCell>
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
                                      <FaCircle size="15px" color="yellow" />
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
                          <TableRow
                            sx={{
                              background: `linear-gradient(to bottom, ${colors.tableRow[100]}, ${colors.tableRow[200]})`,
                            }}
                          >
                            <StyledTableCell
                              align="center"
                              colSpan={7}
                              rowSpan={4}
                            >
                              No records found
                            </StyledTableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Grid>
              <Grid item md={7} sm={12}>
                <Stack direction={"column"} spacing={0.5}>
                  <Paper
                    sx={{
                      p: "2px 2px",
                      display: "flex",
                      alignItems: "center",
                      width: "50%",
                      border: `1px solid  ${colors.grey[700]}`,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search ..."
                      inputProps={{ "aria-label": "search..." }}
                      value={routeTargetParams}
                      onChange={handleSearchRouteTarget}
                    />
                  </Paper>
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
                      aria-label="Campaign target table"
                      stickyHeader
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell align="center">Type</StyledTableCell>
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
                        {searchRouteTargetData.length > 0 ? (
                          searchRouteTargetData.map((row) => (
                            <StyledTableRow key={row.id}>
                              <StyledTableCell align="center">
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
                                  <IconButton
                                    sx={{
                                      display: "flex",
                                      bgcolor: "#1C2025",
                                      color: colors.grey[100],
                                      width: "20px",
                                      height: "20px",
                                      border: `1px solid #303740`,
                                      flexFlow: "row",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() => handleDecrementPriority(row)}
                                    disabled={row.priority === 0 && true}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>
                                  <StyledInput
                                    value={row.priority}
                                    onChange={(e) =>
                                      handleChangePriority(e, row)
                                    }
                                    type="number"
                                    min={0}
                                    max={999}
                                  />
                                  <IconButton
                                    sx={{
                                      display: "flex",
                                      bgcolor: "#1C2025",
                                      color: colors.grey[100],
                                      width: "20px",
                                      height: "20px",
                                      border: `1px solid #303740`,
                                      flexFlow: "row",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() => handleIncrementPriority(row)}
                                  >
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <IconButton
                                    sx={{
                                      display: "flex",
                                      bgcolor: "#1C2025",
                                      color: colors.grey[100],
                                      width: "20px",
                                      height: "20px",
                                      border: `1px solid #303740`,
                                      flexFlow: "row",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() =>
                                      handleDecrementWeightage(row)
                                    }
                                    disabled={row.weightage === 0 && true}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>
                                  <StyledInput
                                    value={row.weightage}
                                    onChange={(e) =>
                                      handleUpdateWeightage(e, row)
                                    }
                                    min="0"
                                    type="number"
                                    onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
                                  />
                                  <IconButton
                                    sx={{
                                      display: "flex",
                                      bgcolor: "#1C2025",
                                      color: colors.grey[100],
                                      width: "20px",
                                      height: "20px",
                                      border: `1px solid #303740`,
                                      flexFlow: "row",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <AddIcon
                                      fontSize="small"
                                      onClick={() =>
                                        handleIncrementWeightage(row)
                                      }
                                    />
                                  </IconButton>
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
                                      <FaCircle size="15px" color="yellow" />
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
                          <TableRow
                            sx={{
                              background: `linear-gradient(to bottom, ${colors.tableRow[100]}, ${colors.tableRow[200]})`,
                            }}
                          >
                            <StyledTableCell align="center" colSpan={7}>
                              No records found
                            </StyledTableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default RoutePlanForm;
