import React, { useImperativeHandle, useState, useRef } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Loader from "../../../../components/Loader/Loader";
import { tokens } from "../../../../assets/color/theme";
import { createPaymentWallet } from "../service/wallet.request";
import SuccessWallet from "./SuccessWallet";

const CardComponent = ({ invoice_data }) => {
  const cardElementOptions = {
    style: {
      base: {
        width: "100%",
        fontSize: "14px",
        color: "#424770",
        "::placeholder": { color: "#aab7c4" },
        border: "1px solid #9e2146",
      },
      invalid: { color: "#9e2146" },
    },
  };

  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [step, setStep] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);

  const [cardDetails, setCardDetails] = useState({});

  const [payAmount, setPayAmount] = useState("");

  const handlePaymentChange = (e) => {
    setPayAmount(e.target.value);
  };

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.elementType]: e });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const { token, error } = await stripe.createToken(
      elements.getElement(CardNumberElement),
      cardDetails
    );
    if (error) setError(error.message);
    else {
      setIsLoader(true);
      const data = {
        stripeToken: token.id,
        amount: payAmount,
      };
      createPaymentWallet(data)
        .then((res) => {
          setIsLoader(false);
          setStep(2);
        })
        .catch((err) => {
          setIsLoader(false);
          setError(err.message);
        });
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      {step === 1 ? (
        <Box
          mt={1}
          display="flex"
          justifyContent="center"
          component="form"
          onSubmit={handleSubmit}
        >
          <Card
            sx={{
              width: "45%",
              boxShadow: "none",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? colors.grey[900]
                  : colors.grey[900],
              color: colors.form[100],
            }}
          >
            <CardHeader title="Pay with card" />
            <Divider />
            <CardContent color={colors.form[100]}>
              {error && <p className="error_msg">{error}</p>}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={7.6}>
                  <Typography>Amount</Typography>
                </Grid>
                <Grid item xs={6} sm={3.2}>
                  <TextField
                    size="small"
                    InputProps={{
                      sx: {
                        border: "1px solid #fff",
                        borderRadius: "8px",
                        boxShadow: "none",
                      },
                    }}
                    value={payAmount}
                    placeholder="Enter Amount"
                    onChange={handlePaymentChange}
                  />
                </Grid>
                <Grid item xs={12} sm={7.6}>
                  <Typography>Card Number</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4.4}
                  sx={{
                    "& .StripeElement": {
                      border: "1px solid white",
                      padding: 1,
                      borderRadius: "8px",
                      width: "100%",
                    },
                  }}
                >
                  <CardNumberElement
                    options={cardElementOptions}
                    onChange={(e) =>
                      handleChange({ elementType: "cardNumber", ...e })
                    }
                  />
                </Grid>

                <Grid item xs={6} sm={7.6}>
                  <Typography>Expiry Date</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={2.2}
                  sx={{
                    "& .StripeElement": {
                      border: "1px solid #fff",
                      padding: 1,
                      borderRadius: "8px",
                      width: "100%",
                    },
                  }}
                >
                  <CardExpiryElement
                    options={cardElementOptions}
                    onChange={(e) =>
                      handleChange({ elementType: "cardExpiry", ...e })
                    }
                  />
                </Grid>
                <Grid item sm={2.2} md={2} />
                <Grid item xs={4} sm={7.6}>
                  <Typography>CVC</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={1.7}
                  sx={{
                    "& .StripeElement": {
                      border: "1px solid #fff",
                      padding: 1,
                      borderRadius: "8px",
                      width: "100%",
                    },
                  }}
                >
                  <CardCvcElement
                    options={cardElementOptions}
                    onChange={(e) =>
                      handleChange({ elementType: "cardCvc", ...e })
                    }
                  />
                </Grid>
              </Grid>
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
      ) : (
        <SuccessWallet />
      )}
    </>
  );
};

export default CardComponent;
