import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
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
import { TbHome2, TbShoppingCartDiscount } from "react-icons/tb";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumb from "../../../../components/breadcrumb/BreadCrumb";
import { tokens } from "../../../../assets/color/theme";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import Copyright from "../../../../components/footer/Footer";
import Loader from "../../../../components/Loader/Loader";
import {
  MdOutlineDeleteForever,
  MdOutlinePriceChange,
  MdPhone,
} from "react-icons/md";
import { getAllCountriesReq } from "../service/purchaseNumber.request";
import FormTextDropdown from "../../../../components/dropdown/FormTextDropdown";
import { TiTick } from "react-icons/ti";
import { FcDeleteRow } from "react-icons/fc";

const fakeData = [
  { id: 1, name: "18001500811", price: 25 },
  { id: 2, name: "18001500822", price: 35 },
  { id: 3, name: "18001500833", price: 45 },
  { id: 4, name: "18001500844", price: 55 },
  { id: 5, name: "18001500855", price: 65 },
  { id: 6, name: "18001500866", price: 75 },
  { id: 7, name: "18001500877", price: 85 },
];

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

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num?.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const PurchaseNumber = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleChangeStartsNo = (value) => {
    setSelectStartsNo(value);
  };

  useEffect(() => {
    getAllCountriesReq()
      .then((res) => {
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
        console.log(err);
      });
  }, []);

  const selectModal = () => {
    return <h2>Open Modal</h2>;
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    const data = {
      country_id: selectCountry.value,
      starts_with: selectStartsNo.value,
    };
    const searchData = fakeData.filter((item) =>
      item.name.includes(data.starts_with)
    );
    setRows(searchData);
    setCartData([]);
  };

  const invoiceSubtotal = subtotal(cartData);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handleClickCart = (row) => {
    const cartNumber = {
      id: row.id,
      name: row.name,
      price: row.price,
      isCart: true,
    };
    let newNumberData = rows?.map((ele) => {
      return {
        ...ele,
        isCart: ele.id === row.id ? true : ele.isCart,
      };
    });
    setCartData([cartNumber, ...cartData]);
    setRows(newNumberData);
  };

  const handleRemoveCart = (row) => {
    const newCartNumber = cartData?.filter((ele) => ele.id !== row.id);
    let newNumberData = rows?.map((ele) => {
      return {
        ...ele,
        isCart: ele.id === row.id ? false : ele.isCart,
      };
    });
    setCartData(newCartNumber);
    setRows(newNumberData);
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
      <Modal modal_width={"30%"} isOpen={isOpen}>
        {selectModal()}
      </Modal>
      <Box
        sx={{
          mt: 1,
          ml: 2,
          mr: 2,
          mb: 2,
          height: "80%",
          backgroundColor: "inherit",
        }}
      >
        <Breadcrumb pathList={paths} />
        <Box>
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
            <Grid item xs={12} md={3}>
              <FormTextDropdown
                Value={selectStartsNo?.value}
                onSelect={handleChangeStartsNo}
                label={"Starting with *"}
                CustomErrorLine={"Choose one"}
                Required={true}
                Options={startsNoList}
              />
            </Grid>
            <Grid xs={0} md={6} />

            <Grid xs={0} md={4} />
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
            <Grid xs={0} md={6} />
          </Grid>
        </Box>
        <Box mt={1}>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Number</StyledTableCell>
                      <StyledTableCell align="right">Price</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length > 0 ? (
                      rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.price}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row?.isCart === true ? (
                              <Chip
                                icon={<TiTick />}
                                sx={{
                                  backgroundColor: colors.blueAccent[800],
                                }}
                                label="Added"
                                size="small"
                              />
                            ) : (
                              <Chip
                                clickable
                                sx={{
                                  backgroundColor: colors.greenAccent[800],
                                }}
                                label="Add to cart"
                                size="small"
                                onClick={() => handleClickCart(row)}
                              />
                            )}
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
            <Grid item md={6} xs={12}>
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
                    {cartData.length > 0 ? (
                      <>
                        {cartData?.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="left">{row.name}</TableCell>
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
                          <TableCell colSpan={2}>Subtotal</TableCell>
                          <TableCell align="right">
                            {ccyFormat(invoiceSubtotal)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Tax</TableCell>
                          <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                            0
                          )} %`}</TableCell>
                          <TableCell align="right">
                            {ccyFormat(invoiceTaxes)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Typography variant="h6">Total</Typography>
                          </TableCell>
                          <TableCell align="right">
                            {ccyFormat(invoiceTotal)}
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
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright /> */}
    </>
  );
};

export default PurchaseNumber;
