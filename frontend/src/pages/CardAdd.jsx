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
      toast.success("✅ Card created successfully!");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "❌ Failed to create card.";

      toast.error(errorMsg);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        <div className="md:w-1/2 relative bg-gradient-to-br from-indigo-600 to-blue-600 text-white p-8 flex items-center justify-center select-none">
          <div className="text-center space-y-4">
            <img
              src="https://img.icons8.com/color/96/000000/bank-card-back-side.png"
              alt="Card Icon"
              className="mx-auto w-24 h-24"
            />
            <h3 className="text-3xl font-bold">Secure Card Entry</h3>
            <p className="text-sm text-indigo-200">
              Your information is encrypted and safe with us.
            </p>
          </div>

          <div className="absolute bottom-4 left-4 text-xs text-red-200 font-semibold opacity-80">
            🚫 Do not copy or share your card details
          </div>
        </div>

        <div className="md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            ➕ Add a New Card
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={card.cardNumber}
                onChange={handleInput}
                maxLength={16}
                placeholder="1234 5678 9012 3456"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="month"
                  name="expiryDate"
                  value={card.expiryDate}
                  onChange={handleInput}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={card.cvv}
                  onChange={handleInput}
                  maxLength={4}
                  placeholder="e.g. 123"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Card Type
              </label>
              <select
                name="cardType"
                value={card.cardType}
                onChange={handleInput}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Card Type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Rupay">Rupay</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Bank
              </label>
              <select
                name="bank"
                value={card.bank}
                onChange={handleInput}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Punjab National Bank">
                  Punjab National Bank
                </option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer"
            >
              Add Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardAdd;
