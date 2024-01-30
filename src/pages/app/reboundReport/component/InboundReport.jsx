import React, { useState, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Pagination } from "rsuite";
import { TbHome2, TbReportSearch } from "react-icons/tb";
import { tokens } from "../../../../assets/color/theme";
import Loader from "../../../../components/Loader/Loader";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import DefaultTable from "../../../../components/tables/DefaultTable";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
        header: "Number",
        size: 200,
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
  const [isLoader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);

//   const [startDate, setStartDate] = useState(
//     setHours(setMinutes(new Date(), 30), 16),
//   );

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
          <Box>
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            /> */}

            {/* <DatePicker
            //   selectsRange={true}
            //   startDate={startDate}
            //   endDate={endDate}
            //   onChange={(update) => {
            //     setDateRange(update);
            //   }}
              isClearable={true}
              className="calender-input"
              shouldCloseOnSelect={true}
              

              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              excludeTimes={[
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ]}
              dateFormat="MMMM d, yyyy h:mm aa"
            /> */}
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
