import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
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
import SplitButton from "../../../../components/buttonGroup/ButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { getInvoiceDataReq } from "../service/invoice.request";

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

const options = [
  { id: 1, label: "Pay With Crypto" },
  { id: 2, label: "Pay Now" },
  { id: 3, label: "Pay With Wallet" },
];

const InvoiceNumber = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const invoice_id = location?.state?.invoice_id;
  const colors = tokens(theme.palette.mode);
  const [isLoader, setLoader] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const [message, setMessage] = useState("");

  const [invData, setInvoiceData] = useState({});

  const { vertical, horizontal, open } = snackbarOpen;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const handleClickPayType = (value) => {
    if (value === 1) {
      navigate("/purchase-number/invoice-number/crypto-payment", {
        state: invData,
      });
    } else if (value === 2) {
      navigate("/purchase-number/invoice-number/card-payment", {
        state: invData,
      });
    } else if (value === 3) {
      navigate(
        "/purchase-number/invoice-number/wallet-payment",
        { state: invData }
      );
    }
  };

  useEffect(() => {
    if (invoice_id !== null) {
      setLoader(true);
      getInvoiceDataReq(invoice_id)
        .then((res) => {
          setLoader(false);
          setInvoiceData(res.data.data[0]);
        })
        .catch(() => {
          setLoader(false);
          setBarVariant("error");
          setMessage("Something went wrong");
          setSnackbarOpen({ ...snackbarOpen, open: true });
        });
    }
  }, [invoice_id]);

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
          <PaymentStepper step={0} />
          <Box p={4}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? colors.primary[900]
                        : "#0000000a",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Billing Address</Typography>
                    <Divider />
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={invData?.company?.company_name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={invData?.company?.billing_address}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={invData?.company?.city} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={invData?.states?.state_name} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={invData?.countries?.country_name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={invData?.company?.zip} />
                      </ListItem>
                      <ListItem>
                        <Typography>{invData?.company?.email}</Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? colors.primary[900]
                        : "#0000000a",
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6">Order Summary</Typography>
                      <Typography
                        variant="h5"
                        color={colors.blueAccent[100]}
                        sx={{ fontWeight: 300 }}
                      >
                        {new Date(`${invData?.created_at}`)
                          .toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(/,/g, "")}{" "}
                        - {invData?.invoice_id}
                      </Typography>
                    </Box>
                    <Divider />
                    <List dense>
                      {invData?.invoice_items?.map((ele) => {
                        return (
                          <ListItem
                            secondaryAction={
                              <ListItemText primary={ele.price} />
                            }
                          >
                            <ListItemText primary={ele.did_number} />
                          </ListItem>
                        );
                      })}
                    </List>
                    <Divider />
                    <ListItem
                      secondaryAction={
                        <ListItemText
                          primary={`${invData?.countries?.currency_symbol} ${invData?.invoice_subtotal_amount}`}
                        />
                      }
                    >
                      <ListItemText primary="Total" />
                    </ListItem>
                  </CardContent>
                </Card>
                <Box
                  mt={3}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <SplitButton
                    options={options}
                    handleClickBtn={handleClickPayType}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </>
  );
};

export default InvoiceNumber;
