import React, { useState } from "react";
import "../styles.css";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";

const BuyerForm = (props) => {
  const { handleFormData, onHandleClose, errorMessage, setErrorMessage } =
    props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState({
    value: "",
    error: false,
    success: false,
  });

  const handleChangeEmail = (val) => {
    setErrorMessage("");
    setEmail(val);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = {
      email: email.value,
    };
    handleFormData(formData);
  };

  return (
    <>
      <Box noValidate>
        <Card
          component="form"
          sx={{
            boxShadow: "none",
            backgroundColor: colors.form[500],
            color: colors.form[100],
          }}
        >
          <CardHeader
            action={
              <IconButton aria-label="close" onClick={onHandleClose}>
                <MdClose color={colors.form[100]} />
              </IconButton>
            }
            title={"Add Buyer"}
          />
          {errorMessage && <span className="error_msg">{errorMessage}</span>}
          <CardContent color={colors.form[100]}>
            <Box className={"formResponsiveHeight"}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <FormTextField
                    type="email"
                    label={"Email"}
                    placeholder={"Enter Email"}
                    CustomErrorLine="Please enter a proper email"
                    value={email.value}
                    onChangeText={handleChangeEmail}
                    Required
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between", mr: 1, ml: 1 }}>
            <Button
              size="small"
              variant="contained"
              onClick={onHandleClose}
              sx={{
                textTransform: "none",
                backgroundColor: colors.redAccent[700],
                ":hover": {
                  backgroundColor: colors.redAccent[800],
                },
              }}
            >
              {"Cancel"}
            </Button>
            <Button
              type="submit"
              size="small"
              onClick={handleSubmitForm}
              disableElevation
              sx={{
                textTransform: "none",

                backgroundColor: colors.greenAccent[700],
                ":hover": {
                  backgroundColor: colors.greenAccent[800],
                },
              }}
              variant="contained"
            >
              {"Save"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default BuyerForm;
