import React, { useEffect, useMemo, useState } from "react";
import { Box, Fab, Tooltip, Typography, useTheme } from "@mui/material";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { TbHome2, TbUsers } from "react-icons/tb";
import { Add } from "iconsax-react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { tokens } from "../../../../assets/color/theme";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import StatusBadge from "../../../../components/chip/StatusBadge";
import Loader from "../../../../components/Loader/Loader";
import DefaultTable from "../../../../components/tables/DefaultTable";
import { Pagination } from "rsuite";
import "rsuite/dist/rsuite.css";
import VerifyBadge from "../../../../components/chip/VerifyBadge";
import { isAuthorizedFunc } from "../../../../utility/utilty";
import {
  CREATE_USER,
  STATUS_USER,
  UPDATE_USER,
} from "../../../../utility/constant";
import BuyerForm from "../../../../components/form/buyerForm/BuyerForm";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Buyer",
    icon: <TbUsers />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthPublisher = () => {
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
      },
      {
        accessorKey: "email",
        header: "Email",
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
        accessorKey: "is_verified",
        header: "Email Verify",
        enableColumnDragging: false,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <VerifyBadge value={cell.getValue()} />,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
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

  const getAllBuyers = (activePage, limit) => {
    // setLoader(true);
    // getAllUsersRequest(activePage, limit)
    //   .then((res) => {
    //     let getData = res.data.data.length === 0 ? [] : res.data.data.data;
    //     setRows(getData);
    //     setTotal(res.data.data.length === 0 ? 0 : res.data.data?.total);
    //     setLoader(false);
    //   })
    //   .catch(() => {
    //     setLoader(false);
    //   });
  };
  useEffect(() => {
    getAllBuyers(activePage, limit);
  }, [activePage, limit]);

  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
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
    const data = {
      id: body.id,
      status: body.status === 1 ? 0 : 1,
    };
    // setLoader(true);
    // updateUsersStatusRequest(data)
    //   .then((res) => {
    //     getAllUsers(activePage, limit);
    //     setBarVariant("success");
    //     setMessage(res.data.message);
    //     setSnackbarOpen({ ...snackbarOpen, open: true });
    //     setErrorMessage("");
    //     setIsOpen(false);
    //     setLoader(false);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //   });
  };

  const handleAddBuyer = (value) => {
    // setLoader(true);
    // createUserRequest(value)
    //   .then((res) => {
    //     getAllUsers(activePage, limit);
    //     setErrorMessage("");
    //     setLoader(false);
    //     setBarVariant("success");
    //     setMessage(res.data.message);
    //     setSnackbarOpen({ ...snackbarOpen, open: true });
    //     setIsOpen(false);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //     setErrorMessage(err.message);
    //   });
  };

  const handleUpdateBuyer = (value) => {
    // const updateData = {
    //   data: {
    //     name: value.name,
    //     email: value.email,
    //     role_id: value.role_id,
    //     country_id: value.country_id,
    //     state_id: value.state_id,
    //     city: value.city,
    //     zip: value.zip,
    //     mobile: value.mobile,
    //     address: value.address,
    //     company_id: value.company_id,
    //     status: currentType.status,
    //   },
    //   id: currentType.id,
    // };
    // setLoader(true);
    // updateUsersRequest(updateData)
    //   .then((res) => {
    //     getAllUsers(activePage, limit);
    //     setErrorMessage("");
    //     setIsOpen(false);
    //     setBarVariant("success");
    //     setMessage(res.data.message);
    //     setSnackbarOpen({ ...snackbarOpen, open: true });
    //     setLoader(false);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //     setErrorMessage(err.message);
    //   });
  };

  const selectModal = () => {
    return (
      <BuyerForm
        handleFormData={
          clickedBtn === "add" ? handleAddBuyer : handleUpdateBuyer
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
          {isLoader && <h2>Loader</h2>}
          <Modal modal_width={"40%"} isOpen={isOpen}>
            {selectModal()}
          </Modal>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <div>
              <Typography variant="h5">{"Manage Publisher"}</Typography>
            </div>
            <div style={{ zIndex: 1 }}>
              {isAuthorizedFunc(CREATE_USER) && (
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
              data={rows}
              column={columns}
              handleEditAction={handleChangeEdit}
              handleStatusAction={handleStatusChange}
              isSearchable={true}
              isEditable={isAuthorizedFunc(UPDATE_USER)}
              isDeletable={false}
              isStatusChangable={isAuthorizedFunc(STATUS_USER)}
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

export default AuthPublisher;
