import React, { useEffect, useMemo, useState } from "react";
import { Pagination } from "rsuite";
import { Box, Fab, Tooltip, Typography, useTheme } from "@mui/material";
import { Add } from "iconsax-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { TbHome2, TbTargetArrow } from "react-icons/tb";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import StatusChip from "../../../../components/chip/StatusChip";
import { tokens } from "../../../../assets/color/theme";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import TargetForm from "../../../../components/form/targetForm/TargetForm";
import {
  createTargetRequest,
  getAllTargetRequest,
  updateTargetsStatusRequest,
  updateTargetRequest,
  deleteTargetsRequest,
} from "../service/target.request";
import Loader from "../../../../components/Loader/Loader";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Targets",
    icon: <TbTargetArrow />,
  },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageTarget = () => {
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
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
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
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "left",
        },
        size: 100,
      },
      {
        accessorKey: "target_random_id",
        header: "Random ID",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        // Cell: ({ cell }) => <>{cell.getValue()}</>,
        muiTableBodyCellProps: {
          align: "left",
        },
        muiTableHeadCellProps: {
          align: "left",
        },
        size: 50,
      },
      {
        accessorKey: "hourly_cap",
        header: "Hour",
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
      {
        accessorKey: "daily_cap",
        header: "Day",
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
      {
        accessorKey: "monthly_cap",
        header: "Month",
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
      {
        accessorKey: "connection_timeout",
        header: "Timeout",
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
      {
        accessorKey: "status",
        header: "Status",
        enableColumnDragging: false,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue()} />,
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const getAllTargets = (activePage, limit) => {
    setLoader(true);
    getAllTargetRequest(activePage, limit)
      .then((res) => {
        let getData = res.data.data.length === 0 ? [] : res.data.data.data;
        setTotal(res.data.data.length === 0 ? 0 : res.data.data?.total);
        setRows(getData);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllTargets(activePage, limit);
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
    setErrorMessage("");
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
    updateTargetsStatusRequest(data)
      .then((res) => {
        getAllTargets(activePage, limit);
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setErrorMessage("");
        setIsOpen(false);
        setLoader(false);
      })
      .catch((err) => {
        setBarVariant("error");
        setMessage(err.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setErrorMessage("");
        setIsOpen(false);
        setLoader(false);
      });
  };

  const handleAddTarget = (value) => {
    setLoader(true);
    createTargetRequest(value)
      .then((res) => {
        getAllTargets(activePage, limit);
        setLoader(false);
        setErrorMessage("");
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setIsOpen(false);
      })
      .catch((err) => {
        setLoader(false);
        setErrorMessage(err.message);
      });
  };

  const handleUpdateTarget = (data) => {
    setLoader(true);
    const updateData = {
      data: {
        user_id: currentType.user_id,
        company_id: data.company_id,
        name: data.name,
        type: data.type,
        description: data.description,
        forwarding_number: data.forwarding_number,
        connection_timeout: data.connection_timeout,
        monthly_cap: data.monthly_cap,
        daily_cap: data.daily_cap,
        hourly_cap: data.hourly_cap,
        max_concurrency: data.max_concurrency,
        status: currentType.status,
      },
      id: currentType.id,
    };
    updateTargetRequest(updateData)
      .then((res) => {
        getAllTargets(activePage, limit);
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

  const handleChangeDelete = (body) => {
    setLoader(true);
    const data = {
      id: body.id,
      is_delete: body.deleted_at === null ? 1 : 0,
    };
    deleteTargetsRequest(data)
      .then((res) => {
        getAllTargets(activePage, limit);
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

  const selectModal = () => {
    return (
      <TargetForm
        company_id={company_id}
        handleFormData={
          clickedBtn === "add" ? handleAddTarget : handleUpdateTarget
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
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
          <Modal modal_width={"50%"} isOpen={isOpen}>
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
              <Typography variant="h5">{"Manage Targets"}</Typography>
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
              handleDeleteAction={handleChangeDelete}
              handlePlayPause={handleStatusChange}
              isSearchable={true}
              isEditable={true}
              isDeletable={true}
              isStatusChangable={false}
              isPlayPause={true}
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

export default ManageTarget;
