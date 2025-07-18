const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },  // ✅ enable virtuals in JSON output
    toObject: { virtuals: true },
  }
);

// ✅ Virtual field to populate cards
userSchema.virtual("cards", {
  ref: "Card",           // model name
  localField: "_id",     // match with user _id
  foreignField: "userId" // in Card schema
});

const User = mongoose.model("User", userSchema);
module.exports = User;
