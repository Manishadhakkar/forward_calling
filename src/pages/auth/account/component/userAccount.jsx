import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { TbHome2, TbBrandOauth } from "react-icons/tb";
import Copyright from "../../../../components/footer/Footer";
import CompanyDetails from "../../../../components/form/profileForm/CompanyDetails";
import UserDetails from "../../../../components/form/profileForm/UserDetails";
import {
  getCompanyByIdRequest,
  updateCompanyRequest,
  updateUsersRequest,
} from "../service/account.request";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import Loader from "../../../../components/Loader/Loader";
import { getAllCountryRequest } from "../../users/service/users.request";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Account",
    icon: <TbBrandOauth />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserAccount = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [initialValue, setInitialValue] = useState({});
  const [countryList, setCountryList] = useState([]);

  const [isLoader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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

  useEffect(() => {
    getAllCountryRequest()
      .then((res) => {
        const filterCountry = res.data.data.map((ele) => {
          return {
            value: ele.id,
            label: ele.country_name,
            phone_code: ele.phone_code,
          };
        });
        setCountryList(filterCountry);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user.user_data.company_id !== "0") {
      let id = user.user_data.company_id;
      getCompanyByIdRequest(id)
        .then((res) => {
          setInitialValue(res.data.data);
        })
        .catch(() => {});
    }
  }, []);

  const handleChngCompany = (value) => {
    const updateData = {
      data: {
        country_id: value.country_id,
        state_id: value.state_id,
        city: value.city,
        zip: value.zip,
        billing_address: value.address,
      },
      id: value.id,
    };
    setLoader(true);
    updateCompanyRequest(updateData)
      .then((res) => {
        setErrorMessage("");
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setErrorMessage(err.message);
      });
  };
  const handleChngUser = (value) => {
    const updateData = {
      data: value,
      id: value.id,
    };
    setLoader(true);
    updateUsersRequest(updateData)
      .then((res) => {
        setErrorMessage("");
        setBarVariant("success");
        setMessage(res.data.message);
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setErrorMessage(err.message);
      });
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
          mt: 1,
          ml: 2,
          mr: 2,
          mb: 2,
          height: "auto",
          backgroundColor: "inherit",
        }}
      >
        <Breadcrumb pathList={paths} />
        <Paper sx={{ p: 5, mt: 2 }} elevation={2}>
          <Typography mt={0.5} mb={1} variant="h4" textAlign="left">
            {"Profile Details"}
          </Typography>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <UserDetails
                countryList={countryList}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                handleUserFormData={handleChngUser}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <CompanyDetails
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                handleCompanyFormData={handleChngCompany}
                countryList={countryList}
              />
            </Grid>
          </Grid>
        </Paper>
        <Copyright />
      </Box>
    </>
  );
};

export default UserAccount;
