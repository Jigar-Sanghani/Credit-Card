import React, { useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    try {
      const res = await API.post("/user/signup", user);
      const { user: userData, token } = res.data;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(userData), { expires: 7 });
      toast.success("✅ User created successfully!");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "❌ Login failed";

      toast.error(errorMsg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
    setUser({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInput}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="e.g. john@example.com"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Create a secure password"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6">
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>{" "}
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Signup;
