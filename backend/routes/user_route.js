const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user_controller");
const { verifyToken } = require("../middlewares/auth");

const userrouter = Router();

userrouter.post("/signup", registerUser);
userrouter.post("/login", loginUser);
userrouter.get("/users", verifyToken, getAllUsers);
userrouter.get("/users/:id", verifyToken, getUserById);
userrouter.put("/users/:id", verifyToken, updateUser);
userrouter.delete("/users/:id", verifyToken, deleteUser);
userrouter.put("/update-profile", verifyToken, updateUser)

module.exports = userrouter;
