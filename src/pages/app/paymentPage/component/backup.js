import React, { useEffect, useRef, useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import "./styles.css";
import {
  Box,
  useTheme,
  Typography,
  CardContent,
  Card,
  Divider,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
} from "@mui/material";
import { TbHome2 } from "react-icons/tb";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import Loader from "../../../../components/Loader/Loader";
import { MdOutlinePriceChange } from "react-icons/md";
import { PiHandCoinsFill } from "react-icons/pi";
import PaymentStepper from "../../../../components/stepper/PaymentStepper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

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

  const stripe = useStripe();
  const elements = useElements();

  const stripePromise = loadStripe(
    "pk_test_51JHZjxG71L2aH3X16DtsCw8NhYxYGQv9IK41nlvjqmtlM3yoha3LqgQcjHvC81fqdknutLgFPf4EJj2UXPMIVRPP00fPbxse74"
  );

  const [message, setMessage] = useState("");
  const [isLoader, setLoader] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");

  const { vertical, horizontal, open } = snackbarOpen;

  const { meta, getExpiryDateProps, getCVCProps } = usePaymentInputs();

  const [cardNumber, setCardNumber] = useState("");

  const [details, setDetails] = useState({
    expiryDate: "",
    cvc: "",
    NameOfClient: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const handleChange = (e) => {
    setDetails((prevFormDetails) => {
      return {
        ...prevFormDetails,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChangeCardNumber = (e) => {
    setCardNumber(
      e.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
  };

  // function stripeResponseHandler(status, response) {
  //   if (response.error) {
  //     console.log("error");
  //   } else {
  //     var token = response["id"];
  //     console.log(token);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const stripe = await loadStripe(
    //   "pk_test_51JHZjxG71L2aH3X16DtsCw8NhYxYGQv9IK41nlvjqmtlM3yoha3LqgQcjHvC81fqdknutLgFPf4EJj2UXPMIVRPP00fPbxse74"
    // );
    // stripe.createToken({
    //   number: 4242424242424242,
    //   cvc: 123,
    //   exp_month: 12,
    //   exp_year: 32
    // }, stripeResponseHandler)
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
          <Elements stripe={stripePromise}>
            <Box
              mt={1}
              display={"flex"}
              justifyContent={"center"}
              component="form"
              onSubmit={handleSubmit}
            >
              <Card sx={{ width: "40%" }}>
                <CardHeader title="Pay with card" />
                <Divider />
                <CardContent color={colors.form[100]}>
                  {meta.isTouched && meta.error ? (
                    <span className="span">Error: {meta.error}</span>
                  ) : (
                    <span className="span"></span>
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
                      <ListItemText primary="Name on card*" />
                      <input name="NameOfClient" onChange={handleChange} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Card Number*" />
                      <input
                        onChange={handleChangeCardNumber}
                        placeholder="Valid Card Number"
                        name="cardNumber"
                        maxLength="19"
                        value={cardNumber}
                      />
                    </ListItem>
                    <div className="DateEtCvc">
                      <div className="Date">
                        <label> Valid to </label>
                        <input
                          {...getExpiryDateProps({ onChange: handleChange })}
                          placeholder="MM/YY"
                          name="expiryDate"
                        />
                      </div>
                      <div>
                        <label> Cvv </label>
                        <input
                          {...getCVCProps({ onChange: handleChange })}
                          name="cvv"
                          maxLength="3"
                          placeholder="CVV"
                        />
                      </div>
                    </div>
                  </List>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "center", mr: 1, ml: 1 }}>
                  <Button
                    fullWidth
                    type="submit"
                    size="medium"
                    sx={{
                      backgroundColor: colors.greenAccent[700],
                      textTransform: "none",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                    }}
                    variant="contained"
                    className="btn"
                  >
                    Validate
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Elements>
        </Box>
      </Box>
    </>
  );
};

export default CardPayment;
