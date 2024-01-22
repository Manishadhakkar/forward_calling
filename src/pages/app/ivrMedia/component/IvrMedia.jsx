import React, { useEffect, useMemo, useState } from "react";
import { Pagination } from "rsuite";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import { Box, Fab, Tooltip, Typography, useTheme } from "@mui/material";
import { TbHome2 } from "react-icons/tb";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import Loader from "../../../../components/Loader/Loader";
import DefaultTable from "../../../../components/tables/DefaultTable";
import Copyright from "../../../../components/footer/Footer";
import { RiFolderHistoryFill } from "react-icons/ri";
import { Add } from "iconsax-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BsFileEarmarkMusic } from "react-icons/bs";
import MediaForm from "../../../../components/form/mediaForm/MediaForm";
import {
  createIvrMedia,
  getAllIvrMediaRequest,
  updateIvrMedia,
  updateMediaStatusRequest,
} from "../service/media.request";
import axios from "axios";
import StatusBadge from "../../../../components/chip/StatusBadge";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Media",
    icon: <BsFileEarmarkMusic />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WalletContainer = () => {
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
        accessorKey: "media_file",
        header: "Media Name",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "left",
        },
        muiTableHeadCellProps: {
          align: "left",
        },
        size: 100,
      },
      {
        accessorKey: "file_ext",
        header: "Type",
        enableColumnDragging: false,
        enableGlobalFilter: true,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableBodyCellProps: {
          align: "left",
        },
        muiTableHeadCellProps: {
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

  const getAllIvrMedia = async (activePage, limit) => {
    try {
      setLoader(true);
      const res = await getAllIvrMediaRequest(activePage, limit);
      const data = res.data.data;
      const total = data.length === 0 ? 0 : data.total;
      const rows = data.length === 0 ? [] : data.data;
      setTotal(total);
      setRows(rows);
    } catch (error) {
      setMessage(error.message);
      setBarVariant("error");
      setSnackbarOpen({ ...snackbarOpen, open: true });
      setIsOpen(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllIvrMedia(activePage, limit);
  }, [activePage, limit]);

  const handleAddMedia = async (formData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.post(
        "http://139.84.169.123/portalforwarding/backend/public/api/ivr-media",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getAllIvrMedia(activePage, limit);
      setLoader(false);
      setErrorMessage("");
      setMessage(response.data.message);
      setBarVariant("success");
      setSnackbarOpen({ ...snackbarOpen, open: true });
      setIsOpen(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoader(false);
      setErrorMessage(error.message);
    }
    // try {
    //   setLoader(true);
    //   const res = await createIvrMedia(formData);
    //   const message = res.data.message;
    //   getAllIvrMedia(activePage, limit);
    //   setLoader(false);
    //   setErrorMessage("");
    //   setMessage(message);
    //   setBarVariant("success");
    //   setSnackbarOpen({ ...snackbarOpen, open: true });
    //   setIsOpen(false);
    // } catch (error) {
    //   setLoader(false);
    //   setErrorMessage(error.message);
    // }
  };

  const handleStatusChange = (body) => {
    setLoader(true);
    const data = {
      id: body.id,
      status: body.status === 1 ? 0 : 1,
    };
    updateMediaStatusRequest(data)
      .then((res) => {
        getAllIvrMedia(activePage, limit);
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

  const handleUpdateMedia = async (formData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.put(
        `http://139.84.169.123/portalforwarding/backend/public/api/ivr-media/${currentType.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getAllIvrMedia(activePage, limit);
      setLoader(false);
      setErrorMessage("");
      setMessage(response.data.message);
      setBarVariant("success");
      setSnackbarOpen({ ...snackbarOpen, open: true });
      setIsOpen(false);
    } catch (error) {
      setLoader(false);
      setErrorMessage(error.response.data.message);
    }
    // try {
    //   setLoader(true);
    //   const data = {
    //     id: currentType.id,
    //     data: {
    //       media_file: value.media_file,
    //       name: value.name,
    //     },
    //   };
    //   const res = await updateIvrMedia(data);
    //   const message = res.data.message;
    //   getAllIvrMedia(activePage, limit);
    //   setLoader(false);
    //   setErrorMessage("");
    //   setBarVariant("success");
    //   setMessage(message);
    //   setSnackbarOpen({ ...snackbarOpen, open: true });
    //   setIsOpen(false);
    // } catch (error) {
    //   setLoader(false);
    //   setErrorMessage(error.message);
    // }
  };

  const selectModal = () => {
    const handleFormData =
      clickedBtn === "add" ? handleAddMedia : handleUpdateMedia;
    return (
      <MediaForm
        handleFormData={handleFormData}
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
      <Modal modal_width="40%" isOpen={isOpen}>
        {selectModal()}
      </Modal>
      {isLoader && <Loader />}
      <Snackbar
        {...{
          open,
          anchorOrigin: { vertical, horizontal },
          autoHideDuration: 3000,
          onClose: handleClose,
        }}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <div>
              <Typography variant="h5">{"Manage Media"}</Typography>
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
              isSearchable={true}
              isStatusChangable={true}
              handleStatusAction={handleStatusChange}
              isEditable={true}
              handleEditAction={handleChangeEdit}
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

export default WalletContainer;
