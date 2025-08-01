import React from "react";
import AllRoutes from "./routes/Allroute";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="pt-16">
      <Navigation />
      <AllRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
