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
import AddCategory from "../admin/AddCategory";
import AddProduct from "../admin/AddProduct";
import UpdateCategory from "../admin/UpdateCategory";
import UpdateProduct from "../admin/UpdateProduct";
import Users from "../admin/Users";
import Dashboard from "../pages/Dashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/*" element={<PrivateRoute />}>
        <Route path="checkout" element={<CheckOut />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/products" element={<Products />} />
        <Route path="dashboard/orders" element={<Orders />} />
        <Route path="dashboard/add_product" element={<AddProduct />} />
        <Route path="dashboard/products/:id" element={<UpdateProduct />} />
        <Route path="dashboard/categories" element={<Categories />} />
        <Route path="dashboard/add_category" element={<AddCategory />} />
        <Route path="dashboard/categories/:id" element={<UpdateCategory />} />
        <Route path="dashboard/users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
  );
};

export default Routers;
