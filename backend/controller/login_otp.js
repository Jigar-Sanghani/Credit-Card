const User = require("../models/user_schema");
const sendEmail = require("../utils/SendEmail");
const jwt = require("jsonwebtoken");

const sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log("➡️ Received request for:", email);

  if (!email) return res.status(400).json({ message: "Email required." });

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User not found. Please sign up first." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("🔢 Generated OTP:", otp);

  user.otp = {
    code: otp,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };

  try {
    await user.save({ validateBeforeSave: false });

    const html = `
  <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
  
    <img src="https://cdn-icons-png.flaticon.com/512/6963/6963703.png" alt="App Logo" style="max-width: 150px; margin: 0 auto 20px; display: block;">

    <h2 style="color: #4F46E5; text-align: center;">🔐 Your One-Time Password (OTP)</h2>
    
    <p style="font-size: 16px; color: #333;">Hello, <strong>${
      user.name
    }</strong></p>
    
    <p style="font-size: 16px; color: #333;">
      Use the OTP below to proceed with your action. This code is valid for <strong>10 minutes</strong>.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; font-size: 32px; color: #111; font-weight: bold; letter-spacing: 5px; background-color: #e0e7ff; padding: 12px 24px; border-radius: 8px;">
        ${otp}
      </span>
    </div>

    <p style="font-size: 14px; color: #666;">
      If you didn't request this, you can safely ignore this email.
    </p>

    <p style="font-size: 14px; color: #999; text-align: center; margin-top: 40px;">
      © ${new Date().getFullYear()} Credit Card App • All rights reserved.
    </p>
  </div>
`;

    await sendEmail(email, "Your OTP Code", html);

    res.json({ message: "OTP sent to email." });
  } catch (err) {
    console.error("❌ Failed to send OTP:", err);
    res.status(500).json({ message: "Server error while sending OTP." });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: "Email & OTP required" });

  const user = await User.findOne({ email });
  if (!user || !user.otp)
    return res.status(400).json({ message: "OTP not found. Request again." });

  const valid = user.otp.code === otp && user.otp.expiresAt > Date.now();
  if (!valid)
    return res.status(401).json({ message: "Invalid or expired OTP." });

  user.otp = undefined;
  await user.save({ validateBeforeSave: false });

  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET not defined in environment variables");
    return res
      .status(500)
      .json({ message: "Server error: JWT secret not configured." });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({ message: "Login successful", token, user });
};

module.exports = {
  sendOTP,
  verifyOTP,
};
