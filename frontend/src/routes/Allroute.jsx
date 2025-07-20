import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Pagenotfound from "../pages/Pagenotfound";
import Cardadd from "../pages/CardAdd";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import CardDetails from "../pages/CardDetails";
import AllUsers from "../pages/AllUsers";
import AllCards from "../pages/AllCards";
import { Ability } from "../components/Ability";
import Private from "../components/Private";
import AlertPage from "../pages/AlertPage";
import LoginOtp from "../pages/LoginOtp";
import VerifyOtp from "../pages/VerifyOtp";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/alert" element={<AlertPage />} />

        <Route path="/login-otp" element={<LoginOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/card-add"
          element={
            <Private>
              <Cardadd />
            </Private>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
        <Route
          path="/profile"
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
        <Route
          path="/cardDetails"
          element={
            <Private>
              <CardDetails />
            </Private>
          }
        />
        {Ability(["admin"]) && (
          <>
            <Route
              path="/AllUsers"
              element={
                <Private>
                  <AllUsers />
                </Private>
              }
            />
            <Route
              path="/AllCards"
              element={
                <Private>
                  <AllCards />
                </Private>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AllRoutes;
