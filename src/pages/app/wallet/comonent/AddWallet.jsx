import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import "./styles.css";
import { LiaGoogleWallet } from "react-icons/lia";
import { loadStripe } from "@stripe/stripe-js";
import { TbHome2 } from "react-icons/tb";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../assets/color/theme";
import Copyright from "../../../../components/footer/Footer";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import CardComponent from "./CardComponent";

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
    name: "Wallet Recharge",
    icon: <LiaGoogleWallet />,
  },
];

const AddWalletContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Elements stripe={stripePromise}>
      <Box>
        <Box
          sx={{
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
          <CardComponent />
        </Box>
        <Copyright />
      </Box>
    </Elements>
  );
};

export default AddWalletContainer;
