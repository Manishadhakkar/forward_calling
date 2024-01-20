import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { Pagination } from "rsuite";
import { Box, Fab, Tooltip, Typography, useTheme } from "@mui/material";
import { Add } from "iconsax-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { MdRecordVoiceOver } from "react-icons/md";
import { TbHome2, TbTargetArrow } from "react-icons/tb";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import StatusChip from "../../../../components/chip/StatusChip";
import { tokens } from "../../../../assets/color/theme";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import Loader from "../../../../components/Loader/Loader";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import {
  createIvrRequest,
  getAllIvrRequest,
  updateIvrRequest,
  updateStatusIvrRequest,
} from "../service/ivr.request";
import IvrForm from "../../../../components/form/ivrForm/IvrForm";
import StatusBadge from "../../../../components/chip/StatusBadge";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Manage Ivr",
    icon: <MdRecordVoiceOver />,
  },
];
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageIvr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        size: 100,
      },
      {
        accessorKey: "timeout",
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
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
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

  const getAllIvr = (activePage, limit) => {
    setLoader(true);
    getAllIvrRequest(activePage, limit)
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
    getAllIvr(activePage, limit);
  }, [activePage, limit]);

  const handleAddIvr = (value) => {
    setLoader(true);
    createIvrRequest(value)
      .then((res) => {
        getAllIvr(activePage, limit);
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

  const handleUpdateIvr = (data) => {
    setLoader(true);
    const updateData = {
      data: {
        name: data.name,
        input_auth_type: data.input_auth_type,
        description: data.description,
        ivr_media_id: data.ivr_media_id,
        timeout: data.timeout,
      },
      id: currentType.id,
    };
    updateIvrRequest(updateData)
      .then((res) => {
        getAllIvr(activePage, limit);
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

  const handleStatusChange = (body) => {
    setLoader(true);
    const data = {
      id: body.id,
      status: body.status === 1 ? 0 : 1,
    };
    updateStatusIvrRequest(data)
      .then((res) => {
        getAllIvr(activePage, limit);
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

  const selectModal = () => {
    return (
      <IvrForm
        handleFormData={clickedBtn === "add" ? handleAddIvr : handleUpdateIvr}
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
              <Typography variant="h5">{"Manage Ivr"}</Typography>
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
      </Box>
      <Copyright />
    </>
  );
};

export default ManageIvr;
