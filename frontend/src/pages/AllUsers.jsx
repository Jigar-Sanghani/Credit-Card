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
            className="bg-white rounded-2xl shadow-xl p-6 transition hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-indigo-800 mb-1">
              {user.name}
            </h3>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                💳 Cards:
              </h4>

              {user.cards?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.cards.map((card) => (
                    <div
                      key={card._id}
                      className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl shadow-sm"
                    >
                      <div className="font-medium text-indigo-700">
                        {card.cardHolder}
                      </div>
                      <div className="text-sm text-gray-600">
                        {card.cardNumber}
                      </div>
                      <div className="text-xs mt-1 text-gray-500 italic">
                        {card.cardType} | {card.bank}
                      </div>
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
