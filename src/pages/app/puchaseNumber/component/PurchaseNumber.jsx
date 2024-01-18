import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import { TbHome2 } from "react-icons/tb";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import Copyright from "../../../../components/footer/Footer";
import Loader from "../../../../components/Loader/Loader";
import {
  MdKeyboardArrowRight,
  MdOutlineDeleteForever,
  MdOutlinePriceChange,
} from "react-icons/md";
import {
  addToCartReq,
  createInvoiceReq,
  getAllCountriesReq,
  getAllSearchNumbersReq,
  getCartListReq,
  removeCartItemReq,
} from "../service/purchaseNumber.request";
import FormTextDropdown from "../../../../components/dropdown/FormTextDropdown";
import { TiTick } from "react-icons/ti";
import FormTextField from "../../../../components/textfield/FormTextField";
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
  },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ccyFormat(num) {
  return `${num?.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const PurchaseNumber = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const typeList = [
    { id: 1, label: "Local", value: "Local" },
    { id: 2, label: "Toll Free", value: "Tollfree" },
  ];

  const [isLoader, setLoader] = useState(false);

  const [rows, setRows] = useState([]);

  const [cartData, setCartData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [barVariant, setBarVariant] = useState("");
  const [message, setMessage] = useState("");

  const { vertical, horizontal, open } = snackbarOpen;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen({ ...snackbarOpen, open: false });
  };

  const [countryList, setCountryList] = useState([]);
  const [selectCountry, setSelectCountry] = useState({
    value: "",
    error: false,
    success: false,
  });
  const [type, setType] = useState({
    value: "",
    error: false,
    success: false,
  });

  const [startsNoList, setStartNoList] = useState([
    { id: 1, label: 800, value: 800 },
    { id: 2, label: 811, value: 811 },
    { id: 3, label: 822, value: 822 },
    { id: 4, label: 833, value: 833 },
    { id: 5, label: 844, value: 844 },
    { id: 6, label: 855, value: 855 },
    { id: 7, label: 866, value: 866 },
    { id: 8, label: 877, value: 877 },
    { id: 9, label: 888, value: 888 },
    { id: 10, label: 899, value: 899 },
  ]);

  const [selectStartsNo, setSelectStartsNo] = useState({
    value: "",
    error: false,
    success: false,
  });

  const handleChangeCountry = (value) => {
    setSelectCountry(value);
  };

  const handleChangeType = (value) => {
    setType(value);
  };

  const handleChangeStartsNo = (value) => {
    setSelectStartsNo(value);
  };

  useEffect(() => {
    setLoader(true);
    getAllCountriesReq()
      .then((res) => {
        setLoader(false);
        const filterCountry = res.data.data.map((ele) => {
          return {
            value: ele.id,
            label: ele.country_name,
            currency_symbol: ele.currency_symbol,
            phone_code: ele.phone_code,
          };
        });
        setCountryList(filterCountry);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  const fetchSearchNumber = (data) => {
    setLoader(true);
    getAllSearchNumbersReq(data)
      .then((res) => {
        setRows(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
      });
  };

  const fetchCartListNumber = (data) => {
    setLoader(true);
    getCartListReq()
      .then((res) => {
        setCartData(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
      });
  };

  useEffect(() => {
    fetchCartListNumber();
  }, []);

  const handleSearchForm = (e) => {
    e.preventDefault();
    if (!type.value || !selectStartsNo.value || !selectCountry.value) {
      setMessage("Please fill in all required fields.");
      setSnackbarOpen({ ...snackbarOpen, open: true });
      setBarVariant("error");
      return;
    }
    const data = {
      countryId: selectCountry.value,
      starting_digits: selectStartsNo.value,
      type: type.value,
    };
    setLoader(true);
    fetchSearchNumber(data);
  };

  const invoiceSubtotal = subtotal(cartData);

  const handleClickCart = (row) => {
    const serch_Params = {
      countryId: selectCountry.value,
      starting_digits: selectStartsNo.value,
      type: type.value,
    };
    const data = {
      did_number_id: row.id,
      did_number: row.did_number,
      price: row.price,
    };

    addToCartReq(data)
      .then((res) => {
        fetchSearchNumber(serch_Params);
        fetchCartListNumber();
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
      });
  };

  const handleRemoveCart = (row) => {
    const serch_Params = {
      countryId: selectCountry.value,
      starting_digits: selectStartsNo.value,
      type: type.value,
    };
    setLoader(true);
    removeCartItemReq(row.id)
      .then((res) => {
        fetchSearchNumber(serch_Params);
        fetchCartListNumber();
        setMessage(res.data.message);
        setBarVariant("success");
        setSnackbarOpen({ ...snackbarOpen, open: true });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.message);
      });
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();

    try {
      const transformedData = {
        did_number_id: [],
        did_number: [],
        price: [],
      };

      cartData?.forEach((item) => {
        ["did_number_id", "did_number", "price"].forEach((key) => {
          if (key in item) {
            transformedData[key].push(item[key]);
          }
        });
      });

      setLoader(true);
      const res = await createInvoiceReq(transformedData);
      setMessage(res.data.message);
      setBarVariant("success");
      setSnackbarOpen({ ...snackbarOpen, open: true });
      setTimeout(() => {
        navigate("/purchase-number/invoice-number", {
          state: { invoice_id: res.data.data.id },
        });
      }, 1000);
    } catch (err) {
      setBarVariant("error");
      setMessage(err.message);
      setSnackbarOpen({ ...snackbarOpen, open: true });
    } finally {
      setLoader(false);
    }
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
          <Breadcrumb pathList={paths} />
          <Box>
            <Box pt={1}>
              <Typography variant="h5">{"Create Purchase Numbers"}</Typography>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <FormTextDropdown
                    Value={selectCountry?.value}
                    onSelect={handleChangeCountry}
                    label={"Country *"}
                    CustomErrorLine={"Choose one"}
                    Required={true}
                    Options={countryList}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextDropdown
                    Value={type?.value}
                    onSelect={handleChangeType}
                    label={"Type *"}
                    CustomErrorLine={"Choose one"}
                    Required={true}
                    Options={typeList}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  {type?.value === "Local" ? (
                    <FormTextField
                      type="number"
                      label={"Starting with"}
                      Value={selectStartsNo.value}
                      onChangeText={handleChangeStartsNo}
                      Required={true}
                      CustomErrorLine={"Enter proper did_number"}
                    />
                  ) : (
                    <FormTextDropdown
                      Value={selectStartsNo?.value}
                      onSelect={handleChangeStartsNo}
                      label={"Starting with *"}
                      CustomErrorLine={"Choose one"}
                      Required={true}
                      Options={startsNoList}
                    />
                  )}
                </Grid>
                <Grid item xs={0} md={5} />
                <Grid item xs={0} md={5} />
                <Grid item xs={12} md={2}>
                  <Button
                    size="small"
                    onClick={(e) => handleSearchForm(e)}
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      width: "100%",
                    }}
                    variant="contained"
                  >
                    {"Search"}
                  </Button>
                </Grid>
                <Grid item xs={0} md={5} />
              </Grid>
            </Box>
            <Box mt={1}>
              <Grid container spacing={1}>
                <Grid item md={7} xs={12}>
                  <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
                    <Table stickyHeader aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Number</StyledTableCell>
                          <StyledTableCell align="right">Price</StyledTableCell>
                          <StyledTableCell align="right">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length > 0 ? (
                          rows.map((row) => (
                            <StyledTableRow key={row.did_number}>
                              <StyledTableCell component="th" scope="row">
                                {row.did_number}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.price}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <Chip
                                  clickable
                                  sx={{
                                    backgroundColor: colors.greenAccent[800],
                                  }}
                                  label="Add to cart"
                                  size="small"
                                  onClick={() => handleClickCart(row)}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : (
                          <StyledTableRow>
                            <TableCell align="center" colSpan={3}>
                              No records found
                            </TableCell>
                          </StyledTableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item md={5} xs={12}>
                  <TableContainer component={Paper} sx>
                    <Table stickyHeader aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center" colSpan={3}>
                            Numbers
                          </StyledTableCell>
                          <StyledTableCell align="right">Price</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartData?.length > 0 ? (
                          <>
                            {cartData?.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell align="left">
                                  {row.did_number}
                                </TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">
                                  <Chip
                                    sx={{
                                      backgroundColor: "inherit",
                                    }}
                                    size="small"
                                    clickable={false}
                                    label={ccyFormat(row.price)}
                                    onDelete={() => {
                                      handleRemoveCart(row);
                                    }}
                                    deleteIcon={
                                      <MdOutlineDeleteForever
                                        color="red"
                                        size="18px"
                                      />
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell rowSpan={3} />
                              <TableCell colSpan={2}>
                                <Typography variant="h6">Cart Total</Typography>
                              </TableCell>
                              <TableCell align="right">
                                {ccyFormat(invoiceSubtotal)}
                              </TableCell>
                            </TableRow>
                          </>
                        ) : (
                          <StyledTableRow>
                            <TableCell align="center" colSpan={5}>
                              Your cart is empty
                            </TableCell>
                          </StyledTableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {cartData.length > 0 && (
                    <Box
                      mt={3}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="contained"
                        aria-label="split button"
                        color="success"
                        endIcon={<MdKeyboardArrowRight />}
                        sx={{
                          backgroundColor: colors.greenAccent[700],
                          textTransform: "none",
                          color:
                            theme.palette.mode === "dark" ? "white" : "black",
                        }}
                        onClick={(e) => handleCreateInvoice(e)}
                      >
                        <Typography variant="h6">Create Invoice</Typography>
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </>
  );
};

export default PurchaseNumber;
