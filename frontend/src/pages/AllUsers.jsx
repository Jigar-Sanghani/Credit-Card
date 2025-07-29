import React, { useEffect, useState } from "react";
import API from "../config/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.role?.toLowerCase() === roleFilter;
    return matchesName && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-8">
      <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12 drop-shadow-sm">
        👥 All Users & Their Cards
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="🔍 Search By User Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-5 py-3 text-base rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full md:w-1/4 px-5 py-3 text-base rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
        >
          <option value="all">🧑 All Roles</option>
          <option value="user">🙋 User</option>
          <option value="admin">🛠️ Admin</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="mb-4 space-y-1">
              <p className="text-2xl font-semibold text-indigo-700">
                {user.name}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-indigo-500 capitalize font-medium">
                Role: {user.role}
              </p>
            </div>

            <div className="space-y-2">
              {user.cards?.length > 0 ? (
                user.cards.map((card) => (
                  <div
                    key={card._id}
                    className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl shadow-inner"
                  >
                    <p className="font-medium text-indigo-800">
                      {card.cardHolder}
                    </p>
                    <p className="text-sm text-gray-600">{card.cardNumber}</p>
                    <p className="text-xs italic text-indigo-500">
                      {card.cardType} • {card.bank}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No cards</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center mt-16 text-gray-400 italic text-lg">
          No users found with current filters.
        </p>
      )}
    </div>
  );
};

export default AllUsers;
