import React, { useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const CardAdd = () => {
  const [card, setCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
    bank: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const createCard = async () => {
    try {
      const user = JSON.parse(Cookies.get("user"));

      const [year, month] = card.expiryDate.split("-");
      const formattedExpiry = `${month}/${year.slice(2)}`;

      const payload = {
        ...card,
        expiryDate: formattedExpiry,
        cardHolder: user.name,
        userId: user._id,
      };

      await API.post("/card/create", payload);
      toast.success("Card created successfully!");
    } catch (err) {
      console.error("Add Card:", err.response?.data || err.message);
      toast.error("Failed to create card.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard();
    setCard({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardType: "",
      bank: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          --- Add Card ---
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">


          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={card.cardNumber}
              onChange={handleInput}
              placeholder="e.g. 1234 5678 9012 3456"
              maxLength={16}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="month"
                name="expiryDate"
                value={card.expiryDate}
                onChange={handleInput}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                value={card.cvv}
                onChange={handleInput}
                maxLength={4}
                placeholder="e.g. 123"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Card Type</label>
            <select
              name="cardType"
              value={card.cardType}
              onChange={handleInput}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Card Type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Rupay">Rupay</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Bank</label>
            <select
              name="bank"
              value={card.bank}
              onChange={handleInput}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Punjab National Bank">Punjab National Bank</option>
              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <input
              type="submit"
              value="Add Card"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardAdd;
