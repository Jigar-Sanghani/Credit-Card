import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../config/Api";

const AlertPage = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUserCards = async (token) => {
    try {
      const res = await API.get("/card/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cards = res.data.cards || [];
      const today = new Date();
      const threshold = new Date();
      threshold.setDate(today.getDate() + 30);

      const alertList = cards
        .map((card) => {
          if (!card.expiryDate) return null;

          let month, year;
          if (card.expiryDate.includes("/")) {
            [month, year] = card.expiryDate.split("/");
            if (year.length === 2) year = "20" + year;
          } else if (card.expiryDate.includes("-")) {
            [year, month] = card.expiryDate.split("-");
          }

          month = parseInt(month);
          year = parseInt(year);
          if (isNaN(month) || isNaN(year)) return null;

          const expiry = new Date(year, month, 0);
          const lastDigits = card.cardNumber?.slice(-4) || "****";

          if (expiry > today && expiry <= threshold) {
            return {
              id: card._id,
              type: "Upcoming Expiry",
              message: `Card ending in ${lastDigits} will expire soon.`,
              date: `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`,
              color: "yellow",
            };
          }

          return null;
        })
        .filter(Boolean);

      Cookies.set("alertCount", alertList.length);
      Cookies.set("alertsSeen", alertList.length === 0 ? "true" : "false");
      window.dispatchEvent(new Event("alertChange"));

      setAlerts(alertList);
    } catch (err) {
      console.error("Failed to fetch cards:", err);
      toast.error("Failed to fetch cards.");
    }
  };

  const handleDeleteAlert = (id) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== id);
    setAlerts(updatedAlerts);

    Cookies.set("alertCount", updatedAlerts.length);
    Cookies.set("alertsSeen", updatedAlerts.length === 0 ? "true" : "false");
    window.dispatchEvent(new Event("alertChange"));
  };

  useEffect(() => {
    const userData = Cookies.get("user");
    const token = Cookies.get("token");

    if (!userData || !token) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchUserCards(token);
  }, [navigate]);

  return (
    <div className="pt-20 px-4">
      <h1 className="text-2xl font-bold mb-4">Card Alerts</h1>

      {alerts.length === 0 ? (
        <p className="text-gray-600">🎉 No alerts! All cards are valid.</p>
      ) : (
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className={`border-l-4 p-4 rounded shadow flex justify-between items-center ${
                alert.color === "yellow"
                  ? "border-yellow-500 bg-yellow-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div>
                <p className="font-bold">{alert.type}</p>
                <p>{alert.message}</p>
                <p className="text-xs text-gray-600">Expiry: {alert.date}</p>
              </div>
              <button
                onClick={() => handleDeleteAlert(alert.id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertPage;
