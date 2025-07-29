import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <p className="text-gray-700 text-lg">Welcome to your dashboard 👋</p>;
      case "users":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Users</h3>
            <p className="text-gray-600">This is where the User Form or User List will go.</p>
          </div>
        );
      case "cards":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Cards</h3>
            <p className="text-gray-600">This is where the Card Form or Card List will go.</p>
          </div>
        );
      default:
        return <p>Unknown section</p>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 rounded-tr-3xl rounded-br-3xl hidden md:flex flex-col">
        <h1 className="text-2xl font-bold text-blue-700 mb-10">Dashboard</h1>
        <nav className="flex flex-col gap-4">
          {["home", "users", "cards"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-left rounded-xl transition duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 capitalize">
          {activeTab}
        </h2>

        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
