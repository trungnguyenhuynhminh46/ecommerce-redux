import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
// Assets
import logo from "../assets/images/eco-logo.png";
import user_icon from "../assets/images/user-icon.png";
import { auth, db } from "../share/firebase";
import { selectFavoriteItems, selectTotalAmount } from "../redux/selectors";
// Components
import { Link, NavLink } from "react-router-dom";
import Icons from "./Icons";
import { useAuth } from "../context/authContext";

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
  const favoriteProducts = useSelector(selectFavoriteItems);
  const { currentUser } = useAuth();
  const totalAmount = useSelector(selectTotalAmount);
  // State
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();
  // Effect
  useEffect(() => {
    (async () => {
      if (currentUser?.uid) {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          setUserInfo({ uid: docSnap.id, ...docSnap.data() });
        }
      }
    })();
  }, [currentUser]);
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
                {favoriteProducts.length}
              </span>
            </NavLink>
            <NavLink to="/cart" className="relative">
              <Icons.Bag />
              <span className="absolute top-0 right-0 translate-x-3/4 -translate-y-3/4 w-5 h-5 rounded-[50%] flex justify-center items-center text-sm text-white bg-red-600">
                {totalAmount}
              </span>
            </NavLink>
            {userInfo?.uid ? (
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  setShowOptions((prev) => !prev);
                }}
              >
                <img
                  src={
                    userInfo.photoURL ? userInfo.photoURL : "/placeholder.png"
                  }
                  alt=""
                  className="w-8 h-8 rounded-[50%]"
                />
                <div
                  className={`flex flex-col p-2 bg-white absolute right-0 bottom-0 translate-y-full shadow-lg rounded transition-all duration-300 ease-linear ${
                    showOptions ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="whitespace-nowrap">
                    <Link
                      to="/orders"
                      className="w-full inline-block py-2 px-4 hover:bg-gray-100 border-b border-solid border-gray-200 transition-all duration-300 ease-linear"
                    >
                      Orders
                    </Link>
                  </div>
                  {(userInfo.role == "admin" || userInfo.role == "tester") && (
                    <div className="whitespace-nowrap">
                      <Link
                        to="/dashboard"
                        className="w-full inline-block py-2 px-4 hover:bg-gray-100 border-b border-solid border-gray-200 transition-all duration-300 ease-linear"
                      >
                        Dashboard
                      </Link>
                    </div>
                  )}

                  <div className="whitespace-nowrap">
                    <a
                      href="#"
                      className="w-full inline-block py-2 px-4 hover:bg-gray-100 transition-all duration-300 ease-linear"
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
            ) : (
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  setShowOptions((prev) => !prev);
                }}
              >
                <img src={user_icon} alt="" className="w-8 h-8 rounded-[50%]" />
                <div
                  className={`flex flex-col p-2 bg-white absolute right-0 bottom-0 translate-y-[100px] shadow-lg rounded transition-all duration-300 ease-linear ${
                    showOptions ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div>
                    <Link
                      to="/login"
                      className="w-full inline-block py-2 px-4 hover:bg-gray-100 border-b border-solid border-gray-200 transition-all duration-300 ease-linear whitespace-nowrap"
                    >
                      Login
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/register"
                      className="w-full inline-block py-2 px-4 hover:bg-gray-100 border-b border-solid border-gray-200 transition-all duration-300 ease-linear whitespace-nowrap"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            )}
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
