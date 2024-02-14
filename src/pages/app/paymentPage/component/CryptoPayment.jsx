import React, { useState } from "react";
import {
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { TbHome2 } from "react-icons/tb";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import Loader from "../../../../components/Loader/Loader";
import { MdOutlinePriceChange } from "react-icons/md";
import { PiHandCoinsFill } from "react-icons/pi";
import Copyright from "../../../../components/footer/Footer";
import PaymentStepper from "../../../../components/stepper/PaymentStepper";
import { useLocation } from "react-router-dom";
import CryptoPayForm from "../../../../components/form/cryptoForm/CryptoPayForm";
import { paymentBtcQrGenerateReq } from "../service/payment.request";
import { concatenateDidNumbers } from "../../../../utility/utilty";

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
    name: "Purchase Number",
    icon: <MdOutlinePriceChange />,
    path: "purchase-number",
  },
  {
    name: "Payment",
    icon: <PiHandCoinsFill />,
  },
];

const CryptoPayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;

  const invoice_data = location?.state;
  const [isOpen, setIsOpen] = useState(false);
  const [cryptoData, setcryptoData] = useState({});
  const [message, setMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleClickPay = (e) => {
    e.preventDefault();
    const req_data = {
      invoice_id: invoice_data.id,
      invoice_number: invoice_data.invoice_id,
      amount: invoice_data.invoice_subtotal_amount,
      currency: invoice_data.invoice_currency,
      item_numbers: concatenateDidNumbers(invoice_data.invoice_items),
    };
    setIsLoader(true);
    paymentBtcQrGenerateReq(req_data)
      .then((res) => {
        setcryptoData(res.data);
        openAddModal();
        setIsLoader(false);
      })
      .catch((err) => {
        setMessage(err.message);
        setBarVariant("error");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setIsLoader(false);
      });
  };

  const selectModal = () => {
    return (
      <CryptoPayForm
        isOpen={true}
        setIsOpen={setIsOpen}
        cryptoData={cryptoData}
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

      <Modal modal_width={"50%"} isOpen={isOpen}>
        {selectModal()}
      </Modal>

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
            <Card sx={{ width: "55%" }}>
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
                    <Typography variant="h6">
                      {invoice_data?.invoice_id}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Price" />
                    <Typography variant="h6">
                      {invoice_data?.countries?.currency_symbol}
                      {invoice_data?.invoice_amount}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Currency" />
                    <Typography variant="h6">
                      {invoice_data?.countries?.currency}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Name" />
                    <Typography variant="h6">
                      {invoice_data?.company?.company_name}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Email" />
                    <Typography variant="h6">
                      {invoice_data?.company?.email}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "end", mr: 1, ml: 1 }}>
                <Button
                  size="medium"
                  sx={{
                    textTransform: "none",
                    backgroundColor: colors.greenAccent[700],
                    ":hover": {
                      backgroundColor: colors.greenAccent[800],
                    },
                  }}
                  variant="contained"
                  onClick={handleClickPay}
                >
                  Pay with BTC
                </Button>
                {/* <Button
                  size="medium"
                  sx={{
                    textTransform: "none",
                    backgroundColor: colors.greenAccent[700],
                    ":hover": {
                      backgroundColor: colors.greenAccent[800],
                    },
                  }}
                  variant="contained"
                >
                  Pay with Ethereum (ETH)
                </Button> */}
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
