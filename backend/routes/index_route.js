const { Router } = require("express");
const userrouter = require("./user_route");
const cardRouter = require("./card_route");

const indexrouter = Router();

indexrouter.use("/user", userrouter);
indexrouter.use("/card", cardRouter);

module.exports = indexrouter;
