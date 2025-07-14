const express = require("express");
const DB = require("./config/db");
const indexrouter = require("./routes/index_route");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("working!!");
});

app.use("/api", indexrouter);

app.listen(8090, () => {
  console.log("Server Run In 8090 !!");
  DB();
});
