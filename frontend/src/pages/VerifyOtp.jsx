import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import API from "../config/Api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/verify-otp", { email, otp });
      const { token, user } = res.data;

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      toast.success("✅ Logged in successfully!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Invalid OTP";
      toast.error(msg);
    }
  };

  if (!email) {
    toast.error("Email not found. Please try again.");
    navigate("/login-otp");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
          Enter the OTP
        </h2>
        <form onSubmit={verifyOtp} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">OTP</label>
            <input
              type="text"
              maxLength={6}
              pattern="\d{6}"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter 6-digit OTP"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 cursor-pointer"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
