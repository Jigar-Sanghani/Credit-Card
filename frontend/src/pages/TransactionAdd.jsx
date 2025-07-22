import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import API from "../config/Api";
import { useParams } from "react-router-dom";

const TransactionAdd = () => {
  const [transaction, setTransaction] = useState({
    title: "",
    category: "Other",
    merchant: "",
    amount: "",
    date: "",
  });

  const { cardId } = useParams();



  const handleInput = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(Cookies.get("user"));

    const payload = {
      ...transaction,
      card: cardId,
      user: user._id,
    };

    try {
      await API.post("/transaction/create", payload);
      toast.success("✅ Transaction added!");
      setTransaction({
        title: "",
        category: "Other",
        merchant: "",
        amount: "",
        date: "",
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "❌ Failed to add transaction.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-emerald-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        <div className="md:w-1/2 relative bg-gradient-to-br from-cyan-600 to-indigo-500 text-white p-8 flex items-center justify-center">
          <div className="text-center space-y-4">
            <img
              src="https://img.icons8.com/color/96/wallet.png"
              alt="Transaction Icon"
              className="mx-auto w-24 h-24"
            />
            <h3 className="text-3xl font-bold">Smart Expense Tracker</h3>
            <p className="text-sm text-indigo-200">
              Effortlessly record & track your card transactions.
            </p>
          </div>
          <div className="absolute bottom-4 left-4 text-xs text-white/80 font-semibold">
            💳 Works best with your credit cards
          </div>
        </div>

        <div className="md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            ➕ Add New Transaction
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={transaction.title}
                onChange={handleInput}
  placeholder="e.g., Grocery Shopping, Movie Ticket"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Merchant
              </label>
              <input
                type="text"
                name="merchant"
                value={transaction.merchant}
                onChange={handleInput}
                placeholder="e.g., Zomato, Flipkart"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleInput}
                  placeholder="e.g., 1499"

                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Transaction Date
              </label>
              <input
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleInput}
                  placeholder="Select a date"

                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={transaction.category}
                onChange={handleInput}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm"
              >
                <option value="Other">Select Category</option>
                <option value="Shopping">Shopping</option>
                <option value="Dining">Dining</option>
                <option value="Travel">Travel</option>
                <option value="Groceries">Groceries</option>
                <option value="Electronics">Electronics</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
                <option value="Gas">Gas</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-700 transition duration-300 shadow-md cursor-pointer"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionAdd;
