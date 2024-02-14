import React, { useState, useEffect } from "react";
import {
  CardActions,
  CardContent,
  Grid,
  useTheme,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Zoom,
  styled,
  tableCellClasses,
} from "@mui/material";
import { tokens } from "../../../assets/color/theme";
import "../styles.css";
import FormTextField from "../../textfield/FormTextField";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import {
  assignRouteTargetReq,
  getRouteMembersAndRemainsReq,
  removeRouteTargetReq,
  updateRouteTargetPriorityReq,
  updateRouteTargetWeightageReq,
} from "../../../pages/app/campaign/service/campaign.request";
import { MdClose } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaCircle, FaMobileRetro } from "react-icons/fa6";
import { SiWebmoney } from "react-icons/si";
import { FcCallTransfer } from "react-icons/fc";
import Loader from "../../Loader/Loader";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#080b12",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  background: "#141414",
  "&:nth-of-type(odd)": {
    background: `linear-gradient(to bottom, #2a1814, #1f191f)`,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AssignIvrForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    desinationTypeList,
    ivrList,
    ivrTargets,
    ivrRouteData,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const [timer, setTimer] = useState(0);

  const [allTargetData, setAllTargetData] = useState([]);
  const [allRouteData, setAllRouteData] = useState([]);

  const [searchTargetData, setSearchTargetData] = useState([]);
  const [targetSearchParams, setTargetSearchParams] = useState("");

  const [searchRouteTargetData, setSearchRouteTargetData] = useState([]);
  const [routeTargetParams, setRouteTargetParams] = useState("");

  const handleChangeDigits = (value) => {
    setInput_digit(value);
  };

  const handleChangeDestinationType = (value) => {
    setDestination_type(value);
    setDestination_id({ error: false, success: false, value: "" });
  };

  const handleChangeRemainsIvr = (value) => {
    setDestination_id(value);
  };

  useEffect(() => {
    if (destination_type.value === "Route" && destination_id.success === true) {
      const routeId = destination_id.value;
      setIsLoading(true);
      getRouteMembersAndRemainsReq(routeId)
        .then((res) => {
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
          setIsLoading(false);

          setAllRouteData(
            assignTargetList !== undefined ? assignTargetList : []
          );
          setAllTargetData(targetList !== undefined ? targetList : []);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [destination_type.value, destination_id.value, timer]);

  const handleSearchTarget = (e) => {
    setTargetSearchParams(e.target.value);
  };

  const handleSearchRouteTarget = (e) => {
    setRouteTargetParams(e.target.value);
  };

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

  const handleClickCart = (val) => {
    const routeId = destination_id.value;
    const reqData = {
      route_id: routeId,
      target_id: val.id,
      weightage: 0,
      priority: 0,
    };
    assignRouteTargetReq(reqData)
      .then((res) => {
        setTimer((prevTimer) => prevTimer + 1);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  const handleClickRemove = (val) => {
    removeRouteTargetReq(val.id)
      .then((res) => {
        setTimer((prevTimer) => prevTimer + 1);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.message);
      });
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
    <Box className={"formResponsiveHeight"}>
      {isLoading && <Loader />}
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
            noValidate={true}
          >
            <Grid container spacing={1}>
              <Grid item xs={6} md={4}>
                <FormTextField
                  type="ivrnumber"
                  placeholder={"Enter digit"}
                  label={"Digit"}
                  Value={input_digit.value}
                  onChangeText={handleChangeDigits}
                  Required={true}
                  CustomErrorLine={"Enter proper digits (0 - 9 * #)"}
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
                    destination_type.value === "Ivr"
                      ? ivrList
                      : destination_type.value === "Target"
                      ? ivrTargets
                      : ivrRouteData
                  }
                />
              </Grid>
              {destination_type.value === "Route" &&
                destination_id.success === true && (
                  <Grid item md={5} sm={12} mt={2}>
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
                )}
              {destination_type.value === "Route" &&
                destination_id.success === true && (
                  <Grid item md={7} sm={12} mt={2}>
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
                                    <Tooltip
                                      TransitionComponent={Zoom}
                                      title={row.priority}
                                    >
                                      <span> {row.priority}</span>
                                    </Tooltip>
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <Tooltip
                                      TransitionComponent={Zoom}
                                      title={row.weightage}
                                    >
                                      <span> {row.weightage}</span>
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
                )}
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
    </Box>
  );
};

export default AssignIvrForm;
