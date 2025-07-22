const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    cardHolder: {
      type: String,
      required: true,
      trim: true,
    },
    cardNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{16}$/,
    },
    expiryDate: {
      type: String,
      required: true,
      match: /^(0[1-9]|1[0-2])\/\d{2}$/,
    },
    cvv: {
      type: String,
      required: true,
      match: /^\d{3,4}$/,
    },
    cardType: {
      type: String,
      enum: ["Visa", "MasterCard", "Rupay", "Other"],
      default: "Other",
    },
    bank: {
      type: String,
      enum: [
        "State Bank of India",
        "HDFC Bank",
        "ICICI Bank",
        "Axis Bank",
        "Punjab National Bank",
        "Kotak Mahindra Bank",
        "Bank of Baroda",
        "Other",
      ],
      default: "Other",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cardSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "card",
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
