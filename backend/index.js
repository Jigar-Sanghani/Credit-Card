const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const DB = require("./config/db");
const indexrouter = require("./routes/index_route");

dotenv.config();
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!!");
});

app.use("/api", indexrouter);

const PORT = process.env.PORT || 4454;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("http://localhost:4454/");

  DB();
});
