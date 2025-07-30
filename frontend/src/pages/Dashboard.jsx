import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  CreditCard,
  DollarSign,
  Bell,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const TABS = [
    { key: "home", label: "Home", icon: <Home className="w-5 h-5 mr-2" /> },
    { key: "users", label: "Users", icon: <Users className="w-5 h-5 mr-2" /> },
    { key: "cards", label: "Cards", icon: <CreditCard className="w-5 h-5 mr-2" /> },
    { key: "transactions", label: "Transactions", icon: <DollarSign className="w-5 h-5 mr-2" /> },
    { key: "alerts", label: "Alerts", icon: <Bell className="w-5 h-5 mr-2" /> }
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        </div>
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <p className="text-gray-700 text-lg">
            Welcome to your company dashboard 👋 Explore insights, manage users, cards, transactions, and alerts efficiently.
          </p>
        );
      case "users":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <p className="text-gray-600">This is where the User Form or User List will go.</p>
          </div>
        );
      case "cards":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Card Management</h3>
            <p className="text-gray-600">This is where the Card Form or Card List will go.</p>
          </div>
        );
      case "transactions":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
            <p className="text-gray-600">This is where the Transaction List or Details will go.</p>
          </div>
        );
      case "alerts":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Alerts</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>🔔 New user registered</li>
              <li>🔔 Card issued successfully</li>
              <li>🔔 Transaction flagged for review</li>
              {/* Replace with dynamic alerts if available */}
            </ul>
          </div>
        );
      default:
        return <p className="text-red-500">Unknown section</p>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 pt-10">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 rounded-tr-3xl rounded-br-3xl hidden md:flex flex-col">
        <h1 className="text-2xl font-bold text-blue-700 mb-10 cursor-pointer">Dashboard</h1>
        <nav className="flex flex-col gap-4">
          {TABS.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`flex items-center px-4 py-2 text-left rounded-xl transition duration-300 cursor-pointer ${
                activeTab === key
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(key)}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 capitalize animate-fade-in">
          {TABS.find((t) => t.key === activeTab)?.label || "Dashboard"}
        </h2>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-4xl animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
