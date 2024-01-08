import React, { useMemo, useState, useEffect } from "react";
import { Box, Fab, Tooltip, Typography, useTheme } from "@mui/material";
import { Pagination } from "rsuite";
import { Add } from "iconsax-react";
import { TbHome2 } from "react-icons/tb";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { HiOutlineHashtag } from "react-icons/hi2";
import { tokens } from "../../../../assets/color/theme";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import StatusBadge from "../../../../components/chip/StatusBadge";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import Loader from "../../../../components/Loader/Loader";
import {
  createNumberRequest,
  getAllNumbersRequest,
  updateNumberRequest,
  updateCarriersStatusRequest,
} from "../service/numbers.request";
import NumberForm from "../../../../components/form/numberForm/numberForm";
import { isAuthorizedFunc } from "../../../../utility/utilty";
import {
  CREATE_NUMBER,
  STATUS_NUMBER,
  UPDATE_NUMBER,
} from "../../../../utility/constant";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Numbers",
    icon: <HiOutlineHashtag />,
  },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageNumber = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const getId = JSON.parse(localStorage.getItem("user"));
  const company_id = getId.user_data.company_id;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const [message, setMessage] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;

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
        accessorKey: "country.country_name",
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
        accessorKey: "price",
        header: "Price",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 50,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnDragging: false,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <StatusBadge value={cell.getValue()} />,
      },
    ],
    [rows]
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };
  const getAllNumbers = (activePage, limit) => {
    setLoader(true);
    getAllNumbersRequest(activePage, limit)
      .then((res) => {
        let getData = res.data.data.length === 0 ? [] : res.data.data.data;
        const fetchData = getData?.map((ele) => ({
          ...ele,
          format_number:
            `${"+ "}` + ele.country_code + `${" "}` + ele.did_number,
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

  const openAddModal = () => {
    setErrorMessage("");
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false);
  };
  const handleSelectBtn = (btn) => {
    setClickedBtn(btn);
  };
  const handleChangeEdit = (ele) => {
    setClickedBtn("edit");
    setCurrentType(ele);
    setIsOpen(true);
  };
  const handleStatusChange = (body) => {
    setLoader(true);
    const data = {
      id: body.id,
      status: body.status === 1 ? 0 : 1,
    };
    updateCarriersStatusRequest(data)
      .then((res) => {
        getAllNumbers(activePage, limit);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setErrorMessage("");
        setIsOpen(false);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const handleAddNumber = (value) => {
    setLoader(true);
    createNumberRequest(value)
      .then((res) => {
        getAllNumbers(activePage, limit);
        setLoader(false);
        setErrorMessage("");
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setIsOpen(false);
      })
      .catch((err) => {
        setLoader(false);
        setErrorMessage(err.message);
      });
  };
  const handleUpdateNumber = ({
    did_name,
    country_id,
    did_number,
    description,
    price,
    carrier_id,
    country_code,
    connect_charge,
    retail_min_duration,
    retail_billing_block,
    selling_price,
  }) => {
    setLoader(true);
    const updateData = {
      data: {
        did_name: did_name,
        country_id: country_id,
        did_number: did_number,
        country_code: country_code,
        description: description,
        price: price,
        carrier_id: carrier_id,
        connect_charge: connect_charge,
        retail_min_duration: retail_min_duration,
        retail_billing_block: retail_billing_block,
        selling_price: selling_price,
      },
      id: currentType.id,
    };
    updateNumberRequest(updateData)
      .then((res) => {
        getAllNumbers(activePage, limit);
        setLoader(false);
        setErrorMessage("");
        setIsOpen(false);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
      })
      .catch((err) => {
        setLoader(false);
        setErrorMessage(err.message);
      });
  };

  const selectModal = () => {
    return (
      <NumberForm
        handleFormData={
          clickedBtn === "add" ? handleAddNumber : handleUpdateNumber
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        company_id={company_id}
      />
    );
  };

  return (
    <>
      {isLoader && <Loader />}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={barVariant}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
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
          <Modal modal_width={"45%"} isOpen={isOpen}>
            {selectModal()}
          </Modal>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <div>
              <Typography variant="h5">{"Manage Numbers"}</Typography>
            </div>
            <div style={{ zIndex: 1 }}>
              {isAuthorizedFunc(CREATE_NUMBER) && (
                <Fab
                  aria-label="add"
                  size="small"
                  sx={{
                    boxShadow: "none",
                    backgroundColor: colors.greenAccent[500],
                  }}
                  onClick={() => {
                    openAddModal();
                    handleSelectBtn("add");
                  }}
                >
                  <Tooltip title="Add">
                    <Add />
                  </Tooltip>
                </Fab>
              )}
            </div>
          </Box>
          <Box>
            <DefaultTable
              isLoading={isLoader}
              data={rows}
              column={columns}
              handleEditAction={handleChangeEdit}
              handleStatusAction={handleStatusChange}
              isSearchable={true}
              isEditable={isAuthorizedFunc(UPDATE_NUMBER)}
              isDeletable={false}
              isStatusChangable={isAuthorizedFunc(STATUS_NUMBER)}
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
              // maxButtons={5}
              activePage={activePage}
              onChangePage={setActivePage}
              // limitOptions={[5, 10, 25, 50, 100]}
              // onChangeLimit={(e) => handleChangeLimit(e)}
            />
          </Box>
        </Box>
      </Box>
      <Copyright />
    </>
  );
};

export default ManageNumber;
