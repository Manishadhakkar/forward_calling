import React, { useEffect, useState, useMemo } from "react";
import { Pagination } from "rsuite";
import { Box, Fab, Tooltip, Typography, useTheme } from "@mui/material";
import { Add } from "iconsax-react";
import { TbBrandOauth, TbHome2 } from "react-icons/tb";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { tokens } from "../../../../assets/color/theme";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import RoleMappingForm from "../../../../components/form/roleFunmapForm/RoleMappingForm";
import Loader from "../../../../components/Loader/Loader";
import Copyright from "../../../../components/footer/Footer";
import DefaultTable from "../../../../components/tables/DefaultTable";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import {
  getRolePermissionReq,
  updateRolePermissionReq,
} from "../service/permission.request";

export const rolefunctionslist = [
  {
    id: 1,
    name: "Super Admin",
    permission: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 2,
    name: "Manager",
    permission: [1, 2, 3, 4, 5, 6, 7, 8],
  },
];

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Role Function Map",
    icon: <TbBrandOauth />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RoleFunctionMapping = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getId = JSON.parse(localStorage.getItem("user"));
  const user_slug = getId.user_data.roles[0].slug;
  const company_id = getId.user_data.company_id;

  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("add");
  const [currentType, setCurrentType] = useState();
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Role",
        enableColumnOrdering: false,
      },
      {
        accessorFn: (row) =>
          row.permission
            ?.map((ele) => ele.name)
            .join(", ")
            .slice(0, 50) + "...",
        id: "permission",
        header: "Functions",
        enableColumnOrdering: false,
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

  const getFetchAllRolePermission = () => {
    getRolePermissionReq(user_slug)
      .then((res) => {
        console.log(res.data);
        const result = res.data?.data?.role_permissions?.map((ele) => ({
          id: ele.role_id,
          name: ele.role,
          permission: ele.permissions,
        }));
        setRows(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFetchAllRolePermission();
  }, []);

  const handleChangeEdit = (data) => {
    setCurrentType(data);
    setIsOpen(true);
    setClickedBtn("edit");
  };

  const handleAddRolePermission = (data) => {
    setLoader(true);
    updateRolePermissionReq(data)
      .then((res) => {
        getFetchAllRolePermission();
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
  const handleUpdateUserRole = (data) => {
    setLoader(true);
    updateRolePermissionReq(data)
      .then((res) => {
        getFetchAllRolePermission();
        setLoader(false);
        setErrorMessage("");
        setBarVariant("success");
        setMessage("Updated successfully");
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
      <RoleMappingForm
        handleFormData={
          clickedBtn === "add" ? handleAddRolePermission : handleUpdateUserRole
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : ""}
        actionType={clickedBtn}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        user_slug={user_slug}
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
          <Modal modal_width={"30%"} isOpen={isOpen}>
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
              <Typography variant="h5">{"Role Function Mapping"}</Typography>
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
              data={rows}
              column={columns}
              handleEditAction={handleChangeEdit}
              isSearchable={true}
              isEditable={true}
              isDeletable={false}
              isStatusChangable={false}
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
export default RoleFunctionMapping;
