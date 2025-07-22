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
            <span className="font-semibold">Card Holder:</span>{" "}
            {card.cardHolder}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">Card Number:</span>{" "}
              {showCardNumber
                ? card.cardNumber
                : "**** **** **** " + card.cardNumber.slice(-4)}
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
            <span className="font-semibold">Expiry Date:</span>{" "}
            {card.expiryDate}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">CVV:</span>{" "}
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
            <span className="font-semibold">Type:</span> {card.cardType}
          </div>
          <div>
            <span className="font-semibold">Bank:</span> {card.bank}
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
