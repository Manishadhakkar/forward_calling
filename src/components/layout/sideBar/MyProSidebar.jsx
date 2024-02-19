import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { tokens } from "../../../assets/color/theme";
import { useTheme, Box, Typography, Tooltip, Zoom } from "@mui/material";
import {
  TbBrandCampaignmonitor,
  TbHome2,
  TbReportSearch,
  TbTargetArrow,
} from "react-icons/tb";
import { BiSolidReport } from "react-icons/bi";
import { SidebarHeader } from "./SidebarHeader";
import {
  Aave,
  Buildings2,
  Profile2User,
  Routing2,
  Setting4,
} from "iconsax-react";
import { HiOutlineHashtag } from "react-icons/hi2";
import { IoServerOutline } from "react-icons/io5";
import { LiaGoogleWallet } from "react-icons/lia";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BsFileEarmarkMusic } from "react-icons/bs";
import { MdOutlineAltRoute, MdRecordVoiceOver, MdReport } from "react-icons/md";
// import { SiGroupme } from "react-icons/si";
import { IoMdRecording } from "react-icons/io";
import { SlWallet } from "react-icons/sl";
import {
  GiCarrier,
  GiSatelliteCommunication,
  GiSecurityGate,
} from "react-icons/gi";
import {
  MdAppBlocking,
  MdOutlinePriceChange,
  MdOutlineSecurity,
} from "react-icons/md";
import { isAuthorizedFunc } from "../../../utility/utilty";
import {
  CREATE_WALLET_RECHARGE,
  GET_ALL_SEARCH_NUMBER,
  GET_BLOCK_RULE,
  GET_BUYER,
  GET_CAMPAIGN,
  GET_CARRIER,
  GET_COMPANY,
  GET_INVOICE,
  GET_IVR,
  GET_IVR_MEDIA,
  GET_NUMBER,
  GET_PUBLISHER,
  GET_ROLE,
  GET_ROLE_PERMISSION,
  GET_SERVERIP,
  GET_TARGET,
  GET_USER,
  GET_WALLET_RECHARGE,
  NUMBER_PURCHASE_LIST,
} from "../../../utility/constant";
import { FaFileInvoice, FaShopLock } from "react-icons/fa6";
import { GoNumber } from "react-icons/go";

