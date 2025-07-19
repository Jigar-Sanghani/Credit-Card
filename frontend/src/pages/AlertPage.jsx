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
      const soonThreshold = new Date();
      soonThreshold.setDate(today.getDate() + 30);

      const alertList = cards
        .map((card) => {
          if (!card.expiry) return null;

          let month, year;

          // Support "MM/YYYY" and "YYYY-MM"
          if (card.expiry.includes("/")) {
            [month, year] = card.expiry.split("/");
          } else if (card.expiry.includes("-")) {
            [year, month] = card.expiry.split("-");
          }

          month = parseInt(month);
          year = parseInt(year);

          if (isNaN(month) || isNaN(year)) return null;

          // Last day of expiry month
          const expiryDate = new Date(year, month, 0);
          const lastDigits = card.cardNumber?.slice(-4) || "****";

          if (expiryDate < today) {
            return {
              id: card._id,
              type: "Expired Card",
              message: `Card ending in ${lastDigits} has expired.`,
              date: expiryDate.toLocaleDateString(),
              color: "red",
            };
          } else if (expiryDate < soonThreshold) {
            return {
              id: card._id,
              type: "Upcoming Expiry",
              message: `Card ending in ${lastDigits} will expire soon.`,
              date: expiryDate.toLocaleDateString(),
              color: "yellow",
            };
          }

          return null;
        })
        .filter(Boolean);

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
                alert.color === "red"
                  ? "border-red-500 bg-red-100"
                  : "border-yellow-500 bg-yellow-100"
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
