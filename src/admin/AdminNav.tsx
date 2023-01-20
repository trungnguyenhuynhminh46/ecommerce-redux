import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../share/firebase";
// Assets
import logo from "../assets/images/eco-logo.png";
// Components

const AdminNav = () => {
  const { currentUser } = useAuth();
  // States
  const [mainSearch, setMainSearch] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  // Effects

  return (
    <>
      {/* Header */}
      <header className="bg-deep-blue text-white">
        <div className="container">
          <div className="flex gap-14 py-5">
            <Link to="/" className="flex gap-1 items-center">
              <img src={logo} alt="" className="w-6 h-auto invert" />
              <span className="font-bold">Multimart</span>
            </Link>
            <input
              type="text"
              placeholder="Search products by product name..."
              className="flex-1 outline-none px-2 rounded text-black"
              value={mainSearch}
              onChange={(e) => {
                setMainSearch(e.target.value);
              }}
            />
            <div
              className="relative cursor-pointer"
              onClick={() => {
                setShowOptions((prev) => !prev);
              }}
            >
              <img
                src={
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : "/placeholder.png"
                }
                alt=""
                className="w-8 h-8 rounded-[50%]"
              />
              <div
                className={`flex flex-col p-2 bg-white absolute right-0 bottom-0 translate-y-[100px] shadow-lg rounded transition-all duration-300 ease-linear ${
                  showOptions ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <div>
                  <Link
                    to="/dashboard"
                    className="w-full inline-block py-2 px-4 hover:bg-gray-100 border-b border-solid border-gray-200 transition-all duration-300 ease-linear text-black"
                  >
                    Dashboard
                  </Link>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-block py-2 px-4 hover:bg-gray-100 transition-all duration-300 ease-linear text-black"
                    onClick={() => {
                      signOut(auth);
                      setShowOptions(false);
                    }}
                  >
                    Log out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-blue-200 py-4">
        <div className="container">
          <div className="flex justify-center gap-4">
            <NavLink to="/dashboard" end className="admin-nav-tab">
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/dashboard/products" className="admin-nav-tab">
              <span>Products</span>
            </NavLink>
            <NavLink to="/dashboard/categories" className="admin-nav-tab">
              <span>Categories</span>
            </NavLink>
            <NavLink to="/dashboard/orders" className="admin-nav-tab">
              <span>Orders</span>
            </NavLink>
            <NavLink to="/dashboard/users" className="admin-nav-tab">
              <span>Users</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
