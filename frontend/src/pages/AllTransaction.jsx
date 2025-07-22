import React, { useEffect, useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AllTransaction = () => {
  const [transactions, setTransactions] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-100 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h2 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-emerald-700 mb-8">
          <span className="text-4xl">📊</span>
          <span>All Transactions</span>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm text-gray-800 table-fixed">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold w-1/6">Title</th>
                <th className="px-4 py-3 text-left font-semibold w-1/6">Amount</th>
                <th className="px-4 py-3 text-left font-semibold w-1/6">Category</th>
                <th className="px-4 py-3 text-left font-semibold w-1/6">Date</th>
                <th className="px-4 py-3 text-left font-semibold w-1/6">User</th>
                <th className="px-4 py-3 text-left font-semibold w-1/6">Card</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="bg-white border-b hover:bg-emerald-50 transition"
                  >
                    <td className="px-4 py-3 truncate font-semibold text-emerald-700">
                      {tx.title}
                    </td>
                    <td className="px-4 py-3">₹ {tx.amount}</td>
                    <td className="px-4 py-3 capitalize">{tx.category}</td>
                    <td className="px-4 py-3">{tx.date?.slice(0, 10)}</td>
                    <td className="px-4 py-3 text-indigo-700 font-semibold truncate">
                      {tx.user?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {tx.card?.cardHolder ? (
                        <div className="space-y-1">
                          <p className="font-semibold">{tx.card.cardHolder}</p>
                          <p className="text-sm text-gray-500">
                            **** **** **** {tx.card.cardNumber?.slice(-4)}
                          </p>
                          <p className="text-xs italic text-gray-400">
                            {tx.card.cardType} - {tx.card.bank}
                          </p>
                        </div>
                      ) : (
                        <span className="italic text-gray-400">No Card Info</span>
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
                    No transactions available.
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
