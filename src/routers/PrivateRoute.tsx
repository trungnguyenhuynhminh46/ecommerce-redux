import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface PropsPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: React.FC<PropsPrivateRoute> = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
