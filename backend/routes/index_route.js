const { Router } = require("express");
const userrouter = require("./user_route");

const indexrouter = Router();

indexrouter.use("/user", userrouter);

module.exports = indexrouter;
