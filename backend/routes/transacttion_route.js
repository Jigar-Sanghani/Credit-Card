const { Router } = require("express");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const {
  getAllTransactionsAdmin,
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transaction_controller");

const transactionRouter = Router();

transactionRouter.post("/create", verifyToken, createTransaction);
transactionRouter.get("/all/:cardId", verifyToken, getAllTransactions);
transactionRouter.get("/:id", verifyToken, getTransactionById);
transactionRouter.put("/update/:id", verifyToken, updateTransaction);
transactionRouter.delete("/delete/:id", verifyToken, deleteTransaction);

transactionRouter.get(
  "/admin/all",
  verifyToken,
  isAdmin,
  getAllTransactionsAdmin
);

module.exports = transactionRouter;
