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
  CREATE_USER
} from "../../../../utility/constant";
import BuyerForm from "../../../../components/form/buyerForm/BuyerForm";
import {
  createBuyerRequest,
  getAllBuyersReq,
  updateUsersStatusRequest,
} from "../service/buyer.request";
import { FaShopLock } from "react-icons/fa6";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Buyer",
    icon: <FaShopLock />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthBuyer = () => {
  const getId = JSON.parse(localStorage.getItem("user"));
  const user_details = getId.user_data;

  console.log(">>>>>>>>>",user_details)

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
    setLoader(true);
    getAllBuyersReq(activePage, limit)
      .then((res) => {
        let getData = res.data.data.data.length === 0 ? [] : res.data.data.data;
        setRows(getData);
        setTotal(res.data.data.data.length === 0 ? 0 : res.data.data?.total);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllBuyers(activePage, limit);
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

  const handleStatusChange = (body) => {
    const data = {
      id: body.id,
      status: body.status === 1 ? 0 : 1,
    };
    setLoader(true);
    updateUsersStatusRequest(data)
      .then((res) => {
        getAllBuyers(activePage, limit);
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

  const handleAddBuyer = (value) => {
    const query_data = {
      company_id: user_details.company.id,
      user_id: user_details.id,
      email: value.email
    }

    setLoader(true);
    createBuyerRequest(query_data)
      .then((res) => {
        console.log(">>>>>>>",res)
        getAllBuyers(activePage, limit);
        setErrorMessage("");
        setLoader(false);
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
      <BuyerForm
        handleFormData={handleAddBuyer}
        onHandleClose={handleModalClose}
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
              <Typography variant="h5">{"Manage Buyer"}</Typography>
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
              handleStatusAction={handleStatusChange}
              isSearchable={true}
              isEditable={false}
              isDeletable={false}
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
      </Box>
    </>
  );
};

export default AuthBuyer;
