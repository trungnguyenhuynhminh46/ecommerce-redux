import React from "react";
// Pages
import {
  Cart,
  CheckOut,
  Home,
  Login,
  ProductDetails,
  Shop,
  Register,
  Reset,
} from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// Admin pages
import Categories from "../admin/Categories";
import Products from "../admin/Products";
import Orders from "../admin/Orders";
import AddCategory from "../admin/Categories";
import AddProduct from "../admin/AddProduct";
import UpdateProduct from "../admin/UpdateProduct";
import Users from "../admin/Users";
import Dashboard from "../admin/Dashboard";
import ShowOrders from "../pages/ShowOrders";
import { useAuth } from "../context/authContext";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/*" element={<PrivateRoute />}>
        <Route path="checkout" element={<CheckOut />} />
        <Route path="orders" element={<ShowOrders />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/orders" element={<Orders />} />
        <Route path="dashboard/products" element={<Products />} />
        <Route path="dashboard/products/add_product" element={<AddProduct />} />
        <Route path="dashboard/products/:id" element={<UpdateProduct />} />
        <Route path="dashboard/categories" element={<Categories />} />
        <Route path="dashboard/users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
  );
};

export default Routers;
