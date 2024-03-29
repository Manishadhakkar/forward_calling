import React, { createContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material";
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
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin-right: 10px;
  margin-left: 4px;
`;

export const SidebarHeader = ({ collapsed, ...rest }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const SidebarContext = createContext({});
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState(undefined);

  return (
    <SidebarContext.Provider
      value={{
        sidebarBackgroundColor,
        setSidebarBackgroundColor,
      }}
    >
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
                    width: "100%",
                    height: "110px",
                  }}
                />
              </NavLink>
            )}
          </div>
        </div>
      </StyledSidebarHeader>
    </SidebarContext.Provider>
  );
};
