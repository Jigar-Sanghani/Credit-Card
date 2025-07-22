const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePasswordWithOTP,
} = require("../controller/user_controller");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const { googleLogin } = require("../controller/google_auth");
const { sendOTP, verifyOTP } = require("../controller/login_otp");

const userrouter = Router();

userrouter.post("/signup", registerUser);
userrouter.post("/login", loginUser);
userrouter.get("/users", verifyToken, isAdmin, getAllUsers);
userrouter.get("/users/:id", verifyToken, getUserById);
userrouter.put("/users/:id", verifyToken, updateUser);
userrouter.delete("/users/:id", verifyToken, deleteUser);
userrouter.put("/update-profile", verifyToken, updateUser);

userrouter.post("/send-otp", sendOTP);
userrouter.post("/verify-otp", verifyOTP);

userrouter.post("/google-login", googleLogin);

userrouter.put("/update-password", updatePasswordWithOTP);


module.exports = userrouter;
