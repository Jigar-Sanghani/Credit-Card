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

  return  (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          All Cards
        </h2>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full table-auto border border-gray-200 shadow-sm rounded-xl text-sm">
            <thead className="bg-indigo-100 text-indigo-800 font-semibold text-left">
              <tr>
                <th className="p-3">Card Holder</th>
                <th className="p-3">Number</th>
                <th className="p-3">Type</th>
                <th className="p-3">Bank</th>
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, index) => (
                <tr
                  key={card._id}
                  className={`hover:bg-indigo-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-3">{card.cardHolder}</td>
                  <td className="p-3">{card.cardNumber}</td>
                  <td className="p-3">{card.cardType}</td>
                  <td className="p-3">{card.bank}</td>
                  <td className="p-3">{card.userId?.name || "Unknown"}</td>
                  <td className="p-3">{card.userId?.email || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AllCards;
