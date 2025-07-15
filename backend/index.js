const express = require("express");

const cors = require("cors");
const DB = require("./config/db");
const indexrouter = require("./routes/index_route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working!!");
});

app.use("/api", indexrouter);

app.listen(8090, () => {
  console.log("Server Run In 8090 !!");
  DB();
});
