import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Ability } from "./Ability";
import { toast } from "react-toastify";
import { Bell, Search } from "lucide-react";

const Navigation = () => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const userDropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);

  useEffect(() => {
    const userFromCookie = Cookies.get("user");
    if (userFromCookie) {
      try {
        setUser(JSON.parse(userFromCookie));
      } catch (err) {
        console.error("Failed to parse user cookie", err);
      }
    }
  }, []);

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("User logged out successfully!");
    nav("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target)
      ) {
        setAdminDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      setShowTopButton(window.scrollY > 100);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="top-0 left-0 right-0 z-50 bg-white shadow-lg px-6 py-3 rounded-none select-none">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => nav("/")}
          >
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
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/card-add" className="hover:text-blue-600">
              Add Card
            </Link>
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>

            {Ability(["admin"]) && (
              <div className="relative" ref={adminDropdownRef}>
                <span
                  onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Admin
                </span>
                {adminDropdownOpen && (
                  <div className="absolute mt-2 w-40 bg-white shadow-md rounded-md border z-10">
                    <Link
                      to="/AllUsers"
                      className="block px-4 py-2 hover:bg-gray-100  hover:text-blue-600 cursor-pointer"
                    >
                      All Users
                    </Link>
                    <Link
                      to="/AllCards"
                      className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
                    >
                      All Cards
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-32 h-9 pl-9 pr-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            </div>

            <button
              onClick={() => nav("/alert")}
              className="p-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              title="Alerts"
            >
              <Bell className="h-4 w-4" />
            </button>

            <div className="relative" ref={userDropdownRef}>
              <span
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="text-indigo-600 font-semibold text-lg hover:text-indigo-700 cursor-pointer"
              >
                {user ? user.name : "User"}
              </span>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border z-10">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logOut}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:text-white-600 hover:bg-red-100 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-10 h-10 bg-white border border-black text-black font-extrabold text-xl rounded shadow hover:bg-gray-100 transition flex items-center justify-center cursor-pointer"
          title="Scroll to Top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Navigation;
