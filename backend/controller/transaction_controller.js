const Card = require("../models/card_schema");
const Transaction = require("../models/transaction_schema");

const createTransaction = async (req, res) => {
  try {
    const {
      title,
      cardType,
      category,
      merchant,
      amount,
      status,
      rewardEarned,
      card: cardId, 
    } = req.body;

    const card = await Card.findOne({ _id: cardId, userId: req.user.id });

    if (!card) {
      return res.status(400).json({ message: "Invalid or unauthorized card." });
    }

    const newTransaction = await Transaction.create({
      title,
      cardType,
      category,
      merchant,
      amount,
      status,
      rewardEarned,
      user: req.user.id,
      card: card._id, 
    });

    const populated = await Transaction.findById(newTransaction._id)
      .populate("user", "name email")
      .populate("card");

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: populated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
      card: req.params.cardId,
    })
      .populate("card")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("card")
      .populate("user", "name email");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    ).populate("card");

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Transaction not found or unauthorized" });
    }

    res.json({ message: "Transaction updated", transaction: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Transaction not found or unauthorized" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTransactionsAdmin = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "name email")
      .populate("card")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getAllTransactionsAdmin,
};
