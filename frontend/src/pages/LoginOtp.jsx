import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../config/Api";

const LoginOtp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
        
      console.log(email);
      await API.post("/user/send-otp", { email });
      console.log(email);
      
      toast.success("OTP sent to your email.");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to send OTP.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
          Login with OTP
        </h2>
        <form onSubmit={sendOtp} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 cursor-pointer"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginOtp;
