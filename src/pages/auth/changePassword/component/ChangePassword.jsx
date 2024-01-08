import React, { useState } from "react";
import { TbHome2 } from "react-icons/tb";
import { MdOutlineSyncLock } from "react-icons/md";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import FormTextField from "../../../../components/textfield/FormTextField";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Loader from "../../../../components/Loader/Loader";
import { changePasswordRequest } from "../service/password.request";
import { useEffect } from "react";
import { tokens } from "../../../../assets/color/theme";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Change Password",
    icon: <MdOutlineSyncLock />,
  },
];

const ChangePassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const [currentPassword, setCurrentPassword] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [confirmPassword, seConfirmPassword] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [confirmErr, setConfirmErr] = useState(false);

  const [isLoader, setIsLoader] = useState(false);
  const [message, setMessage] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const handleChngOldPassword = (value) => {
    setCurrentPassword(value);
  };
  const handleChangePassword = (value) => {
    setPassword(value);
  };
  const handleChngConfirmPassword = (value) => {
    seConfirmPassword(value);
  };

  useEffect(() => {
    if (password.value !== "") {
      if (
        password.value !== confirmPassword.value &&
        confirmPassword.value !== ""
      ) {
        setConfirmErr(true);
      } else {
        setConfirmErr(false);
      }
    } else {
      setConfirmErr(false);
    }
  }, [password, confirmPassword]);

  const handleClickSubmit = () => {
    setIsLoader(true);
    const data = {
      password: password.value,
      password_confirmation: confirmPassword.value,
      current_password: currentPassword.value,
    };
    changePasswordRequest(data)
      .then((res) => {
        setIsLoader(false);
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        setIsLoader(false);
        setMessage(err.message);
        setBarVariant("error");
        setSnackbarOpen({ ...snackbarOpen, open: true });
      });
  };

  useEffect(() => {
    if (barVariant === "success") {
      setCurrentPassword({
        value: "",
        error: false,
        success: false,
      });
      setPassword({
        value: "",
        error: false,
        success: false,
      });
      seConfirmPassword({
        value: "",
        error: false,
        success: false,
      });
    }
  }, [barVariant]);

  return (
    <>
      {isLoader && <Loader />}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
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
            {"Change Password"}
          </Typography>
          <Grid container spacing={2}>
            <Grid sm={4} xs={0}></Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="password"
                label={"Current Password"}
                placeholder={"Enter Password"}
                CustomErrorLine="Please enter a proper password"
                Value={currentPassword.value}
                onChangeText={handleChngOldPassword}
                Required
              />
            </Grid>
            <Grid sm={4} xs={0}></Grid>

            <Grid sm={4} xs={0}></Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="password"
                label={"New Password"}
                placeholder={"Enter New Password"}
                CustomErrorLine="Please enter a proper password"
                Value={password.value}
                onChangeText={handleChangePassword}
                Required
              />
            </Grid>
            <Grid sm={4} xs={0}></Grid>

            <Grid sm={4} xs={0}></Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="password"
                label={"Confirm Password"}
                placeholder={"Re Enter New Password"}
                CustomErrorLine="Please enter a proper password"
                Value={confirmPassword.value}
                onChangeText={handleChngConfirmPassword}
                Required
                confirmErr={confirmErr}
              />
            </Grid>
            <Grid sm={4} xs={0} />

            <Grid sm={4} xs={0}></Grid>
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                size="small"
                variant="contained"
                sx={{ backgroundColor: colors.greenAccent[500] }}
                onClick={handleClickSubmit}
              >
                Submit
              </Button>
            </Grid>
            <Grid sm={4} xs={0} />
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ChangePassword;
