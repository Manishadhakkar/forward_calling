import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Loader from "../../../../components/Loader/Loader";
import UserSignIn from "./userLogin";
import { tokens } from "../../../../assets/color/theme";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { userLoginRequest } from "../service/auth.request";
import axios from "axios";

const defaultTheme = createTheme();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignIn = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const { loading_signin } = props;
  const [loader, setLoader] = useState(false);
  const [slugId, setSlugId] = useState(null);
  const [userDetail, setUserDetail] = useState();

  const [message, setMessage] = useState("");
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
  useEffect(() => {
    const isLoading = loading_signin;
    setLoader(isLoading);
  }, [loading_signin]);

  const handleSignIn = (data) => {
    setLoader(true);
    userLoginRequest(data)
      .then((res) => {
        setLoader(false);
        const user_details = {
          user_id: res.data.data.id,
          token: res.data.data.token,
          user_data: res.data.data,
        };
        setUserDetail(user_details);
        setSlugId(res.data?.data?.roles[0]?.slug);
      })
      .catch((err) => {
        if (err.code === 403) {
          setBarVariant("warning");
          setMessage(err.message);
          setSnackbarOpen({ ...snackbarOpen, open: true });
          setTimeout(() => {
            navigate("/verify", { state: { login_id: data.email } });
          }, 2000);
        } else if (err.code === 423) {
          setMessage(err.message);
          setBarVariant("error");
          setSnackbarOpen({ ...snackbarOpen, open: true });
        } else {
          setMessage(err.message);
          setBarVariant("error");
          setSnackbarOpen({ ...snackbarOpen, open: true });
        }
        setLoader(false);
      });
  };

  useEffect(() => {
    let headers = {
      "Content-Type": "application/json",
    };
    if (slugId !== null) {
      headers["Authorization"] = `Bearer ${userDetail.token}`;
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/permission/permission-by-group/${slugId}`, {
          headers,
        })
        .then((res) => {
          const value = res.data?.data?.role_permissions.map((ele) => ele.slug);
          localStorage.setItem("authorization", JSON.stringify(value));
          localStorage.setItem("user", JSON.stringify(userDetail));
          setMessage("Login Successfully");
          setBarVariant("success");
          setSnackbarOpen({ ...snackbarOpen, open: true });
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [slugId]);

  return (
    <>
      {loader && <Loader />}
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
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            className="login_left_grid"
            item
            xs={false}
            sm={6}
            md={6}
            sx={{
              backgroundColor: colors.primary[500],
            }}
          />
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            elevation={5}
            square
            sx={{
              boxShadow: "none",
              paddingLeft: "10px",
              paddingRight: "10px",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "none !important",
                width: "100%",
              }}
            >
              <UserSignIn handleFormData={handleSignIn} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default SignIn;
