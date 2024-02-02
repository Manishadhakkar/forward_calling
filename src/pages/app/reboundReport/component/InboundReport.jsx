import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { Pagination } from "rsuite";
import { TbHome2, TbReportSearch } from "react-icons/tb";
import { tokens } from "../../../../assets/color/theme";
import Loader from "../../../../components/Loader/Loader";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import DefaultTable from "../../../../components/tables/DefaultTable";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  getForwardTargetsRequest,
  getAllIvrRequest,
  getAllNumbersRequest,
  getInboundRequest,
} from "../service/inbound.request";
import "./styles.css";
import { ivrList } from "../../../../utility/config";
import DateChip from "../../../../components/chip/DateChip";
import moment from "moment";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Inbound Reports",
    icon: <TbReportSearch />,
  },
];

const InboundReport = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "uniqueid",
        header: "Unique No",
        size: 100,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "call_date",
        header: "Date",
        size: 100,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <DateChip value={cell.getValue()} />,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "did_number",
        header: "DID",
        size: 100,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "destination",
        header: "Destination",
        size: 100,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "calltype",
        header: "Type",
        size: 50,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 50,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "cost",
        header: "Cost",
        size: 50,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "campaigns.name",
        header: "Campaign Name",
        size: 100,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCell: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
    ],
    []
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [targetList, setTargetList] = useState([]);
  const [selectTarget, setSelectTarget] = useState(null);

  const [numberList, setNumberList] = useState([]);
  const [selectNumber, setSelectNumber] = useState(null);

  const [selectIvr, setSelectIvr] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const handleTargetChange = (value) => {
    setSelectTarget(value);
  };
  const handleNumberChange = (value) => {
    setSelectNumber(value);
  };
  const handleIvrChange = (value) => {
    setSelectIvr(value);
  };

  useEffect(() => {
    setIsLoader(true);
    getForwardTargetsRequest()
      .then((res) => {
        setIsLoader(false);
        let data =
          res.data.data.length === 0
            ? []
            : res.data.data.map((ele) => ({
                value: ele.id,
                label: ele.target,
              }));
        setTargetList(data);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }, []);

  useEffect(() => {
    setIsLoader(true);
    getAllNumbersRequest()
      .then((res) => {
        setIsLoader(false);
        let data =
          res.data.data.length === 0
            ? []
            : res.data.data.map((ele) => ({
                value: ele.id,
                label: ele.did_number,
              }));
        setNumberList(data);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }, []);

  const getAllCdrReportData = (
    activePage,
    limit,
    selectedStartDate,
    selectedEndDate,
    selectNumber,
    selectTarget,
    selectIvr
  ) => {
    setIsLoader(true);
    const start_date = moment(selectedStartDate).format("YYYY-MM-DD HH:mm:ss");
    const end_date = moment(selectedEndDate).format("YYYY-MM-DD HH:mm:ss");
    const type = selectIvr?.label === undefined ? "" : selectIvr?.value;
    const destination =
      selectTarget?.label === undefined ? "" : selectTarget?.label;
    const number = selectNumber?.label === undefined ? "" : selectNumber?.label;

    getInboundRequest(
      activePage,
      limit,
      start_date,
      end_date,
      number,
      destination,
      type
    )
      .then((res) => {
        let getData = res.data.data.total === 0 ? [] : res.data.data.data;
        setTotal(res.data.data.total);
        setRows(getData);
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  useEffect(() => {
    getAllCdrReportData(
      activePage,
      limit,
      selectedStartDate,
      selectedEndDate,
      selectNumber,
      selectTarget,
      selectIvr
    );
  }, [activePage, limit]);

  const handleFilterCdr = (e) => {
    e.preventDefault();
    getAllCdrReportData(
      activePage,
      limit,
      selectedStartDate,
      selectedEndDate,
      selectNumber,
      selectTarget,
      selectIvr
    );
  };

  const handleClearCdr = (e) => {
    e.preventDefault();
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
    setSelectTarget(null);
    setSelectNumber(null);
    setSelectIvr(null);
    setActivePage(1);

    const selectedStartDate = new Date();
    const selectedEndDate = new Date();
    const selectNumber = { label: "", value: "" };
    const selectTarget = { label: "", value: "" };
    const selectIvr = { label: "", value: "" };

    getAllCdrReportData(
      1,
      10,
      selectedStartDate,
      selectedEndDate,
      selectNumber,
      selectTarget,
      selectIvr
    );
  };

  return (
    <>
      {isLoader && <Loader />}

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
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              mt: 1,
            }}
          >
            <Typography variant="h5">{"Inbound Reports"}</Typography>
          </Box>
          <Box mt={3} mb={1} ml={2}>
            <Grid container spacing={2}>
              <Grid md={3} xs={12}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.textColor[100],
                    }}
                  >
                    From Date
                  </Typography>

                  <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    placeholderText="Start date & time"
                    isClearable
                    closeOnScroll={true}
                    selected={selectedStartDate}
                    onChange={handleStartDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                    style={{
                      color: "black",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    className="calender-input"
                  />
                </Box>
              </Grid>
              <Grid md={3} xs={12}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.textColor[100],
                    }}
                  >
                    To Date
                  </Typography>
                  <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    placeholderText="Start date & time"
                    isClearable
                    closeOnScroll={true}
                    selected={selectedEndDate}
                    onChange={handleEndDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                    style={{
                      color: "black",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    className="calender-input"
                  />
                </Box>
              </Grid>
              <Grid md={3} xs={12}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.textColor[100],
                    }}
                  >
                    Destination
                  </Typography>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Destination"
                    defaultValue={targetList[0]}
                    isLoading={isLoader}
                    isClearable={true}
                    isSearchable={true}
                    name="destination"
                    options={targetList}
                    onChange={handleTargetChange}
                    value={selectTarget}
                  />
                </Box>
              </Grid>
              <Grid md={3} xs={12}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.textColor[100],
                    }}
                  >
                    Number
                  </Typography>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Number"
                    isLoading={isLoader}
                    isClearable={true}
                    isSearchable={true}
                    name="number"
                    options={numberList}
                    onChange={handleNumberChange}
                    value={selectNumber}
                  />
                </Box>
              </Grid>
              <Grid md={3} xs={12}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.textColor[100],
                    }}
                  >
                    Type
                  </Typography>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select type"
                    isLoading={isLoader}
                    isClearable={true}
                    isSearchable={true}
                    name="type"
                    options={ivrList}
                    onChange={handleIvrChange}
                    value={selectIvr}
                  />
                </Box>
              </Grid>

              <Grid
                md={3}
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <Stack direction="row" spacing={12}>
                  <Button
                    type="submit"
                    size="small"
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      "&:hover": {
                        backgroundColor: colors.greenAccent[700],
                        textDecoration: "none",
                        boxShadow: "none",
                      },
                    }}
                    variant="contained"
                    onClick={handleFilterCdr}
                  >
                    Search
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: colors.redAccent[500],
                      "&:hover": {
                        backgroundColor: colors.redAccent[600],
                        textDecoration: "none",
                        boxShadow: "none",
                      },
                    }}
                    variant="contained"
                    onClick={handleClearCdr}
                  >
                    Clear
                  </Button>
                </Stack>
              </Grid>

              <Grid md={6} xs={0} />
            </Grid>
          </Box>

          <Box>
            <DefaultTable
              isLoading={isLoader}
              data={rows}
              column={columns}
              isEditing={false}
            />
            <Pagination
              style={{
                marginTop: 5,
              }}
              layout={["total", "-", "pager", "skip"]}
              size={"xs"}
              prev={true}
              next={true}
              first={true}
              last={true}
              ellipsis={true}
              boundaryLinks={true}
              total={total}
              limit={limit}
              maxButtons={5}
              activePage={activePage}
              onChangePage={setActivePage}
              limitOptions={[5, 10, 25, 50, 100]}
              onChangeLimit={setLimit}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InboundReport;
