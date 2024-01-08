import React, { useMemo, useState, useEffect } from "react";
import { Box, Fab, Tooltip, Typography, useTheme } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Pagination } from "rsuite";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { TbHome2 } from "react-icons/tb";
import { GiCarrier } from "react-icons/gi";
import { Add } from "iconsax-react";
import { tokens } from "../../../../assets/color/theme";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import StatusBadge from "../../../../components/chip/StatusBadge";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import Loader from "../../../../components/Loader/Loader";
import CarriersForm from "../../../../components/form/carrierForm/carrierForm";
import {
  createCarriersRequest,
  getAllCarriersRequest,
  updateCarriersRequest,
  updateCarriersStatusRequest,
} from "../service/carriers.request";
import { isAuthorizedFunc } from "../../../../utility/utilty";
import { CREATE_CARRIER, STATUS_CARRIER, UPDATE_CARRIER } from "../../../../utility/constant";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Carriers",
    icon: <GiCarrier />,
  },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Carriers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getId = JSON.parse(localStorage.getItem("user"));
  const company_id = getId.user_data.company_id;

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
        accessorKey: "name",
        header: "Name",
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
        accessorKey: "serverip.ip_name",
        header: "Server IP",
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
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnDragging: false,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <StatusBadge value={cell.getValue()} />,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
    ],
    []
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };
  const getCarrierData = () => {
    setLoader(true);
    getAllCarriersRequest(activePage, limit)
      .then((res) => {
        let getData = res.data.data.length === 0 ? [] : res.data.data.data;
        setRows(getData);
        setTotal(res.data.data.length === 0 ? 0 : res.data.data?.total);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getCarrierData(activePage, limit);
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
        getCarrierData(activePage, limit);
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
  const handleAddCarriers = (value) => {
    const reqData = {
      name: value.name,
      ip_name: value.ip_name,
      // company_id: value.company_id,
    };
    createCarriersRequest(reqData)
      .then((res) => {
        getCarrierData(activePage, limit);
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
  const handleUpdateCarriers = (value) => {
    setLoader(true);
    var formData;
    if (value.carrier_type === "IP") {
      formData = {
        name: value.name,
        ip_name: value.ip_name,
        carrier_type: value.carrier_type,
        user_id: currentType.user_id,
        status: currentType.status,
        company_id: value.company_id,
      };
    } else {
      formData = {
        name: value.name,
        ip_name: value.ip_name,
        carrier_type: value.carrier_type,
        user_password: value.user_password,
        user_name: value.user_name,
        user_id: currentType.user_id,
        status: currentType.status,
        // company_id: value.company_id,
      };
    }
    const updateData = {
      data: formData,
      id: currentType.id,
    };
    updateCarriersRequest(updateData)
      .then((res) => {
        getCarrierData(activePage, limit);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setLoader(false);
        setErrorMessage("");
        setIsOpen(false);
      })
      .catch((err) => {
        setLoader(false);
        setErrorMessage(err.message);
      });
  };

  const selectModal = () => {
    return (
      <CarriersForm
        handleFormData={
          clickedBtn === "add" ? handleAddCarriers : handleUpdateCarriers
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
          <Modal modal_width={"30%"} isOpen={isOpen}>
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
              <Typography variant="h5">{"Manage Carriers"}</Typography>
            </div>
            <div style={{ zIndex: 1 }}>
              {isAuthorizedFunc(CREATE_CARRIER) && (
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
              isEditable={isAuthorizedFunc(UPDATE_CARRIER)}
              isDeletable={false}
              isStatusChangable={isAuthorizedFunc(STATUS_CARRIER)}
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
              // limitOptions={[5, 10, 25, 50, 100]}
              onChangeLimit={setLimit}
            />
          </Box>
        </Box>
      </Box>
      <Copyright />
    </>
  );
};

export default Carriers;
