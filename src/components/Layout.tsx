import React, { Children } from "react";
import Header from "./Header";
import AdminNav from "../admin/AdminNav";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
