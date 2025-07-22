const { Router } = require("express");
const userrouter = require("./user_route");
const cardRouter = require("./card_route");
const transactionRouter = require("./transacttion_route");

const indexrouter = Router();

indexrouter.use("/user", userrouter);
indexrouter.use("/card", cardRouter);
indexrouter.use("/transaction", transactionRouter);

module.exports = indexrouter;
