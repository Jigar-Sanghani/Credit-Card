const Card = require("../models/card_schema");

const createCard = async (req, res) => {
  try {
    const { bank } = req.body;

    const allowedBanks = [
      "State Bank of India",
      "HDFC Bank",
      "ICICI Bank",
      "Axis Bank",
      "Punjab National Bank",
      "Kotak Mahindra Bank",
      "Bank of Baroda",
      "Other",
    ];

    if (!allowedBanks.includes(bank)) {
      return res.status(400).json({ error: `Unsupported bank: ${bank}` });
    }

    const card = await Card.create(req.body);
    res.status(201).json({ message: "Card created successfully", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("userId", "name email");
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card updated", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
};
