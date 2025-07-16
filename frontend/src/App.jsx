import React from "react";
import AllRoutes from "./routes/Allroute";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <div>
      <Navigation/>
      <AllRoutes />
    </div>
  );
};

export default App;
