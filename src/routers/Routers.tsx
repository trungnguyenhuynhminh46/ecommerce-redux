import React from "react";
// Pages
import {
  Cart,
  CheckOut,
  Home,
  Login,
  ProductDetails,
  Shop,
  SignUp,
} from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;
