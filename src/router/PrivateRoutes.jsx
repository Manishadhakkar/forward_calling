import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" replace={true} />
  );
};

export default PrivateRoutes;