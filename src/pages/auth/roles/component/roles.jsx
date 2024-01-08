import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Fab,
  TablePagination,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { TbHome2 } from "react-icons/tb";
import { Add } from "iconsax-react";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import UserRoleForm from "../../../../components/form/userRole/UserRoleForm";
import StatusBadge from "../../../../components/chip/StatusBadge";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import Loader from "../../../../components/Loader/Loader";
import {
  createRole,
  getAllRoles,
  updateRoleRequest,
  updateRoleStatusRequest,
} from "../service/role.request";
import {
  CREATE_ROLE,
  STATUS_ROLE,
  UPDATE_ROLE,
} from "../../../../utility/constant";
import { isAuthorizedFunc } from "../../../../utility/utilty";
import { MdOutlineSecurity } from "react-icons/md";
import { GiSecurityGate } from "react-icons/gi";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Roles",
    icon: <GiSecurityGate />,
  },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const UsersRole = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const [message, setMessage] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };
  const getAllRolesData = () => {
    setLoader(true);
    getAllRoles()
      .then((res) => {
        setRows(res.data.data);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllRolesData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
        accessorKey: "description",
        header: "Description",
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
    updateRoleStatusRequest(data)
      .then((res) => {
        let result = rows.map((elem) => {
          if (elem.id === res.data.data.id) {
            return {
              ...elem,
              id: res.data.data.id,
              title: res.data.data.title,
              description: res.data.data.description,
              status: res.data.data.status,
            };
          } else {
            return elem;
          }
        });
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setRows(result);
        setErrorMessage("");
        setIsOpen(false);
        setLoader(false);
      })
      .catch((err) => {
        setBarVariant("error");
        setMessage(err.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setLoader(false);
      });
  };
  const handleAddRole = (value) => {
    setLoader(true);
    createRole(value)
      .then((res) => {
        getAllRolesData();
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
  const handleUpdateRole = (value) => {
    setLoader(true);
    const updateData = {
      data: {
        name: value.name,
        description: value.description,
        status: currentType.status,
      },
      id: currentType.id,
    };
    updateRoleRequest(updateData)
      .then((res) => {
        setLoader(false);
        setErrorMessage("");
        const result = rows.map((elem) => {
          if (elem.id === res.data.data.id) {
            return {
              ...elem,
              id: res.data.data.id,
              name: res.data.data.name,
              description: res.data.data.description,
              status: res.data.data.status,
            };
          } else {
            return elem;
          }
        });
        setRows(result);
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
  const selectModal = () => {
    return (
      <UserRoleForm
        handleFormData={clickedBtn === "add" ? handleAddRole : handleUpdateRole}
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
              <Typography variant="h5">{"Roles Management"}</Typography>
            </div>
            <div style={{ zIndex: 1 }}>
              {isAuthorizedFunc(CREATE_ROLE) && (
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
              isEditable={isAuthorizedFunc(UPDATE_ROLE)}
              isDeletable={false}
              isStatusChangable={isAuthorizedFunc(STATUS_ROLE)}
            />
            <TablePagination
              component="div"
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </Box>
      <Copyright />
    </>
  );
};

export default UsersRole;
