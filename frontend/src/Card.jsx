import React, { useState } from "react";
import API from "./config/Api";

export default function Card() {
  const [card, setCard] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
    userId: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const createCard = async () => {
    try {
      await API.post("/create", card);
      alert("Card created successfully!");
    } catch (err) {
      console.error("Error creating card:", err);
      alert("Failed to create card.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard();
    setCard({
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardType: "",
      userId: "",
    });
  };

  return (
    <div>
      <h2>Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Holder:</label>
          <input
            type="text"
            name="cardHolder"
            value={card.cardHolder}
            onChange={handleInput}
            required
          />
        </div>

        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={card.cardNumber}
            onChange={handleInput}
            required
          />
        </div>

        <div>
          <label>Expiry Date (MM/YY):</label>
          <input
            type="text"
            name="expiryDate"
            value={card.expiryDate}
            onChange={handleInput}
            required
          />
        </div>

        <div>
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={card.cvv}
            onChange={handleInput}
            required
          />
        </div>

        <div>
          <label>Card Type:</label>
          <input
            type="text"
            name="cardType"
            value={card.cardType}
            onChange={handleInput}
            required
          />
        </div>

        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={card.userId}
            onChange={handleInput}
            required
          />
        </div>

        <button type="submit">Create Card</button>
      </form>
    </div>
  );
}
