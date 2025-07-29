import React, { useEffect, useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

const AllTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [amountSort, setAmountSort] = useState("");
  const [dateSort, setDateSort] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = Cookies.get("token");
        const res = await API.get("/transaction/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data || []);
      } catch (err) {
        toast.error("Failed to fetch transactions");
        console.error("Fetch Transactions Error:", err);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions
    .filter((tx) => tx.user?.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (amountSort === "asc") return a.amount - b.amount;
      if (amountSort === "desc") return b.amount - a.amount;
      if (dateSort === "asc") return new Date(a.date) - new Date(b.date);
      if (dateSort === "desc") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-emerald-700 mb-10">
          📊 All Transactions
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search By User Name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sort by Amount */}
          <select
            value={amountSort}
            onChange={(e) => setAmountSort(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
          >
            <option value="">🔃 Sort By Amount</option>
            <option value="asc">💸 Low to High</option>
            <option value="desc">💰 High to Low</option>
          </select>

          {/* Sort by Date */}
          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
          >
            <option value="">🔃 Sort By Date</option>
            <option value="desc">🕒 Newest First</option>
            <option value="asc">📅 Oldest First</option>
          </select>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-emerald-100 text-emerald-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Amount</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">User</th>
                <th className="px-4 py-3 text-left font-semibold">Card Info</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="bg-white border-b hover:bg-emerald-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-emerald-700">
                      {tx.title}
                    </td>
                    <td className="px-4 py-3 font-semibold">₹ {tx.amount}</td>
                    <td className="px-4 py-3 capitalize">{tx.category}</td>
                    <td className="px-4 py-3">{tx.date?.slice(0, 10)}</td>
                    <td className="px-4 py-3 text-indigo-700 font-semibold">
                      {tx.user?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {tx.card?.cardHolder ? (
                        <div className="space-y-1">
                          <p className="font-semibold">{tx.card.cardHolder}</p>
                          <p className="text-sm text-gray-500">
                            **** **** **** {tx.card.cardNumber?.slice(-4)}
                          </p>
                          <p className="text-xs text-gray-400 italic">
                            {tx.card.cardType} – {tx.card.bank}
                          </p>
                        </div>
                      ) : (
                        <span className="italic text-gray-400">
                          No Card Info
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400 italic bg-white"
                  >
                    No transactions found.
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

export default AllTransaction;
