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
  getActiveTargetsRequest,
  getAllIvrRequest,
  getAllNumbersRequest,
} from "../service/inbound.request";
import "./styles.css";

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

const data = [
  {
    id: 1,
    did_no: "18001500500",
  },
  {
    id: 2,
    did_no: "18001500501",
  },
  {
    id: 3,
    did_no: "18001500502",
  },
  {
    id: 4,
    did_no: "18001500503",
  },
];

const InboundReport = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "did_no",
        header: "Serial No",
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
        accessorKey: "did_no",
        header: "Date",
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
        accessorKey: "did_no",
        header: "Status",
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
        accessorKey: "did_no",
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
        accessorKey: "did_no",
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
        accessorKey: "did_no",
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
        accessorKey: "did_no",
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
        accessorKey: "did_no",
        header: "Cost",
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
        accessorKey: "did_no",
        header: "Recording",
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
    ],
    []
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState(data);
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

  const [ivrList, setIvrList] = useState([]);
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
    getActiveTargetsRequest()
      .then((res) => {
        setIsLoader(false);
        let data =
          res.data.data.length === 0
            ? []
            : res.data.data.map((ele) => ({ value: ele.id, label: ele.name }));
        const updatedFetchData = [{ value: 0, label: "All" }, ...data];
        setTargetList(updatedFetchData);
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

  useEffect(() => {
    setIsLoader(true);
    getAllIvrRequest()
      .then((res) => {
        setIsLoader(false);
        let data =
          res.data.data.length === 0
            ? []
            : res.data.data.map((ele) => ({ value: ele.id, label: ele.name }));
        setIvrList(data);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }, []);

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
                    Target
                  </Typography>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Target"
                    defaultValue={targetList[0]}
                    isLoading={isLoader}
                    isClearable={true}
                    isSearchable={true}
                    name="target"
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
                    Ivr
                  </Typography>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Ivr"
                    isLoading={isLoader}
                    isClearable={true}
                    isSearchable={true}
                    name="ivr"
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
