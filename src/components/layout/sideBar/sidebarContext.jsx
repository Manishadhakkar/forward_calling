import React, { useState, createContext, useContext } from "react";
import MyProSidebar from "./MyProSidebar";

const SidebarContext = createContext({});

export const MyProSidebarProvider = ({ collapsed,children }) => {

  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState(undefined);

  return (
    <SidebarContext.Provider
      value={{
        sidebarBackgroundColor,
        setSidebarBackgroundColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "white",
        }}
      >
        <MyProSidebar collapsed={collapsed} />
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
