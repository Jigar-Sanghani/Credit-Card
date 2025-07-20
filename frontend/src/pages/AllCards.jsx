import React, { useEffect, useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AllCards = () => {
  const [cards, setCards] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h2 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-indigo-700 mb-8">
          <span className="text-4xl">💳</span>
          <span>All Issued Cards</span>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm text-gray-800 table-fixed">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold w-1/6 text-left">
                  Card Holder
                </th>
                <th className="px-4 py-3 font-semibold w-1/6 text-left">
                  Card Number
                </th>
                <th className="px-4 py-3 font-semibold w-1/6 text-left">
                  Type
                </th>
                <th className="px-4 py-3 font-semibold w-1/6 text-left">
                  Bank
                </th>
                <th className="px-4 py-3 font-semibold w-1/6 text-left">
                  User
                </th>
                <th className="px-4 py-3 font-semibold w-1/6 text-left">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {cards.length > 0 ? (
                cards.map((card) => (
                  <tr
                    key={card._id}
                    className="bg-white border-b hover:bg-indigo-50 transition"
                  >
                    <td className="px-4 py-3 w-1/6 truncate">
                      {card.cardHolder}
                    </td>
                    <td className="px-4 py-3 w-1/6 truncate">
                      {card.cardNumber}
                    </td>
                    <td className="px-4 py-3 w-1/6 capitalize">
                      {card.cardType}
                    </td>
                    <td className="px-4 py-3 w-1/6">{card.bank}</td>
                    <td className="px-4 py-3 w-1/6 font-semibold text-indigo-700 truncate">
                      {card.userId?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-3 w-1/6 text-gray-600 truncate">
                      {card.userId?.email || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400 italic bg-white"
                  >
                    No cards available.
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