const MyProSidebar = ({ collapsed }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const roleData = userData?.user_data?.roles[0]?.role_id;

  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const [url, setUrl] = useState("");

  let is_campaign_active =
    location.pathname === "/campaigns" ||
    location.pathname === "/campaigns/update-campaigns";

  let is_access_active =
    location.pathname === "/access/users" ||
    location.pathname === "/access/company" ||
    location.pathname === "/access/buyer" ||
    location.pathname === "/access/publisher";

  let is_authorized_active =
    location.pathname === "/auth/roles" ||
    location.pathname === "/auth/configuration";

  let is_wallet_active =
    location.pathname === "/wallet" || location.pathname === "/wallet/add";

  let is_report_active =
    location.pathname === "/report/live-calls" ||
    location.pathname === "/report/inbound";

  let is_ivr_active =
    location.pathname === "/ivr/media" ||
    location.pathname === "/ivr/ivr-route" ||
    location.pathname === "/ivr/manage-ivr";

  let is_number_active =
    location.pathname === "/purchase-number" ||
    location.pathname === "/purchase-number/invoice" ||
    location.pathname === "/numbers" ||
    location.pathname === "/purchase-number/invoice-number" ||
    location.pathname === "/purchase-number/invoice-number/crypto-payment" ||
    location.pathname === "/purchase-number/invoice-number/success" ||
    location.pathname === "/purchase-number/invoice-number/wallet-payment";

  let is_purchase_active =
    location.pathname === "/purchase-number" ||
    location.pathname === "/purchase-number/invoice" ||
    location.pathname === "/purchase-number/invoice-number" ||
    location.pathname === "/purchase-number/invoice-number/crypto-payment" ||
    location.pathname === "/purchase-number/invoice-number/success" ||
    location.pathname === "/purchase-number/invoice-number/wallet-payment";

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const [open, setOpen] = useState();

  const handleOpenSubMenu = (key) => {
    if (open === key) {
      setOpen(undefined);
    } else {
      setOpen(key);
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${colors.primary[100]}, ${colors.primary[200]})`,
        position: "sticky",
        display: "flex",
        height: "100vh !important",
        top: 0,
        bottom: 0,
        zIndex: 99,
        "& .ps-sidebar-root": {
          border: "none",
        },
        "& .ps-menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menuitem-root a:hover": {
          backgroundColor: "transparent !important",
          color: `${colors.blueAccent[500]} !important`,
        },
        "&& .ps-menu-button": {
          transition: "0.3s",
        },
        "&& .ps-menu-button :hover": {},
        "& .ps-menu-button.ps-active": {
          color: `${colors.greenAccent[400]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .ps-submenu-content": {
          background: `linear-gradient(to right, ${colors.primary[100]}, ${colors.primary[200]})`,
          borderRadius: "10px",
        },
      }}
    >
      <Sidebar breakPoint="md" collapsed={collapsed}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: `linear-gradient(to right, ${colors.primary[100]}, ${colors.primary[200]})`,
            borderRight: `1px solid ${colors.grey[800]}`,
          }}
        >
          <SidebarHeader rtl={true} collapsed={collapsed} />
          <div
            style={{
              flex: 1,
              marginBottom: "32px",
              overflowY: "auto",
            }}
          >
            <Menu>
              <MenuItem
                title="Dashboard"
                active={url === "/" ? true : false}
                icon={<TbHome2 size="23" />}
                component={<Link to={"/"} />}
                open={open === "dashboard"}
                onClick={() => handleOpenSubMenu("dashboard")}
              >
                Dashboard
              </MenuItem>
              {isAuthorizedFunc(GET_CAMPAIGN) && (
                <MenuItem
                  title="Campaigns"
                  active={is_campaign_active}
                  icon={<TbBrandCampaignmonitor size="23" />}
                  component={<Link to={"/campaigns"} />}
                  open={open === "campaigns"}
                  onClick={() => handleOpenSubMenu("campaigns")}
                >
                  Campaigns
                </MenuItem>
              )}
              {isAuthorizedFunc(GET_TARGET) && (
                <MenuItem
                  title="Targets"
                  active={url === "/targets" ? true : false}
                  icon={<TbTargetArrow size="25" />}
                  component={<Link to={"/targets"} />}
                  open={open === "targets"}
                  onClick={() => handleOpenSubMenu("targets")}
                >
                  Targets
                </MenuItem>
              )}
              {isAuthorizedFunc(GET_CARRIER) && (
                <MenuItem
                  title="Carriers"
                  active={url === "/carriers" ? true : false}
                  icon={<GiCarrier size="25" />}
                  component={<Link to={"/carriers"} />}
                  open={open === "carriers"}
                  onClick={() => handleOpenSubMenu("carriers")}
                >
                  Carriers
                </MenuItem>
              )}
              {isAuthorizedFunc(GET_SERVERIP) && (
                <MenuItem
                  title="Server IP"
                  active={url === "/serverip" ? true : false}
                  icon={<IoServerOutline size="25" />}
                  component={<Link to={"/serverip"} />}
                  open={open === "serverip"}
                  onClick={() => handleOpenSubMenu("serverip")}
                >
                  Server IP
                </MenuItem>
              )}
              {roleData !== 1 && (
                <>
                  {(isAuthorizedFunc(GET_ALL_SEARCH_NUMBER) ||
                    isAuthorizedFunc(NUMBER_PURCHASE_LIST) ||
                    isAuthorizedFunc(GET_INVOICE)) && (
                    <SubMenu
                      title="Numbers"
                      label="Numbers"
                      active={is_number_active}
                      icon={<HiOutlineHashtag size="25" />}
                      open={open === "numbers"}
                      onClick={() => handleOpenSubMenu("numbers")}
                    >
                      {isAuthorizedFunc(GET_ALL_SEARCH_NUMBER) && (
                        <MenuItem
                          active={url === "/numbers"}
                          component={<Link to="/numbers" />}
                          icon={<GoNumber size="20" variant="Outline" />}
                        >
                          Manage Number
                        </MenuItem>
                      )}
                      {isAuthorizedFunc(NUMBER_PURCHASE_LIST) && (
                        <MenuItem
                          active={is_purchase_active}
                          component={<Link to="/purchase-number" />}
                          icon={<MdOutlinePriceChange size="25" />}
                        >
                          Purchase Number
                        </MenuItem>
                      )}
                      {isAuthorizedFunc(GET_INVOICE) && (
                        <MenuItem
                          active={url === "/purchase-number/invoice-report"}
                          component={
                            <Link to="/purchase-number/invoice-report" />
                          }
                          icon={<FaFileInvoice size="20" variant="Outline" />}
                        >
                          Number Invoice
                        </MenuItem>
                      )}
                    </SubMenu>
                  )}
                </>
              )}
              {isAuthorizedFunc(GET_NUMBER) && (
                <MenuItem
                  title="DID Number"
                  active={url === "/did-numbers" ? true : false}
                  icon={<HiOutlineHashtag size="25" />}
                  component={<Link to={"/did-numbers"} />}
                  open={open === "did-numbers"}
                  onClick={() => handleOpenSubMenu("did-numbers")}
                >
                  DID Number
                </MenuItem>
              )}
              {roleData !== 1 && isAuthorizedFunc(GET_BLOCK_RULE) && (
                <MenuItem
                  title="Block Numbers"
                  active={url === "/block-number" ? true : false}
                  icon={<MdAppBlocking size="25" />}
                  component={<Link to={"/block-number"} />}
                  open={open === "block-number"}
                  onClick={() => handleOpenSubMenu("block-number")}
                >
                  Block Numbers
                </MenuItem>
              )}
              {roleData !== 1 && (
                <>
                  {(isAuthorizedFunc(CREATE_WALLET_RECHARGE) ||
                    isAuthorizedFunc(GET_WALLET_RECHARGE)) && (
                    <SubMenu
                      title="Wallet"
                      label="Wallet"
                      open={open === "wallet"}
                      active={is_wallet_active}
                      onClick={() => handleOpenSubMenu("wallet")}
                      icon={<SlWallet size="25" variant="Outline" />}
                    >
                      {isAuthorizedFunc(GET_WALLET_RECHARGE) && (
                        <MenuItem
                          active={url === "/wallet"}
                          component={<Link to="/wallet" />}
                          icon={
                            <RiFolderHistoryFill size="20" variant="Outline" />
                          }
                        >
                          Wallet
                        </MenuItem>
                      )}
                      {isAuthorizedFunc(CREATE_WALLET_RECHARGE) && (
                        <MenuItem
                          active={url === "/wallet/add"}
                          component={<Link to="/wallet/add" />}
                          icon={<LiaGoogleWallet size="20" variant="Outline" />}
                        >
                          Add Wallet
                        </MenuItem>
                      )}
                    </SubMenu>
                  )}
                </>
              )}
              {roleData !== 1 && (
                <SubMenu
                  label="Report"
                  title="Report"
                  open={open === "report"}
                  onClick={() => handleOpenSubMenu("report")}
                  active={is_report_active}
                  icon={<BiSolidReport size="25" variant="Outline" />}
                >
                  <MenuItem
                    active={url === "/report/inbound"}
                    component={<Link to="/report/inbound" />}
                    icon={<TbReportSearch size="20" variant="Outline" />}
                  >
                    Inbound Reports
                  </MenuItem>
                  <MenuItem
                    active={url === "/report/live-calls"}
                    component={<Link to="/report/live-calls" />}
                    icon={
                      <GiSatelliteCommunication size="20" variant="Outline" />
                    }
                  >
                    Live Calls
                  </MenuItem>
                </SubMenu>
              )}
              {roleData !== 1 && (
                <>
                  {(isAuthorizedFunc(GET_IVR) ||
                    isAuthorizedFunc(GET_IVR_MEDIA)) && (
                    <SubMenu
                      title="IVR"
                      label="IVR"
                      active={is_ivr_active}
                      open={open === "ivr"}
                      onClick={() => handleOpenSubMenu("ivr")}
                      icon={<MdOutlineAltRoute size="25" variant="Outline" />}
                    >
                      {isAuthorizedFunc(GET_IVR_MEDIA) && (
                        <MenuItem
                          active={url === "/ivr/media"}
                          component={<Link to="/ivr/media" />}
                          icon={
                            <BsFileEarmarkMusic size="20" variant="Outline" />
                          }
                        >
                          Manage Media
                        </MenuItem>
                      )}
                      {isAuthorizedFunc(GET_IVR) && (
                        <MenuItem
                          active={url === "/ivr/manage-ivr"}
                          component={<Link to="/ivr/manage-ivr" />}
                          icon={
                            <MdRecordVoiceOver size="20" variant="Outline" />
                          }
                        >
                          Manage Ivr
                        </MenuItem>
                      )}
                      <MenuItem
                        active={url === "/ivr/ivr-route"}
                        component={<Link to="/ivr/ivr-route" />}
                        icon={<Routing2 size="20" variant="Outline" />}
                      >
                        Ivr Target Route
                      </MenuItem>
                    </SubMenu>
                  )}
                </>
              )}
              {(isAuthorizedFunc(GET_USER) ||
                isAuthorizedFunc(GET_BUYER) ||
                isAuthorizedFunc(GET_PUBLISHER) ||
                isAuthorizedFunc(GET_COMPANY)) && (
                <SubMenu
                  title="Access"
                  label="Access"
                  active={is_access_active}
                  open={open === "access"}
                  onClick={() => handleOpenSubMenu("access")}
                  icon={<Aave size="25" variant="Outline" />}
                >
                  {isAuthorizedFunc(GET_USER) && (
                    <MenuItem
                      active={url === "/access/users"}
                      component={<Link to="/access/users" />}
                      icon={<Profile2User size="20" variant="Outline" />}
                    >
                      Users
                    </MenuItem>
                  )}
                  {isAuthorizedFunc(GET_COMPANY) && (
                    <MenuItem
                      active={url === "/access/company"}
                      component={<Link to="/access/company" />}
                      icon={<Buildings2 size="20" variant="Outline" />}
                    >
                      Company
                    </MenuItem>
                  )}
                  {isAuthorizedFunc(GET_BUYER) && (
                    <MenuItem
                      active={url === "/access/buyer"}
                      component={<Link to="/access/buyer" />}
                      icon={<FaShopLock size="20" variant="Outline" />}
                    >
                      Buyer
                    </MenuItem>
                  )}
                  {isAuthorizedFunc(GET_PUBLISHER) && (
                    <MenuItem
                      active={url === "/access/publisher"}
                      component={<Link to="/access/publisher" />}
                      icon={<Buildings2 size="25" variant="Outline" />}
                    >
                      Publisher
                    </MenuItem>
                  )}
                </SubMenu>
              )}
              {(isAuthorizedFunc(GET_ROLE) ||
                isAuthorizedFunc(GET_ROLE_PERMISSION)) && (
                <SubMenu
                  title="Authorization"
                  label="Authorization"
                  active={is_authorized_active}
                  open={open === "auth"}
                  onClick={() => handleOpenSubMenu("auth")}
                  icon={<Setting4 size="25" variant="Outline" />}
                >
                  {isAuthorizedFunc(GET_ROLE) && (
                    <MenuItem
                      active={url === "/auth/roles"}
                      component={<Link to="/auth/roles" />}
                      icon={<MdOutlineSecurity size="20" variant="Outline" />}
                    >
                      Roles
                    </MenuItem>
                  )}
                  {isAuthorizedFunc(GET_ROLE_PERMISSION) && (
                    <MenuItem
                      active={url === "/auth/configuration"}
                      component={<Link to="/auth/configuration" />}
                      icon={<GiSecurityGate size="20" variant="Outline" />}
                    >
                      Role Function Map
                    </MenuItem>
                  )}
                </SubMenu>
              )}
            </Menu>
          </div>
        </div>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
