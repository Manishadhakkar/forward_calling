import React, { useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../assets/color/theme";
import { createCardPayment } from "../../../pages/app/paymentPage/service/payment.request";
import { concatenateDidNumbers } from "../../../utility/utilty";

const StripeContainer = ({ invoice_data }) => {
  console.log(invoice_data);
  const cardElementOptions = {
    style: {
      base: {
        width: "100%",
        fontSize: "14px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [error, setError] = useState(null);
  const [cardDetails, setCardDetails] = useState({});

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.elementType]: e });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { token, error } = await stripe.createToken(
      elements.getElement(CardNumberElement),
      cardDetails
    );

    if (error) {
      setError(error.message);
    } else {
      setError("");
      const req_data = {
        invoice_id: invoice_data.id,
        invoice_number: invoice_data.invoice_id,
        stripeToken: token.id,
        payment_price: invoice_data.invoice_amount,
        currency: invoice_data.invoice_currency,
        item_numbers: concatenateDidNumbers(invoice_data.invoice_items),
      };
      createCardPayment(req_data)
      .then((res)=>{
        console.log(">>>>>>>", res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }


  };

  return (
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
          {error && <p>{error}</p>}
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemText primary="Invoice No." />
              <Typography variant="h6">{invoice_data?.invoice_id}</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Card Number" />
              <ListItemText>
                <CardNumberElement
                  options={cardElementOptions}
                  onChange={(e) =>
                    handleChange({ elementType: "cardNumber", ...e })
                  }
                />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary=" Expiration Date" />
              <ListItemText>
                <CardExpiryElement
                  options={cardElementOptions}
                  onChange={(e) =>
                    handleChange({ elementType: "cardExpiry", ...e })
                  }
                />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary="CVC" />
              <ListItemText>
                <CardCvcElement
                  options={cardElementOptions}
                  onChange={(e) =>
                    handleChange({ elementType: "cardCvc", ...e })
                  }
                />
              </ListItemText>
            </ListItem>
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

      {/* <label>
        Card Number
        <CardNumberElement
          onChange={(e) => handleChange({ elementType: "cardNumber", ...e })}
        />
      </label> */}
      {/* <label>
        Expiration Date
        <CardExpiryElement
          onChange={(e) => handleChange({ elementType: "cardExpiry", ...e })}
        />
      </label> */}
      {/* <label>
        CVC
        <CardCvcElement
          onChange={(e) => handleChange({ elementType: "cardCvc", ...e })}
        />
      </label> */}
      {/* <button type="submit" disabled={!stripe}>
        Pay
      </button> */}
      {/* {error && <p>{error}</p>} */}
    </Box>
  );
};

export default StripeContainer;
