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

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card-add" element={<Cardadd />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cardDetails" element={<CardDetails />} />
        <Route path="*" element={<Pagenotfound />} />
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
