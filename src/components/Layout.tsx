import React from "react";
import Header from "./Header";
import AdminNav from "../admin/AdminNav";
import Footer from "./Footer";
import Routers from "../routers/Routers";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
