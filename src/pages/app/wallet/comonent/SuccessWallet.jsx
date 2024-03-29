import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../assets/color/theme";
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
                background: `linear-gradient(to bottom,  ${colors.primary[100]},  ${colors.grey[900]})`,
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
