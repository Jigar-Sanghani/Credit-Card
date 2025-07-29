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
      threshold.setDate(today.getDate() + 30); // 30 days ahead

      const alertList = cards
        .map((card) => {
          if (!card.expiryDate) return null;

          let month, year;
          if (card.expiryDate.includes("/")) {
            // Format: MM/YY or MM/YYYY
            [month, year] = card.expiryDate.split("/");
            if (year.length === 2) year = "20" + year; // e.g. "25" => "2025"
          } else if (card.expiryDate.includes("-")) {
            // Format: YYYY-MM
            [year, month] = card.expiryDate.split("-");
          }

          month = parseInt(month);
          year = parseInt(year);

          if (isNaN(month) || isNaN(year)) return null;

          // Get last day of expiry month
          const expiry = new Date(year, month, 0); // 0 gives last day of previous month
          expiry.setHours(0, 0, 0, 0);

          const lastDigits = card.cardNumber?.slice(-4) || "****";

          if (expiry > today && expiry <= threshold) {
            return {
              id: card._id,
              type: "Upcoming Expiry",
              message: `Card ending in ${lastDigits} will expire soon.`,
              date: `${String(month).padStart(2, "0")}/${String(year).slice(
                -2
              )}`,
              color: "yellow",
            };
          }

          return null;
        })
        .filter(Boolean);
      Cookies.set("alertCount", alertList.length);

      setAlerts(alertList);
    } catch (err) {
      console.error("Failed to fetch cards:", err);
      toast.error("Failed to fetch cards.");
    }
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
              className={`border-l-4 p-4 rounded shadow ${
                alert.color === "yellow"
                  ? "border-yellow-500 bg-yellow-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              <p className="font-bold">{alert.type}</p>
              <p>{alert.message}</p>
              <p className="text-xs text-gray-600">Expiry: {alert.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertPage;
