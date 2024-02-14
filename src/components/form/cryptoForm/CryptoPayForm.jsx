import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../assets/color/theme";
import "../styles.css";
import { MdClose } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import StopWatch from "../../stopWatch/StopWatch";
import { paymentBTCPaymentStatusReq } from "../../../pages/app/paymentPage/service/payment.request";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CryptoPayForm = (props) => {
  const { setIsOpen, cryptoData } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [payProgress, setPayProgress] = useState("");
  const [barVariant, setBarVariant] = useState("");
  const { vertical, horizontal, open } = snackbarOpen;
  const [message, setMessage] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(null);

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const getPaymentData = () => {
    const fetchParams = {
      payment_id: cryptoData.payment_id,
      invoice_id: cryptoData.invoice_id,
      item_numbers: cryptoData.item_numbers,
    };
    paymentBTCPaymentStatusReq(fetchParams)
      .then((res) => {
        console.log(res.data);
        setIsWaiting(res.data.message === "waiting" ? true : false);
        setPayProgress(res.data.message);
        if (res.data.message === "finished") {
          setTimeout(() => {
            setBarVariant("success");
            setMessage("Payment successfully...");
            setSnackbarOpen({ ...snackbarOpen, open: true });
            navigate("/numbers");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPaymentData();

  useEffect(() => {
    const intervalId = setInterval(getPaymentData, 100000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
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
      <Dialog
        open={formOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>{"Pay With crypto transaction"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to close ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              bgcolor: colors.redAccent[600],
              color: colors.grey[100],
              textTransform: "none",
              ":hover": {
                bgcolor: colors.redAccent[700],
              },
            }}
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              setIsOpen();
              handleClose();
            }}
            sx={{
              bgcolor: colors.greenAccent[600],
              color: colors.grey[100],
              textTransform: "none",
              ":hover": {
                bgcolor: colors.greenAccent[700],
              },
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        sx={{
          boxShadow: "none",
          backgroundColor: colors.form[500],
          color: colors.form[100],
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MdClose color={colors.form[100]} />
            </IconButton>
          }
          title={"Payment Now"}
          onClick={handleClickOpen}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} container>
              <Grid item xs container direction="row">
                <Grid item xs>
                  <Typography gutterBottom variant="body1">
                    Total Amount Pay :
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Address :
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs container direction="row">
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    alignItems={"baseline"}
                  >
                    {cryptoData?.pay_amount}
                  </Typography>
                  <Typography
                    variant="overline"
                    gutterBottom
                    color={colors.greenAccent[400]}
                  >
                    {cryptoData?.pay_address}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              alignContent={"center"}
              textAlign={"center"}
            >
              <ButtonBase
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: colors.grey[100],
                }}
              >
                <Img alt="crypto qr scanner" src={cryptoData?.png_url} />
              </ButtonBase>
              <Typography variant="h6" mt={1} textAlign={"center"}>
                Scan QR Code to Pay
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box display={"flex"}>
                <Typography variant="subtitle1">
                  Please hold, payment in progress!{" "}
                  <span style={{ color: colors.redAccent[400] }}>
                    {payProgress}
                  </span>{" "}
                  ⏳💰 #TransactionUnderway
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  ml={2}
                  color={colors.green[300]}
                >
                  <StopWatch />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CryptoPayForm;
