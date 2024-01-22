import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Pagination } from "rsuite";
import { TbHome2 } from "react-icons/tb";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { HiOutlineHashtag } from "react-icons/hi2";
import { tokens } from "../../../../assets/color/theme";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import Loader from "../../../../components/Loader/Loader";
import {
  getAllPurchaseNumInvoiceReq,
  getAllPurchaseNumReq,
} from "../service/purchaseNumber.request";
import { GoNumber } from "react-icons/go";
import { FaFileInvoice } from "react-icons/fa6";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Number Invoice",
    icon: <FaFileInvoice />,
  },
];

const NumberInvoice = () => {
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
        accessorKey: "invoice_id",
        header: "Invoice Id",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 150,
      },
      {
        accessorKey: "countries.country_name",
        header: "Country",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 100,
      },
      {
        accessorKey: "amount",
        header: "Price",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 120,
      },
      {
        accessorKey: "payment_type",
        header: "Pay Type",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 50,
      },
    ],
    [rows]
  );

  const getAllInvoice = (activePage, limit) => {
    setLoader(true);
    getAllPurchaseNumInvoiceReq(activePage, limit)
      .then((res) => {
        let getData = res.data.data.length === 0 ? [] : res.data.data.data;
        const fetchData = getData?.map((ele) => ({
          ...ele,
          amount: ele.countries.currency_symbol + `${" "}` + ele.invoice_amount,
        }));
        setRows(fetchData);
        setTotal(res.data.data.length === 0 ? 0 : res.data.data?.total);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllInvoice(activePage, limit);
  }, [activePage, limit]);

  const handleDownload = (ele) => {
    window.open(ele.download_link);
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
            <Typography variant="h5">{"Number Invoice"}</Typography>
          </Box>
          <Box>
            <DefaultTable
              isLoading={isLoader}
              data={rows}
              column={columns}
              isSearchable={false}
              isDownload={true}
              handleDownloadClick={handleDownload}
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
              limit={10}
              activePage={activePage}
              onChangePage={setActivePage}
            />
          </Box>
        </Box>
      </Box>
      <Copyright />
    </>
  );
};

export default NumberInvoice;
