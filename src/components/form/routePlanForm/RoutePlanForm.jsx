import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
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
  Typography,
  Zoom,
  styled,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../assets/color/theme";
import { MdClose } from "react-icons/md";
import FormTextField from "../../textfield/FormTextField";
import { FaCircle, FaMobileRetro } from "react-icons/fa6";
import { SiWebmoney } from "react-icons/si";
import { FcCallTransfer } from "react-icons/fc";

const fakeData = [
  //   {
  //     id: 1,
  //     name: "Target 1",
  //     type: "Number",
  //     destination: "18001500501",
  //     status: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "Target 2",
  //     type: "Number",
  //     destination: "18001500502",
  //     status: 2,
  //   },
  //   {
  //     id: 3,
  //     name: "Target 3",
  //     type: "Number",
  //     destination: "18001500503",
  //     status: 1,
  //   },
  //   {
  //     id: 4,
  //     name: "Target 4",
  //     type: "Number",
  //     destination: "18001500504",
  //     status: 0,
  //   },
  //   {
  //     id: 5,
  //     name: "Target 5",
  //     type: "Number",
  //     destination: "18001500505",
  //     status: 1,
  //   },
];

const RoutePlanForm = (props) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage,
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

  const [allTargetData, setAllTargetData] = useState(fakeData);

  const [searchTargetData, setSearchTargetData] = useState([]);
  const [targetSearchParams, setTargetSearchParams] = useState("");

  const [searchIvrTargetData, setSearchIvrTargetData] = useState([]);
  const [campaignTargetParams, setCampaignTargetParams] = useState("");

  const [searchTargetParams, setSearchTargetParams] = useState("");

  const [name, setName] = useState({
    value: initialValue ? initialValue.name : "",
    error: false,
    success: false,
  });

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

  const handleChangeName = (value) => {
    setErrorMessage("");
    setName(value);
  };

  const handleSearchTarget = (e) => {
    setTargetSearchParams(e.target.value);
  };

  return (
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
          {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormTextField
                type="alpha"
                placeholder={"Enter Target Name"}
                label={"Name"}
                Value={name.value}
                onChangeText={handleChangeName}
                Required={true}
                CustomErrorLine={"Enter proper name"}
              />
            </Grid>
            <Grid item xs={0} md={6} />

            <Grid item md={6} sm={12}>
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
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
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
                                  // onClick={(e) => handleClickCart(row)}
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
            {/* <Grid item md={7} sm={12}>
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
                      </Grid> */}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoutePlanForm;
