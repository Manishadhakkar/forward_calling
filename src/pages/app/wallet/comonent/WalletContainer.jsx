import React, { useEffect, useMemo, useState } from "react";
import { Pagination } from "rsuite";
import { Box, Typography, useTheme } from "@mui/material";
import { TbHome2 } from "react-icons/tb";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import Loader from "../../../../components/Loader/Loader";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import { RiFolderHistoryFill } from "react-icons/ri";
import { getWalletHistory } from "../service/wallet.request";
import DateCell from "../../../../components/tableCell/DateCell";
import AmountCell from "../../../../components/tableCell/AmountCell";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Wallet",
    icon: <RiFolderHistoryFill />,
  },
];

const WalletContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);

  const columns = useMemo(
    () => [
      {
        accessorKey: "transaction_id",
        header: "Transaction ID",
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
        accessorKey: "order_id",
        header: "Order ID",
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
        accessorKey: "created_at",
        header: "Date",
        Cell: ({ cell }) => <DateCell value={cell.getValue()} />,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        size: 30,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        Cell: ({ cell }) => <AmountCell value={cell.getValue()} />,
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
        size: 30,
      },
    ],
    []
  );

  const getAllHistory = (activePage, limit) => {
    setLoader(true);
    getWalletHistory(activePage, limit)
      .then((res) => {
        let getData = res.data.data.length === 0 ? [] : res.data.data.data;
        const fetchData = getData?.map((ele) => {
          return {
            ...ele,
            amount: ele.payment_currency + ele.payment_price,
          };
        });
        setTotal(res.data.data.length === 0 ? 0 : res.data.data?.total);
        setRows(getData.length > 0 ? fetchData : []);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllHistory(activePage, limit);
  }, [activePage, limit]);


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
              mt: 1
            }}
          >
            <Typography variant="h5">{"Wallet History"}</Typography>
          </Box>
          <Box>
            <DefaultTable
              isLoading={isLoader}
              data={rows}
              column={columns}
              isSearchable={true}
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
      <Copyright />
    </>
  );
};

export default WalletContainer;
