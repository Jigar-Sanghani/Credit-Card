import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import API from "../config/Api";
import CardDetails from "./CardDetails";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

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

  const fetchUserCards = async (token) => {
    try {
      const res = await API.get("/card/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards(res.data.cards || []);
    } catch (err) {
      toast.error("Failed to fetch cards.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    try {
      const token = Cookies.get("token");
      await API.delete(`/card/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = await API.get("/card/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCards(updated.data.cards || []);
      toast.success("Card deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete card.");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleSendOtp = async () => {
    try {
      const token = Cookies.get("token");
      await API.post(
        "/user/send-otp",
        { email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("OTP sent to your email.");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match!");
      return;
    }

    try {
      const token = Cookies.get("token");
      await API.put(
        "/user/update-password",
        {
          email: user.email,
          otp,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Password changed successfully!");
      resetPasswordFields();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password.");
    }
  };

  const resetPasswordFields = () => {
    setOtp("");
    setOtpSent(false);
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePassword(false);
  };

  if (selectedCard) {
    return (
      <CardDetails
        card={selectedCard}
        onBack={() => setSelectedCard(null)}
        onDelete={handleDelete}
      />
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-indigo-100">
        <h2 className="text-4xl font-bold text-indigo-700 text-center mb-8">
          👤 {user.name}'s Profile
        </h2>

        <div className="mb-8 text-lg">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "N/A"}
          </p>
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-gray-700">
          💳 Your Cards --
        </h3>

        {cards.length > 0 ? (
          <div className="overflow-auto rounded-xl shadow border border-gray-200">
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-indigo-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3">Holder</th>
                  <th className="px-6 py-3">Number</th>
                  <th className="px-6 py-3">Expiry</th>
                  <th className="px-6 py-3">CVV</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Bank</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {cards.map((card) => (
                  <tr
                    key={card._id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedCard(card)}
                  >
                    <td className="px-6 py-4">{card.cardHolder}</td>
                    <td className="px-6 py-4">
                      **** **** **** {card.cardNumber.slice(-4)}
                    </td>
                    <td className="px-6 py-4">{card.expiryDate}</td>
                    <td className="px-6 py-4">***</td>
                    <td className="px-6 py-4">{card.cardType}</td>
                    <td className="px-6 py-4">{card.bank}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(card._id);
                        }}
                        className="text-red-600 hover:text-red-800 font-semibold transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">You have no cards added.</p>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setShowChangePassword((prev) => !prev)}
            className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition cursor-pointer"
          >
            {showChangePassword ? "Cancel Change Password" : "Change Password"}
          </button>

          <button
            onClick={() => navigate("/card-add")}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer"
          >
            Add Card
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        {showChangePassword && (
          <div className="max-w-md mx-auto mt-8 bg-yellow-50 p-6 rounded-xl shadow-inner border border-yellow-300">
            {!otpSent ? (
              <>
                <h3 className="text-xl font-semibold text-yellow-700 mb-4 text-center">
                  Send OTP to Email
                </h3>
                <p className="mb-4 text-center text-yellow-800">
                  Click the button to receive a one-time password at{" "}
                  <strong>{user.email}</strong>.
                </p>
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <form onSubmit={handleChangePassword}>
                <h3 className="text-xl font-semibold text-yellow-700 mb-4 text-center">
                  Change Password
                </h3>

                <label className="block mb-2 font-semibold text-yellow-800">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full mb-4 px-4 py-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <label className="block mb-2 font-semibold text-yellow-800">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full mb-4 px-4 py-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <label className="block mb-2 font-semibold text-yellow-800">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full mb-4 px-4 py-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
