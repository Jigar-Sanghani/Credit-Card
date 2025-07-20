import React, { useEffect, useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");
        const res = await API.get("/user/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to fetch users");
        console.error("Fetch Users Error:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        👥 All Users & Their Cards
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-2xl shadow-xl p-6 space-y-3 transition hover:shadow-2xl"
          >
            <div>
              <p className="text-sm text-gray-600 font-medium">👤 Name:</p>
              <p className="text-lg text-indigo-800 font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">📧 Email:</p>
              <p className="text-base text-gray-800">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">🏷️ Role:</p>
              <p className="text-base text-indigo-600 font-semibold">{user.role || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">💳 Cards:</p>
              {user.cards?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.cards.map((card) => (
                    <div
                      key={card._id}
                      className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl shadow-sm space-y-1"
                    >
                      <p className="text-sm font-semibold text-indigo-800">
                        {card.cardHolder}
                      </p>
                      <p className="text-sm text-gray-700">{card.cardNumber}</p>
                      <p className="text-xs text-gray-500 italic">
                        {card.cardType} | {card.bank}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No cards</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
