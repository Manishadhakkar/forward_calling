import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { TbHome2 } from "react-icons/tb";
import MuiAlert from "@mui/material/Alert";
import { MdOutlinePriceChange } from "react-icons/md";
import { PiHandCoinsFill } from "react-icons/pi";
import { tokens } from "../../../../assets/color/theme";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import Loader from "../../../../components/Loader/Loader";
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

const WalletPayment = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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
            minHeight: "80vh",
          }}
        >
          <Box mb={3}>
            <Breadcrumb pathList={paths} />
          </Box>
          <PaymentStepper step={1} />
          <Box mt={1} display={"flex"} justifyContent={"center"}>
            <Card
              sx={{
                boxShadow: "none",
                backgroundColor: colors.form[500],
                color: colors.form[100],
                width: "40%",
              }}
              component="form"
              // onSubmit={(e) => handleSubmit(e)}
            >
              <CardHeader title="Payment Form" />
              <Divider />
              <CardContent color={colors.form[100]}>
                <Box component="form">
                  {errorMessage && (
                    <span className="error_msg">{errorMessage}</span>
                  )}

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
                      <Typography variant="h6">
                        superadmin@textricks.com
                      </Typography>
                    </ListItem>
                  </List>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "end", mr: 1, ml: 1 }}>
                <Button
                  fullWidth
                  size="medium"
                  sx={{
                    textDecoration: "none",
                    backgroundColor: colors.greenAccent[700],
                    textTransform: "none",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                  variant="contained"
                >
                  Pay with Wallet
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WalletPayment;
