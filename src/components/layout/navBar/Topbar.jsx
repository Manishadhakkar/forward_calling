import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../assets/color/theme";
import {
  useTheme,
  Box,
  IconButton,
  Toolbar,
  Typography,
  CardHeader,
  Tooltip,
  Divider,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { useProSidebar } from "react-pro-sidebar";
import { FiMoreVertical } from "react-icons/fi";
import {
  CallCalling,
  CallReceived,
  Logout,
  Message,
  Setting5,
  Moon,
  Notification,
  Sun1,
} from "iconsax-react";
import {
  FcCustomerSupport,
  FcAdvertising,
  FcSms,
  FcBusinessman,
} from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  completedCallsReq,
  logoutRequest,
  totalCallsReq,
} from "./logout.request";
import Loader from "../../Loader/Loader";
import { getBalanceRemainsReq } from "../../../pages/app/wallet/service/wallet.request";
import TopDrawer from "../../drawer/CustomDrawer";
import { isAuthorizedFunc } from "../../../utility/utilty";
import {
  GET_BALANCE,
  GET_COMPLETE_CALLS,
  GET_COUNT_LIVE_CALLS,
} from "../../../utility/constant";

const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const userData = JSON.parse(localStorage.getItem("user"));

  const roleData = userData?.user_data?.roles[0]?.role_id;
  const user_details = userData?.user_data;
  const currency_symbol = userData?.user_data?.country?.currency_symbol;

  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [amount, setAmount] = useState(0);
  const [liveCalls, setLiveCalls] = useState(0);
  const [totalCalls, setTotalCalls] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const getUserBalance = async () => {
    if (
      roleData !== 1 &&
      roleData !== 2 &&
      roleData !== 3 &&
      isAuthorizedFunc(GET_BALANCE)
    ) {
      try {
        const res = await getBalanceRemainsReq();
        const newBalance = res.data?.data?.balance;
        setAmount((prevAmount) => {
          if (prevAmount !== newBalance) {
            getUserAllCalls();
          }
          return newBalance;
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  getUserBalance();

  useEffect(() => {
    if (roleData !== 1 && roleData !== 2 && roleData !== 3) {
      const intervalId = setInterval(getUserBalance, 10000);
      return () => clearInterval(intervalId);
    }
  }, [roleData]);

  const getUserLiveCalls = async () => {
    if (
      roleData !== 1 &&
      roleData !== 2 &&
      roleData !== 3 &&
      isAuthorizedFunc(GET_COUNT_LIVE_CALLS)
    ) {
      try {
        const res = await totalCallsReq();
        const total_call =
          res.data.data.length === 0 ? 0 : res.data.data.livecalls;
        setLiveCalls(total_call);
      } catch (err) {
      } finally {
      }
    }
  };
  getUserLiveCalls();
  useEffect(() => {
    if (roleData !== 1 && roleData !== 2 && roleData !== 3) {
      const intervalId = setInterval(getUserLiveCalls, 5000);
      return () => clearInterval(intervalId);
    }
  }, [roleData]);

  const getUserAllCalls = async () => {
    if (
      roleData !== 1 &&
      roleData !== 2 &&
      roleData !== 3 &&
      isAuthorizedFunc(GET_COMPLETE_CALLS)
    ) {
      try {
        const res = await completedCallsReq();
        const resultData =
          res.data?.data.length === 0 ? 0 : res.data?.data?.CompletedCalls;
        setTotalCalls(resultData);
      } catch (err) {
        setTotalCalls(0);
      } finally {
      }
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isMobileMenuOpen = mobileMoreAnchorEl;

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleAccount = () => {
    setAnchorElUser(null);
    navigate("/account");
    handleMobileMenuClose();
  };
  const handleSettingPassword = () => {
    handleMobileMenuClose();
    setAnchorElUser(null);
    navigate("/changepassword");
  };

  const handleChangeMode = () => {
    setAnchorElUser(null);
    colorMode.toggleColorMode();
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCloseUserLogout = () => {
    setIsLoader(true);
    logoutRequest()
      .then(() => {
        setIsLoader(false);
        localStorage.clear();
        window.location.href = "/";
      })
      .catch(() => {
        setIsLoader(false);
        localStorage.clear();
        window.location.href = "/";
      });
  };

  const handleSwitchAccount = () => {
    setIsOpen(true);
    setAnchorElUser(false);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Message size={"20px"} />
          </Badge>
        </IconButton>
        <Typography sx={{ marginLeft: "2px" }} textAlign="center">
          Message
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleChangeMode}>
        <IconButton>
          {theme.palette.mode === "dark" ? (
            <Sun1 size="20" />
          ) : (
            <Moon size="20" />
          )}
        </IconButton>
        <Typography sx={{ marginLeft: "2px" }} textAlign="center">
          {theme.palette.mode === "dark" ? "Light" : "Dark"}
        </Typography>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Notification size={"20px"} />
          </Badge>
        </IconButton>
        <Typography sx={{ marginLeft: "2px" }} textAlign="center">
          News
        </Typography>
      </MenuItem>
      {roleData !== (1 || 2 || 3) && (
        <MenuItem onClick={handleAccount}>
          <IconButton size="small" color="inherit">
            <Message size={"20px"} />
          </IconButton>
          <Typography sx={{ marginLeft: "2px" }} textAlign="center">
            Account
          </Typography>
        </MenuItem>
      )}
      <MenuItem onClick={handleSettingPassword}>
        <IconButton size="small" color="inherit">
          <Setting5 size={"20px"} />
        </IconButton>
        <Typography sx={{ marginLeft: "2px" }} textAlign="center">
          Change Password
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleCloseUserLogout}>
        <IconButton size="small" color="inherit">
          <Logout size={"20px"} />
          <Typography sx={{ marginLeft: "2px" }} textAlign="center">
            Logout
          </Typography>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <TopDrawer isOpen={isOpen} setIsOpen={setIsOpen} data={user_details} />
      {isLoader && <Loader />}
      <Box
        sx={{
          flexGrow: 1,
          position: "sticky !important",
          top: 0,
          zIndex: 999,
          background: `linear-gradient(to bottom, ${colors.primary[100]}, ${colors.primary[200]})`,
          borderBottom: `1px solid ${colors.grey[800]}`,
        }}
      >
        <Toolbar>
          {/* {broken && (
            <>
              <IconButton
                sx={{ margin: "0 6 0 2" }}
                onClick={() => toggleSidebar()}
              >
                <AiOutlineMenu />
              </IconButton>
            </>
          )} */}
          {/* {collapsed && !broken && (
            <IconButton
              size="small"
              sx={{ ml: 0 }}
              onClick={() => collapseSidebar()}
            >
              <AiOutlineMenuUnfold />
            </IconButton>
          )} */}
          <IconButton
            size="small"
            sx={{ ml: 0 }}
            onClick={() => collapseSidebar()}
          >
            {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          </IconButton>
          {roleData !== 1 &&
            roleData !== 2 &&
            roleData !== 3 &&
            isAuthorizedFunc(GET_COUNT_LIVE_CALLS) && (
              <CardHeader
                avatar={
                  <IconButton
                    size="small"
                    edge="end"
                    sx={{ cursor: "not-allowed" }}
                  >
                    <CallCalling
                      color={colors.greenAccent[500]}
                      variant="Bold"
                    />
                  </IconButton>
                }
                title={liveCalls}
                subheader="Live"
              />
            )}
          {roleData !== 1 &&
            roleData !== 2 &&
            roleData !== 3 &&
            isAuthorizedFunc(GET_COMPLETE_CALLS) && (
              <CardHeader
                avatar={
                  <IconButton size="small" edge="end">
                    <CallReceived color={colors.blue[600]} variant="Bold" />
                  </IconButton>
                }
                title={totalCalls}
                subheader="Completed"
              />
            )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {roleData !== 1 &&
              roleData !== 2 &&
              roleData !== 3 &&
              isAuthorizedFunc(GET_BALANCE) && (
                <>
                  <Typography
                    variant="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.blue[100],
                    }}
                  >
                    {currency_symbol}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.layoutColor[200],
                      mr: 1,
                      ml: 1,
                    }}
                  >
                    {amount}
                  </Typography>
                </>
              )}
            {/* <Tooltip
                    title={
                      theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"
                    }
                    placement="bottom"
                    arrow
                  >
                    <IconButton
                      onClick={handleChangeMode}
                      sx={{ padding: 2 }}
                      size="medium"
                    >
                      {theme.palette.mode === "dark" ? (
                        <Sun1 size="20" />
                      ) : (
                        <Moon size="20" />
                      )}
                    </IconButton>
                  </Tooltip> */}
            <Tooltip title="Message" placement="bottom" arrow>
              <IconButton
                sx={{ padding: 2 }}
                size="medium"
                aria-label="show 4 new mails"
              >
                <Badge badgeContent={4} color="error">
                  <FcSms />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="News" placement="bottom" arrow>
              <IconButton sx={{ padding: 2 }} size="medium">
                <Badge>
                  <FcAdvertising />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Support" placement="bottom" arrow>
              <IconButton sx={{ padding: 2 }} size="medium">
                <Badge>
                  <FcCustomerSupport />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ padding: 2 }}>
                <FcBusinessman />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
              <Typography textAlign="center">
                Hi, {user_details?.name}
              </Typography>
              <Divider />
              {roleData !== (1 || 2 || 3) && (
                <>
                  <MenuItem onClick={handleAccount}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleSwitchAccount}>
                    <Typography textAlign="center">Switch</Typography>
                  </MenuItem>

                  {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="grouped-native-select">
                      Switch
                    </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      id="grouped-native-select"
                      label="Grouping"
                      size="small"
                    >
                      <optgroup label="Company 1">
                        <option value={1}>Admin</option>
                      </optgroup>
                      <optgroup label="Company 2">
                        <option value={2}>Publisher</option>
                        <option value={3}>Buyer</option>
                      </optgroup>
                      <optgroup label="Company 3">
                        <option value={3}>Buyer</option>
                      </optgroup>
                      <optgroup label="Company 4">
                        <option value={3}>Buyer</option>
                      </optgroup>
                      <optgroup label="Company 5">
                        <option value={2}>Publisher</option>
                      </optgroup>
                    </Select>
                  </FormControl> */}
                </>
              )}
              <MenuItem onClick={handleSettingPassword}>
                <Typography textAlign="center">Change Password</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <FiMoreVertical />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMobileMenu}
      </Box>
    </>
  );
};

export default Topbar;
