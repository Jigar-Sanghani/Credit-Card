import React, { useEffect, useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FiSearch, FiFilter } from "react-icons/fi";

const AllCards = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [bankFilter, setBankFilter] = useState("all");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = Cookies.get("token");
        const res = await API.get("/card/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCards(res.data);
      } catch (err) {
        toast.error("Failed to fetch cards");
        console.error("Fetch Cards Error:", err);
      }
    };
    fetchCards();
  }, []);

  const filteredCards = cards.filter((card) => {
    const matchHolder = card.cardHolder
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchType = typeFilter === "all" || card.cardType === typeFilter;
    const matchBank = bankFilter === "all" || card.bank === bankFilter;
    return matchHolder && matchType && matchBank;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10">
        <h2 className="text-center text-4xl font-extrabold text-indigo-700 mb-8">
          💳 All Issued Cards
        </h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search By Cardholder"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="all">💳 All Card Types</option>
              <option value="Visa">🟦 Visa</option>
              <option value="MasterCard">🟥 MasterCard</option>
              <option value="Rupay">🟨 Rupay</option>
              <option value="Other">🌀 Other</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <select
              value={bankFilter}
              onChange={(e) => setBankFilter(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="all">🏦 All Banks</option>
              <option value="State Bank of India">🏢 SBI</option>
              <option value="HDFC Bank">🏢 HDFC Bank</option>
              <option value="ICICI Bank">🏢 ICICI Bank</option>
              <option value="Axis Bank">🏢 Axis Bank</option>
              <option value="Punjab National Bank">🏢 PNB</option>
              <option value="Kotak Mahindra Bank">🏢 Kotak</option>
              <option value="Bank of Baroda">🏢 BOB</option>
              <option value="Other">🌀 Other</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-indigo-100 text-indigo-700 text-left">
              <tr>
                <th className="px-5 py-3 font-semibold">Card Holder</th>
                <th className="px-5 py-3 font-semibold">Card Number</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Bank</th>
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-5 py-3 font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <tr
                    key={card._id}
                    className="bg-white border-b hover:bg-indigo-50 transition duration-200"
                  >
                    <td className="px-5 py-3">{card.cardHolder}</td>
                    <td className="px-5 py-3">{card.cardNumber}</td>
                    <td className="px-5 py-3">{card.cardType}</td>
                    <td className="px-5 py-3">{card.bank}</td>
                    <td className="px-5 py-3 font-semibold text-indigo-600">
                      {card.userId?.name || "Unknown"}
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {card.userId?.email || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No cards found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllCards;
