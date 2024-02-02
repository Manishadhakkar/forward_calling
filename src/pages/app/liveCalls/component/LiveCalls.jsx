import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../../components/Loader/Loader";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../assets/color/theme";
import { TbHome2 } from "react-icons/tb";
import { GiSatelliteCommunication } from "react-icons/gi";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import { totalCallsReq } from "../service/livecalls.request";
import TimeChip from "../../../../components/chip/TimeChip";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Live Calls",
    icon: <GiSatelliteCommunication />,
  },
];

const LiveCalls = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "did_number",
        header: "DID Number",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "left",
        },
        muiTableHeadCellProps: {
          align: "left",
        },
        size: 50,
      },
      {
        accessorKey: "target_number",
        header: "Target Number",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "left",
        },
        muiTableHeadCellProps: {
          align: "left",
        },
        size: 50,
      },
      {
        accessorKey: "timestamp",
        header: "Duration",
        size: 100,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <TimeChip value={cell.getValue()} />,
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
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "left",
        },
        muiTableHeadCellProps: {
          align: "left",
        },
        size: 50,
      },
      {
        accessorKey: "caller_id",
        header: "Caller Id",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "left",
        },
        muiTableHeadCellProps: {
          align: "left",
        },
        size: 50,
      },
    ],
    []
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoader, setLoader] = useState(false);
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const res = await totalCallsReq();
      const fetchedData = res.data?.data || [];
      setRows(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
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
          <Typography mt={1} mb={1} variant="h5">
            {"Live Calls History"}
          </Typography>
          <Box>
            <DefaultTable
              data={rows}
              column={columns}
              isSearchable={true}
              isEditing={false}
            />
          </Box>
        </Box>
      </Box>
      <Copyright />
    </>
  );
};

export default LiveCalls;
