import React, { useState, useEffect, useMemo } from "react";
import { Pagination } from "rsuite";
import Loader from "../../../../components/Loader/Loader";
import MuiAlert from "@mui/material/Alert";
import {
  Box,
  Fab,
  Snackbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../../assets/color/theme";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { TbHome2 } from "react-icons/tb";
import DefaultTable from "../../../../components/tables/DefaultTable";
import { Add, Routing2 } from "iconsax-react";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import Copyright from "../../../../components/footer/Footer";
import RoutePlanForm from "../../../../components/form/routePlanForm/RoutePlanForm";
import {
  createIvrRoutingRequest,
  getIvrRoutingRequest,
  updateIvrRouteStatusRequest,
} from "../service/routing.request";
import StatusBadge from "../../../../components/chip/StatusBadge";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "IVR Route",
    icon: <Routing2 size="12" />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const IvrRouting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
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
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 50,
        enableColumnDragging: false,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <StatusBadge value={cell.getValue()} />,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const [rows, setRows] = useState([]);
  const [routeId, setRouteId] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState();
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;

  const openAddModal = () => {
    setErrorMessage("");
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setErrorMessage("");
    setRouteId(null);
    setIsOpen(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };
  const handleSelectBtn = (btn) => {
    setErrorMessage("");
    setClickedBtn(btn);
  };

  const handleChangeEdit = (ele) => {
    setRouteId(ele.id);
    setCurrentType(ele);
    setIsOpen(true);
    setClickedBtn("edit");
  };

  const getAllRoutePlan = (activePage, limit) => {
    setIsLoader(true);
    getIvrRoutingRequest(activePage, limit)
      .then((res) => {
        let getData = res.data.data.length === 0 ? [] : res.data.data.data;
        setTotal(res.data.data.length === 0 ? 0 : res.data.data?.total);
        setRows(getData);
        setIsLoader(false);
      })
      .catch(() => {
        setIsLoader(false);
      });
  };

  useEffect(() => {
    getAllRoutePlan(activePage, limit);
  }, [activePage, limit]);

  const handleStatusChange = (ele) => {
    setIsLoader(true);
    const data = {
      id: ele.id,
      status: ele.status === 1 ? 0 : 1,
    };
    updateIvrRouteStatusRequest(data)
      .then((res) => {
        getAllRoutePlan(activePage, limit);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setErrorMessage("");
        setIsOpen(false);
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };
  const handleAddRoutePlan = (formData) => {
    if (formData.type === "name") {
      const queryNameData = {
        name: formData.name,
      };
      setIsLoader(true);
      createIvrRoutingRequest(queryNameData)
        .then((res) => {
          setRouteId(res.data?.data?.id);
          getAllRoutePlan(activePage, limit);
          setBarVariant("success");
          setMessage(res.data.message);
          setSnackbarOpen({ ...snackbarOpen, open: true });
          setErrorMessage("");
          setIsLoader(false);
        })
        .catch((err) => {
          setIsLoader(false);
          setBarVariant("error");
          setErrorMessage(err.message);
          setSnackbarOpen({ ...snackbarOpen, open: true });
        });
    }
  };
  const handleUpdateRoutePlan = (value) => {
    console.log(value);
  };

  const selectModal = () => {
    return (
      <RoutePlanForm
        handleFormData={
          clickedBtn === "add" ? handleAddRoutePlan : handleUpdateRoutePlan
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        routeId={routeId}
      />
    );
  };

  return (
    <>
      {isLoader && <Loader />}
      <Modal modal_width={"80%"} isOpen={isOpen}>
        {selectModal()}
      </Modal>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <div>
            <Typography variant="h5">{"Manage Ivr Route"}</Typography>
          </div>
          <div style={{ zIndex: 1 }}>
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
            isEditable={true}
            isStatusChangable={true}
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
      <Copyright />
    </>
  );
};

export default IvrRouting;
