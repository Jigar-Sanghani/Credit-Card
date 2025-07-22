const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      enum: ["Credit", "Debit"],
      default: "Credit",
    },
    category: {
      type: String,
      enum: [
        "Shopping",
        "Gas",
        "Dining",
        "Travel",
        "Groceries",
        "Electronics",
        "Entertainment",
        "Bills",
        "Other",
      ],
      default: "Other",
    },
    merchant: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["posted", "pending"],
      default: "posted",
    },
    rewardEarned: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
