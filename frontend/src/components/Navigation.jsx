import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Ability } from "./Ability";

const Navigation = () => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

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
    alert("User logged out successfully!");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/card-add"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Card
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {user.name}
                </Link>
                <p
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logOut}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </p>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}

            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>

            {Ability(["admin"]) && (
              <>
                <Link
                  to="/AllUsers"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  All Users
                </Link>
                <Link
                  to="/AllCards"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  All Cards
                </Link>
              </>
            )}
          </div>

          <form className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
