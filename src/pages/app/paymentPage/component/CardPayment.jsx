import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeContainer from "../../../../components/form/cardForm/StripeContainer";

import "./styles.css";
import { Box, useTheme } from "@mui/material";
import { TbHome2 } from "react-icons/tb";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import Loader from "../../../../components/Loader/Loader";
import { MdOutlinePriceChange } from "react-icons/md";
import { PiHandCoinsFill } from "react-icons/pi";
import { tokens } from "../../../../assets/color/theme";
import PaymentStepper from "../../../../components/stepper/PaymentStepper";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51JHZjxG71L2aH3X16DtsCw8NhYxYGQv9IK41nlvjqmtlM3yoha3LqgQcjHvC81fqdknutLgFPf4EJj2UXPMIVRPP00fPbxse74"
);

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

const CardPayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const invoice_data = location?.state;

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
    <Elements stripe={stripePromise}>
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
            <StripeContainer invoice_data={invoice_data} />
          </Box>
        </Box>
      </>
    </Elements>
  );
};

export default CardPayment;
