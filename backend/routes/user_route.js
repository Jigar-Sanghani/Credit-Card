const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} = require("../controller/user_controller");

const userrouter = Router();

userrouter.post("/signup", registerUser);
userrouter.post("/login", loginUser);
userrouter.get("/", getAllUsers);
userrouter.get("/:id", getUserById);

module.exports = userrouter;
