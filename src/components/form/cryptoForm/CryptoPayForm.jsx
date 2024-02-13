import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Stack,
  Switch,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import FormTextField from "../../textfield/FormTextField";
import { tokens } from "../../../assets/color/theme";
import "../styles.css";
import FormTextDropdown from "../../dropdown/FormTextDropdown";
import { MdClose } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CryptoPayForm = (props) => {
  const { setIsOpen } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
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
                    0.0000103BTC
                  </Typography>
                  <Typography
                    variant="overline"
                    gutterBottom
                    color={colors.greenAccent[400]}
                  >
                    3wdtrgyhgjnkln54678jinkzndjbhsbd
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
                  backgroundColor: colors.grey[100]
                }}
              >
                <Img
                  alt="crypto qr scanner"
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                />
              </ButtonBase>
              <Typography variant="h6" mt={1} textAlign={"center"}>
                Scan QR Code to Pay
              </Typography>
            </Grid>
            {/* <Grid item md={12} xs={12}>
            <Typography variant="caption">
              Please hold, payment in progress! ⏳💰 #TransactionUnderway
            </Typography>
          </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CryptoPayForm;
