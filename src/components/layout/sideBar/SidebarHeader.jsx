import React from "react";
import { NavLink } from "react-router-dom";
import { useProSidebar } from "react-pro-sidebar";
import { IconButton, useTheme } from "@mui/material";
import { AiOutlineMenuFold } from "react-icons/ai";
import styled from "@emotion/styled";
import CallLogo from "../../../assets/images/CallLogo.png";
import { tokens } from "../../../assets/color/theme";

const StyledSidebarHeader = styled.div`
  height: 66px;
  min-height: 66px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div`
  width: 30px;
  min-width: 25px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

export const SidebarHeader = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { children, rtl, isBroken, ...rest } = props;

  const { collapseSidebar, toggleSidebar, collapsed } = useProSidebar();

  return (
    <StyledSidebarHeader
      style={{
        background: `linear-gradient(to right, ${colors.primary[100]}, ${colors.primary[200]})`,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "65px",
            paddingTop: 2,
          }}
        >
          {collapsed && (
            <StyledLogo>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                T
              </NavLink>
            </StyledLogo>
          )}

          {!collapsed && (
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <img
                src={CallLogo}
                alt="Call Analog"
                style={{
                  objectFit: "cover",
                  width: "190px",
                  height: "110px",
                }}
              />
            </NavLink>
          )}
        </div>
        <div>
          <IconButton
            size="small"
            onClick={isBroken ? () => toggleSidebar() : () => collapseSidebar()}
          >
            {!collapsed && <AiOutlineMenuFold />}
          </IconButton>
        </div>
      </div>
    </StyledSidebarHeader>
  );
};
