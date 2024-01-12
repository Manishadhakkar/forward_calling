import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { TbHome2 } from "react-icons/tb";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import Loader from "../../../../components/Loader/Loader";
import { MdOutlinePriceChange } from "react-icons/md";
import { PiHandCoinsFill } from "react-icons/pi";
import Copyright from "../../../../components/footer/Footer";
import PaymentStepper from "../../../../components/stepper/PaymentStepper";

const paths = [
  {
    name: "Dashboard",
    path: "",
    icon: <TbHome2 />,
  },
  {
    name: "Purchase Number",
    icon: <MdOutlinePriceChange />,
    path: "purchase-number",
  },
  {
    name: "Payment",
    icon: <PiHandCoinsFill />,
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CryptoPayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errorMessage, setErrorMessage] = useState();
  const [message, setMessage] = useState("");
  const [isLoader, setLoader] = useState(false);
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
      <Box>
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
            height: "80%",
            backgroundColor: "inherit",
            position: "relative",
            minHeight: "80vh"
          }}
        >
          <Box mb={3}>
            <Breadcrumb pathList={paths} />
          </Box>
          <PaymentStepper step={1} />
          <Box mt={1} display={"flex"} justifyContent={"center"}>
          <Card sx={{ width: "55%"}}>
            <CardHeader title="Pay with crypto" />
            <Divider />
            <CardContent color={colors.form[100]}>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemText primary="Invoice No." />
                  <Typography variant="h6">INV/2024/00074</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Price" />
                  <Typography variant="h6">40,000.00</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Currency" />
                  <Typography variant="h6">USD</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Name" />
                  <Typography variant="h6">
                    Textricks solutions (p) ltd.
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" />
                  <Typography variant="h6">superadmin@textricks.com</Typography>
                </ListItem>
              </List>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "end", mr: 1, ml: 1 }}>
              <Button
                size="medium"
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  textTransform: "none",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
                variant="contained"
              >
                Pay with BTC
              </Button>
              <Button
                size="medium"
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  textTransform: "none",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
                variant="contained"
              >
                Pay with Ethereum (ETH)
              </Button>
            </CardActions>
          </Card>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </>
  );
};
export default CryptoPayment;
