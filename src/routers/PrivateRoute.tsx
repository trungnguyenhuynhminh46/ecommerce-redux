import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";

// interface PropsPrivateRoute {
//   children: ReactNode;
// }

const PrivateRoute: React.FC = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
