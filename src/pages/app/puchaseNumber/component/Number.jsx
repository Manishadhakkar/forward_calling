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
import { getAllPurchaseNumReq } from "../service/purchaseNumber.request";
import { GoNumber } from "react-icons/go";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Numbers",
    icon: <GoNumber />,
  },
];

const NumberList = () => {
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
        accessorKey: "did_name",
        header: "DID Name",
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
        accessorKey: "format_number",
        header: "Number",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 120,
      },
      {
        accessorKey: "type",
        header: "Type",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 50,
      },
      {
        accessorKey: "amount",
        header: "Price",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 50,
      },
    ],
    [rows]
  );

  const getAllNumbers = (activePage, limit) => {
    setLoader(true);
    getAllPurchaseNumReq(activePage, limit)
      .then((res) => {
        let getData = res.data.data.length === 0 ? [] : res.data.data.data;
        const fetchData = getData?.map((ele) => ({
          ...ele,
          format_number:
            `${"+ "}` + ele.country_code + `${" "}` + ele.did_number,
          amount: ele.countries.currency_symbol + `${" "}` + ele.price,
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
    getAllNumbers(activePage, limit);
  }, [activePage, limit]);

  const handleView = (id) => {
    console.log(id);
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
            <Typography variant="h5">{"Numbers List"}</Typography>
          </Box>
          <Box>
            <DefaultTable
              isLoading={isLoader}
              data={rows}
              column={columns}
              isSearchable={false}
              isView={true}
              handleViewChange={handleView}
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

export default NumberList;
