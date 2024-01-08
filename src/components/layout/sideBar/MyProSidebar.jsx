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
import { TbBrandCampaignmonitor, TbHome2, TbTargetArrow } from "react-icons/tb";
import { SidebarHeader } from "./SidebarHeader";
import { Aave, Buildings2, Profile2User, Setting4 } from "iconsax-react";
import { HiOutlineHashtag } from "react-icons/hi2";
import { IoServerOutline } from "react-icons/io5";
import { SiGroupme } from "react-icons/si";
import { GiCarrier, GiSecurityGate } from "react-icons/gi";
import {
  MdAppBlocking,
  MdOutlinePriceChange,
  MdOutlineSecurity,
} from "react-icons/md";
import { isAuthorizedFunc } from "../../../utility/utilty";
import {
  GET_BUYER,
  GET_CAMPAIGN,
  GET_CARRIER,
  GET_COMPANY,
  GET_NUMBER,
  GET_PUBLISHER,
  GET_ROLE,
  GET_ROLE_PERMISSION,
  GET_SERVERIP,
  GET_TARGET,
  GET_USER,
} from "../../../utility/constant";
import { FaShopLock } from "react-icons/fa6";

const MyProSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const { broken, collapsed } = useProSidebar();
  const [url, setUrl] = useState("");

  let is_campaign_active =
    location.pathname === "/campaigns" ||
    location.pathname === "/campaigns/configuration";

  let is_access_active =
    location.pathname === "/access/users" ||
    location.pathname === "/access/company" ||
    location.pathname === "/access/buyer";

  let is_authorized_active =
    location.pathname === "/auth/roles" ||
    location.pathname === "/auth/configuration";

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh !important",
        top: 0,
        bottom: 0,
        zIndex: 99,
        borderRight: `0.5px solid ${colors.borderColor[100]}`,
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
          backgroundColor: colors.layoutColor[100],
        },
      }}
    >
      <Sidebar breakPoint="md" backgroundColor={colors.layoutColor[100]}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader rtl={true} isBroken={broken} />
          <div
            style={{
              flex: 1,
              marginBottom: "32px",
              borderTop: `1px solid ${colors.borderColor[100]}`,
              overflowY: "scroll",
            }}
          >
            <Box sx={{ color: colors.layoutColor[200] }}>
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
                <Tooltip
                  title={collapsed && "Purchase Number"}
                  placement="right"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <MenuItem
                    active={url === "/purchase-number" ? true : false}
                    icon={<MdOutlinePriceChange size="25" />}
                    component={<Link to={"/purchase-number"} />}
                  >
                    <Typography>{"Purchase Number"}</Typography>
                  </MenuItem>
                </Tooltip>
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
                <Tooltip
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
                </Tooltip>
                <Tooltip
                  title={collapsed && "Block Numbers"}
                  placement="right"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <MenuItem
                    active={url === "/block-number" ? true : false}
                    icon={<MdAppBlocking size="25" />}
                    component={<Link to={"/block-number"} />}
                  >
                    <Typography>{"Block Numbers"}</Typography>
                  </MenuItem>
                </Tooltip>

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
