import React from "react";

const TransactionDetails = ({ transaction, onBack, onDelete }) => {
  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-gray-600 text-xl">
        No transaction to display.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          📄 Transaction Details
        </h2>

        <div className="grid grid-cols-1 gap-4 text-gray-700 text-lg">
          <div>
            <span className="font-semibold">📌 Title:</span> {transaction.title}
          </div>
          <div>
            <span className="font-semibold">🏷️ Category:</span>{" "}
            {transaction.category}
          </div>
          <div>
            <span className="font-semibold">🏪 Merchant:</span>{" "}
            {transaction.merchant}
          </div>
          <div>
            <span className="font-semibold">💰 Amount:</span>{" "}
            <span className="text-green-600 font-semibold">
              ₹{transaction.amount}
            </span>
          </div>
          <div>
            <span className="font-semibold">📅 Date:</span>{" "}
            {new Date(transaction.date).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">📌 Status:</span>{" "}
            {transaction.status || "Pending"}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={onBack}
            className="w-full sm:w-1/2 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition cursor-pointer"
          >
            ⬅️ Back
          </button>

          <button
            onClick={() => onDelete(transaction._id)}
            className="w-full sm:w-1/2 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition cursor-pointer"
          >
            🗑️ Delete Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
