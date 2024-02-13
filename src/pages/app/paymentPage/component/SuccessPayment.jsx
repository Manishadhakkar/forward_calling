import React from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../assets/color/theme";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import PaymentStepper from "../../../../components/stepper/PaymentStepper";
import Copyright from "../../../../components/footer/Footer";
import { TbHome2 } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { PiHandCoinsFill } from "react-icons/pi";
import { FcApprove } from "react-icons/fc";
import { TickCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";

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

const SuccessPayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <>
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
          <PaymentStepper step={2} />
          <Box mt={5} display={"flex"} justifyContent={"center"}>
            <Box width={"60%"}>
              <Box display={"flex"} justifyContent={"center"}>
                <TickCircle size="100" color="#FF8A65" />
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <Typography variant="h4">Thanks for purchasing!</Typography>
              </Box>
              <Box display={"flex"} mt={2} justifyContent={"center"}>
                <Typography>
                  your payment invoice has been sent to your mail!
                </Typography>
              </Box>
              <Box display={"flex"} mt={2} justifyContent={"center"}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => navigate("/")}
                  sx={{
                    textTransform: "none",
                    background: `linear-gradient(to bottom,  ${colors.primary[100]},  ${colors.grey[900]})`,
                  }}
                >
                  Back to home
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </>
  );
};

export default SuccessPayment;
