import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Pagenotfound from "../pages/Pagenotfound";
import Cardadd from "../pages/CardAdd";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/card-add" element={<Cardadd />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
