import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Assets
import logo from "../assets/images/eco-logo.png";
import user_icon from "../assets/images/user-icon.png";
import { selectTotalAmount } from "../redux/selectors";
// Components
import { Link, NavLink } from "react-router-dom";
import Icons from "./Icons";

const menu_items = [
  {
    id: 0,
    text: "Home",
    to: "/",
  },
  {
    id: 1,
    text: "Shop",
    to: "/shop",
  },
  {
    id: 2,
    text: "Cart",
    to: "/cart",
  },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const totalAmount = useSelector(selectTotalAmount);
  return (
    <header className="h-[80px]">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="container flex justify-between items-center py-5">
          <Link to="/" className="flex gap-1 items-center">
            <img src={logo} alt="" className="w-6 h-auto" />
            <span className="font-bold">Multimart</span>
          </Link>
          <div
            className={`fixed inset-0 flex flex-col justify-center items-center bg-gray-700 text-white opacity-90 gap-5 z-20 transition-all duration-300 ease-linear ${
              showMenu ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0 md:static md:text-black md:bg-transparent md:flex-row`}
            id="menu"
          >
            {menu_items.map((menu_item) => (
              <NavLink
                to={menu_item.to}
                key={menu_item.id}
                className="menu-item"
              >
                {menu_item.text}
              </NavLink>
            ))}
          </div>
          <div className="flex gap-6 items-center">
            <NavLink to="/favorite" className="relative">
              <Icons.Heart />
              <span className="absolute top-0 right-0 translate-x-3/4 -translate-y-3/4 w-5 h-5 rounded-[50%] flex justify-center items-center text-sm text-white bg-red-600">
                10
              </span>
            </NavLink>
            <NavLink to="/cart" className="relative">
              <Icons.Bag />
              <span className="absolute top-0 right-0 translate-x-3/4 -translate-y-3/4 w-5 h-5 rounded-[50%] flex justify-center items-center text-sm text-white bg-red-600">
                {totalAmount}
              </span>
            </NavLink>
            <NavLink to="/login" className="relative">
              <img src={user_icon} alt="" className="w-8 h-8 rounded-[50%]" />
            </NavLink>
          </div>
          <button
            className="outline-none border-none flex justify-center items-center md:hidden z-30"
            id="btn-toggle"
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            <Icons.Bars></Icons.Bars>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
