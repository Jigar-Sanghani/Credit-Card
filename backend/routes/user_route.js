const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user_controller");

const userrouter = Router();

userrouter.post("/signup", registerUser);
userrouter.post("/login", loginUser);
userrouter.get("/", getAllUsers);
userrouter.get("/:id", getUserById);
userrouter.put("/update/:id", updateUser);
userrouter.delete("/delete/:id", deleteUser);

module.exports = userrouter;
