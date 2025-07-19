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
    toJSON: { virtuals: true },  
    toObject: { virtuals: true },
  }
);

userSchema.virtual("cards", {
  ref: "Card",          
  localField: "_id",     
  foreignField: "userId" 
});

const User = mongoose.model("User", userSchema);
module.exports = User;
