const express = require("express");
const DB = require("./config/db");
const app = express();

app.use(express.json());  

app.get("/", (req, res) => {
  res.send("working!!");
});


app.listen(8090, () => {
  console.log("Server Run In 8090 !!");
  DB();
});
