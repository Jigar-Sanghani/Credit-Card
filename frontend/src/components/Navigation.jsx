import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Bell, Search } from "lucide-react";
import { Ability } from "./Ability";
import { getAlertCount, areAlertsSeen } from "../utils/cookieUtils";

const Navigation = () => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [alertCount, setAlertCount] = useState(0);
  const [alertsSeen, setAlertsSeen] = useState(true);

  const userDropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  useEffect(() => {
    const userFromCookie = Cookies.get("user");
    if (userFromCookie) {
      try {
        setUser(JSON.parse(userFromCookie));
      } catch (err) {
        console.error("Failed to parse user cookie", err);
      }
    }

    const updateAlertState = () => {
      setAlertCount(getAlertCount());
      setAlertsSeen(areAlertsSeen());
    };

    updateAlertState();

    const interval = setInterval(updateAlertState, 3000);
    window.addEventListener("alertChange", updateAlertState);

    return () => {
      clearInterval(interval);
      window.removeEventListener("alertChange", updateAlertState);
    };
  }, []);

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("User logged out successfully!");
    nav("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setAdminDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 w-full z-50 fixed top-0 left-0 right-0">
      <div className="flex justify-between items-center">
        <div onClick={() => nav("/")} className="flex items-center cursor-pointer gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6963/6963703.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            CCM
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/card-add" className="hover:text-blue-600">Add Card</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>

          {Ability(["admin"]) && (
            <div className="relative" ref={adminDropdownRef}>
              <span onClick={() => setAdminDropdownOpen(!adminDropdownOpen)} className="hover:text-blue-600 cursor-pointer">
                Admin
              </span>
              {adminDropdownOpen && (
                <div className="absolute mt-2 w-40 bg-white shadow-md rounded-md border z-10">
                  <Link to="/AllUsers" className="block px-4 py-2 hover:bg-gray-100">All Users</Link>
                  <Link to="/AllCards" className="block px-4 py-2 hover:bg-gray-100">All Cards</Link>
                  <Link to="/AllTransaction" className="block px-4 py-2 hover:bg-gray-100">All Transactions</Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input type="text" placeholder="Search" className="w-32 h-9 pl-9 pr-3 border border-gray-300 rounded-md text-sm" />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <button
            onClick={() => nav("/alert")}
            className="relative p-2 rounded bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
            title="Alerts"
          >
            <Bell className="h-4 w-4" />
            {alertCount > 0 && !alertsSeen && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-black rounded-full" />
            )}
          </button>

          <div className="relative" ref={userDropdownRef}>
            <span onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="text-indigo-600 font-semibold text-lg hover:text-indigo-700 cursor-pointer">
              {user ? user.name : "User"}
            </span>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border z-10">
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    <button onClick={logOut} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                    <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">Signup</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
