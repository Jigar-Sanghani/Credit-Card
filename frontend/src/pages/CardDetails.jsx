import React from "react";

const CardDetails = ({ card, onBack, onDelete }) => {
  if (!card) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          💳 Card Details --
        </h2>

        <div className="grid grid-cols-1 gap-4 text-gray-700 text-lg">
          <div>
            <span className="font-semibold">Card Holder:</span> {card.cardHolder}
          </div>
          <div>
            <span className="font-semibold">Card Number:</span> **** **** ****{" "}
            {card.cardNumber.slice(-4)}
          </div>
          <div>
            <span className="font-semibold">Expiry Date:</span> {card.expiryDate}
          </div>
          <div>
            <span className="font-semibold">CVV:</span> ***
          </div>
          <div>
            <span className="font-semibold">Type:</span> {card.cardType}
          </div>
          <div>
            <span className="font-semibold">Bank:</span> {card.bank}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={onBack}
            className="w-full sm:w-1/2 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition cursor-pointer"
          >
            ⬅️ Back to Profile
          </button>
          <button
            onClick={() => onDelete(card._id)}
            className="w-full sm:w-1/2 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition cursor-pointer"
          >
            🗑️ Delete Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
