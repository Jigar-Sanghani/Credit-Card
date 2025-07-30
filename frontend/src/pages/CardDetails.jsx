import React, { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import TransactionDetails from "./TransactionDetails";

const CardDetails = ({ card, onBack, onDelete }) => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedtransactions, setSelectedtransactions] = useState(null);
  const [showCardVisual, setShowCardVisual] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (card && token) {
      fetchTransactions(token);
    }
  }, [card]);

  const fetchTransactions = async (token) => {
    try {
      const res = await API.get(`/transaction/all/${card._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data.transactions || []);
    } catch (error) {
      toast.error("Failed to fetch transactions");
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Authentication token missing.");
        return;
      }

      await API.delete(`/transaction/delete/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await API.get(`/transaction/all/${card._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data.transactions || []);
      navigate("/profile");
      toast.success("Transaction deleted successfully!");
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      toast.error("Failed to delete transaction.");
    }
  };

  if (selectedtransactions) {
    return (
      <TransactionDetails
        transaction={selectedtransactions}
        onBack={() => setSelectedtransactions(null)}
        onDelete={handleDeleteTransaction}
      />
    );
  }

  if (!card) return null;

  const handleAddTransaction = () => {
    navigate(`/transaction-add/${card._id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          💳 Card Details
        </h2>

        <div className="grid grid-cols-1 gap-4 text-gray-700 text-lg">
          <div>
            <span className="font-semibold">Card Holder :</span>{" "}
            {card.cardHolder || "CARD HOLDER"}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">Card Number :</span>{" "}
              {showCardNumber
                ? (card.cardNumber || "0000000000000000")
                    .replace(/(.{4})/g, "$1 ")
                    .trim()
                : "**** **** **** " + (card.cardNumber?.slice(-4) || "0000")}
            </div>
            <button
              onClick={() => setShowCardNumber((prev) => !prev)}
              className="text-indigo-500 hover:text-indigo-700 ml-4 text-2xl"
              title="Toggle Card Number"
            >
              {showCardNumber ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div>
            <span className="font-semibold">VALID FROM :</span>{" "}
            {card.createdAt
              ? new Date(card.createdAt).toLocaleDateString("en-US", {
                  month: "2-digit",
                  year: "2-digit",
                })
              : "- - / - -"}
          </div>

          <div>
            <span className="font-semibold">VALID THRU :</span>{" "}
            {card.expiryDate || "- - / - -"}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">CVV : </span>{" "}
              {showCVV ? card.cvv : "***"}
            </div>
            <button
              onClick={() => setShowCVV((prev) => !prev)}
              className="text-indigo-500 hover:text-indigo-700 ml-4 text-2xl"
              title="Toggle CVV"
            >
              {showCVV ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div>
            <span className="font-semibold">Card Type :</span>{" "}
            {card.cardType || "CARD TYPE"}
          </div>

          <div>
            <span className="font-semibold">Card Label :</span>{" "}
            {card.label || "Commercial"}
          </div>

          <div>
            <span className="font-semibold">Bank :</span>{" "}
            {card.bank || "Customer BANK"}
          </div>
        </div>
        <div className="relative mt-8">
          <button
            onClick={() => setShowCardVisual((prev) => !prev)}
            className={`mb-4 px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ease-in-out
      ${
        showCardVisual
          ? "bg-white text-indigo-700 border-2 border-indigo-600 hover:bg-indigo-50"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
          >
            {showCardVisual ? "🔼 Hide Card Preview" : "🔽 Show Card Preview"}
          </button>

          {/* Animated Card Preview Section */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showCardVisual
                ? "max-h-[500px] opacity-100 mt-5"
                : "max-h-0 opacity-0"
            }`}
          >
            {" "}
            <div className="max-w-sm mx-auto">
              <div
                className="relative text-white rounded-2xl shadow-2xl px-6 pt-4 pb-6 h-56"
                style={{
                  background:
                    "linear-gradient(135deg, #0a3e79 0%, #042e59 100%)",
                  fontFamily: "sans-serif",
                }}
              >
                {/* Top Row: Label + Bank */}
                <div className="flex justify-between items-center mb-5">
                  <p className="uppercase text-sm font-semibold tracking-wider text-gray-200">
                    {card.label || "Commercial"}
                  </p>
                  <h2 className="text-sm font-bold tracking-wide uppercase text-white">
                    {card.bank || "Customer BANK"}
                  </h2>
                </div>

                <div className="flex justify-start mb-3">
                  <img
                    src="https://res.cloudinary.com/dbjiq5def/image/upload/v1753859539/Chip_akvl2d.png"
                    alt="Chip"
                    className="h-8 w-10"
                  />
                </div>

                {/* Card Number + Toggle */}
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xl sm:text-2xl font-semibold tracking-widest font-mono">
                    {showCardNumber
                      ? (card.cardNumber || "0000000000000000")
                          .replace(/(.{4})/g, "$1 ")
                          .trim()
                      : "**** **** **** " +
                        (card.cardNumber?.slice(-4) || "0000")}
                  </div>
                  <button
                    onClick={() => setShowCardNumber((prev) => !prev)}
                    className="text-indigo-300 hover:text-white text-xl"
                    title="Toggle Card Number"
                  >
                    {showCardNumber ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>

                {/* Validity Info */}
                <div className="flex justify-start text-xs text-gray-300 gap-8 mb-5">
                  <div>
                    <p className="mb-0.5">VALID FROM</p>
                    <p className="text-white">
                      {card.createdAt
                        ? new Date(card.createdAt).toLocaleDateString("en-US", {
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : "- - / - -"}{" "}
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5">VALID THRU</p>
                    <p className="text-white">
                      {card.expiryDate || "- - / - -"}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Cardholder + Card Type */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-semibold tracking-wide">
                      {card.cardHolder || "CARD HOLDER"}
                    </p>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                    {card.cardType || "CARD TYPE"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            📋 Transactions
          </h3>
          {transactions.length > 0 ? (
            <div className="overflow-auto rounded-lg border border-gray-200">
              <table className="min-w-full table-auto text-sm text-left text-gray-700">
                <thead className="bg-indigo-100 text-indigo-800">
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Merchant</th>
                    <th className="px-4 py-2">Amount (₹)</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {transactions.map((tx) => (
                    <tr
                      key={tx._id}
                      onClick={() => setSelectedtransactions(tx)}
                      className="hover:bg-indigo-50 transition cursor-pointer"
                    >
                      <td className="px-4 py-2 font-medium text-gray-900">
                        {tx.title}
                      </td>
                      <td className="px-4 py-2">{tx.category}</td>
                      <td className="px-4 py-2">{tx.merchant}</td>
                      <td className="px-4 py-2 text-green-600 font-semibold">
                        ₹{tx.amount}
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDeleteTransaction(tx._id)}
                          className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              No transactions available for this card.
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={onBack}
            className="w-full sm:w-1/3 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition cursor-pointer"
          >
            ⬅️ Back
          </button>

          <button
            onClick={handleAddTransaction}
            className="w-full sm:w-1/3 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <AiOutlinePlus className="text-xl" />
            Add Transaction
          </button>

          <button
            onClick={() => onDelete(card._id)}
            className="w-full sm:w-1/3 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition cursor-pointer"
          >
            🗑️ Delete Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
