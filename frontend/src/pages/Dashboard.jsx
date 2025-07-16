import React from "react";
import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-indigo-100">
      <aside className="w-64 bg-white shadow-xl p-6 rounded-tr-3xl rounded-br-3xl hidden md:block">
        <h1 className="text-2xl font-bold text-blue-700 mb-8">Dashboard</h1>
        <nav className="space-y-4">
          <button
            className={`block w-full text-left px-4 py-2 rounded-xl ${
              activeTab === "home"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded-xl ${
              activeTab === "users"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded-xl ${
              activeTab === "cards"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("cards")}
          >
            Cards
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 capitalize">
          {activeTab}
        </h2>

        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl">
          {activeTab === "home" && <p>Welcome to your dashboard 👋</p>}

          {activeTab === "users" && (
            <p>This is where the User Form or User List will go.</p>
          )}

          {activeTab === "cards" && (
            <p>This is where the Card Form or Card List will go.</p>
          )}
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
