import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Sidebar,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
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
import { Aave, Buildings2, Profile2User, Setting4 } from "iconsax-react";
import { HiOutlineHashtag } from "react-icons/hi2";
import { IoServerOutline } from "react-icons/io5";
import { LiaGoogleWallet } from "react-icons/lia";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BsFileEarmarkMusic } from "react-icons/bs";
import { MdRecordVoiceOver, MdReport } from "react-icons/md";
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

const MyProSidebar = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const roleData = userData?.user_data?.roles[0]?.role_id;

  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const { broken, collapsed } = useProSidebar();
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
          backgroundColor: "inherit",
        },
      }}
    >
      <Sidebar breakPoint="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: `linear-gradient(to right, ${colors.primary[100]}, ${colors.primary[200]})`,
            borderRight: `1px solid ${colors.grey[800]}`
          }}
        >
          <SidebarHeader rtl={true} isBroken={broken} />
          <div
            style={{
              flex: 1,
              marginBottom: "32px",
              overflowY: "auto",
            }}
          >
            <Box>
              <Menu>
                <Tooltip
                  title={collapsed && "Dashboard"}
                  placement="right"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <MenuItem
                    active={url === "/" ? true : false}
                    icon={<TbHome2 size="23" />}
                    component={<Link to={"/"} />}
                  >
                    <Typography>{"Dashboard"}</Typography>
                  </MenuItem>
                </Tooltip>
                {isAuthorizedFunc(GET_CAMPAIGN) && (
                  <Tooltip
                    title={collapsed && "Campaigns"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <MenuItem
                      active={is_campaign_active}
                      icon={<TbBrandCampaignmonitor size="23" />}
                      component={<Link to={"/campaigns"} />}
                    >
                      <Typography>{"Campaigns"}</Typography>
                    </MenuItem>
                  </Tooltip>
                )}
                {isAuthorizedFunc(GET_TARGET) && (
                  <Tooltip
                    title={collapsed && "Targets"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <MenuItem
                      active={url === "/targets" ? true : false}
                      icon={<TbTargetArrow size="25" />}
                      component={<Link to={"/targets"} />}
                    >
                      <Typography>{"Targets"}</Typography>
                    </MenuItem>
                  </Tooltip>
                )}
                {isAuthorizedFunc(GET_CARRIER) && (
                  <Tooltip
                    title={collapsed && "Carriers"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <MenuItem
                      active={url === "/carriers" ? true : false}
                      icon={<GiCarrier size="25" />}
                      component={<Link to={"/carriers"} />}
                    >
                      <Typography>{"Carriers"}</Typography>
                    </MenuItem>
                  </Tooltip>
                )}
                {isAuthorizedFunc(GET_SERVERIP) && (
                  <Tooltip
                    title={collapsed && "Server IP"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <MenuItem
                      active={url === "/serverip" ? true : false}
                      icon={<IoServerOutline size="25" />}
                      component={<Link to={"/serverip"} />}
                    >
                      <Typography>{"Server IP"}</Typography>
                    </MenuItem>
                  </Tooltip>
                )}
                {roleData !== 1 && (
                  <Tooltip
                    title={collapsed && "Number"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    {(isAuthorizedFunc(GET_ALL_SEARCH_NUMBER) ||
                      isAuthorizedFunc(NUMBER_PURCHASE_LIST) ||
                      isAuthorizedFunc(GET_INVOICE)) && (
                      <SubMenu
                        label="Numbers"
                        active={is_number_active}
                        defaultOpen={is_number_active}
                        icon={<HiOutlineHashtag size="25" />}
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
                  </Tooltip>
                )}
                {isAuthorizedFunc(GET_NUMBER) && (
                  <Tooltip
                    title={collapsed && "DID Number"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <MenuItem
                      active={url === "/did-numbers" ? true : false}
                      icon={<HiOutlineHashtag size="25" />}
                      component={<Link to={"/did-numbers"} />}
                    >
                      <Typography>{"DID Number"}</Typography>
                    </MenuItem>
                  </Tooltip>
                )}
                {/* <Tooltip
                  title={collapsed && "Group"}
                  placement="right"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <MenuItem
                    active={url === "/group" ? true : false}
                    icon={<SiGroupme size="25" />}
                    component={<Link to={"/group"} />}
                  >
                    <Typography>{"Group"}</Typography>
                  </MenuItem>
                </Tooltip> */}
                {roleData !== 1 && (
                  <Tooltip
                    title={collapsed && "Block Numbers"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    {isAuthorizedFunc(GET_BLOCK_RULE) && (
                      <MenuItem
                        active={url === "/block-number" ? true : false}
                        icon={<MdAppBlocking size="25" />}
                        component={<Link to={"/block-number"} />}
                      >
                        <Typography>{"Block Numbers"}</Typography>
                      </MenuItem>
                    )}
                  </Tooltip>
                )}
                {roleData !== 1 && (
                  <Tooltip
                    title={collapsed && "Wallet"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    {(isAuthorizedFunc(CREATE_WALLET_RECHARGE) ||
                      isAuthorizedFunc(GET_WALLET_RECHARGE)) && (
                      <SubMenu
                        label="Wallet"
                        active={is_wallet_active}
                        defaultOpen={is_wallet_active}
                        icon={<SlWallet size="25" variant="Outline" />}
                      >
                        {isAuthorizedFunc(GET_WALLET_RECHARGE) && (
                          <MenuItem
                            active={url === "/wallet"}
                            component={<Link to="/wallet" />}
                            icon={
                              <RiFolderHistoryFill
                                size="20"
                                variant="Outline"
                              />
                            }
                          >
                            Wallet
                          </MenuItem>
                        )}
                        {isAuthorizedFunc(CREATE_WALLET_RECHARGE) && (
                          <MenuItem
                            active={url === "/wallet/add"}
                            component={<Link to="/wallet/add" />}
                            icon={
                              <LiaGoogleWallet size="20" variant="Outline" />
                            }
                          >
                            Add Wallet
                          </MenuItem>
                        )}
                      </SubMenu>
                    )}
                  </Tooltip>
                )}
                {roleData !== 1 && (
                  <Tooltip
                    title={collapsed && "Reports"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <SubMenu
                      label="Report"
                      active={is_report_active}
                      defaultOpen={is_report_active}
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
                          <GiSatelliteCommunication
                            size="20"
                            variant="Outline"
                          />
                        }
                      >
                        Live Calls
                      </MenuItem>
                    </SubMenu>
                  </Tooltip>
                )}
                {roleData !== 1 && (
                  <Tooltip
                    title={collapsed && "IVR"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    {(isAuthorizedFunc(GET_IVR) ||
                      isAuthorizedFunc(GET_IVR_MEDIA)) && (
                      <SubMenu
                        label="IVR"
                        active={is_ivr_active}
                        defaultOpen={is_ivr_active}
                        icon={<MdRecordVoiceOver size="25" variant="Outline" />}
                      >
                        {isAuthorizedFunc(GET_IVR_MEDIA) && (
                          <MenuItem
                            active={url === "/ivr/media"}
                            component={<Link to="/ivr/media" />}
                            icon={
                              <BsFileEarmarkMusic size="20" variant="Outline" />
                            }
                          >
                            Media
                          </MenuItem>
                        )}
                        {isAuthorizedFunc(GET_IVR) && (
                          <MenuItem
                            active={url === "/ivr/manage-ivr"}
                            component={<Link to="/ivr/manage-ivr" />}
                            icon={<IoMdRecording size="20" variant="Outline" />}
                          >
                            Manage Ivr
                          </MenuItem>
                        )}
                      </SubMenu>
                    )}
                  </Tooltip>
                )}
                {(isAuthorizedFunc(GET_USER) ||
                  isAuthorizedFunc(GET_BUYER) ||
                  isAuthorizedFunc(GET_PUBLISHER) ||
                  isAuthorizedFunc(GET_COMPANY)) && (
                  <Tooltip
                    title={collapsed && "Access"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <SubMenu
                      label="Access"
                      active={is_access_active}
                      defaultOpen={is_access_active}
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
                  </Tooltip>
                )}
                {(isAuthorizedFunc(GET_ROLE) ||
                  isAuthorizedFunc(GET_ROLE_PERMISSION)) && (
                  <Tooltip
                    title={collapsed && "Authorization"}
                    placement="right"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <SubMenu
                      label="Authorization"
                      active={is_authorized_active}
                      defaultOpen={is_authorized_active}
                      icon={<Setting4 size="25" variant="Outline" />}
                    >
                      {isAuthorizedFunc(GET_ROLE) && (
                        <MenuItem
                          active={url === "/auth/roles"}
                          component={<Link to="/auth/roles" />}
                          icon={
                            <MdOutlineSecurity size="20" variant="Outline" />
                          }
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
                  </Tooltip>
                )}
              </Menu>
            </Box>
          </div>
        </div>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
