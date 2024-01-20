import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../assets/color/theme";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import PaymentStepper from "../../../../components/stepper/PaymentStepper";
import Copyright from "../../../../components/footer/Footer";
import { TbHome2 } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { PiHandCoinsFill } from "react-icons/pi";
import { TickCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const SuccessWallet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <>
      <Box mt={5} display={"flex"} justifyContent={"center"}>
        <Box width={"60%"}>
          <Box display={"flex"} justifyContent={"center"}>
            <TickCircle size="100" color="#FF8A65" />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography variant="h4">Thanks for recharge!</Typography>
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
                backgroundColor: colors.primary[400],
              }}
            >
              Back to home
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SuccessWallet;
