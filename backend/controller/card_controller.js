const Card = require("../models/card_schema");

const createCard = async (req, res) => {
  try {
    const { cardNumber, bank } = req.body;

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

    const existing = await Card.findOne({ cardNumber });
    if (existing) {
      return res.status(400).json({ error: "Card number already exists" });
    }

    const newCard = await Card.create({
      ...req.body,
      userId: req.user.id,
    });

    const populatedCard = await Card.findById(newCard._id).populate(
      "userId",
      "name email role"
    );

    res.status(201).json({
      message: "Card created successfully",
      card: populatedCard,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id })
      .populate("userId", "name email role")
      .populate({
        path: "transactions",
      });

    res.json({ cards });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("userId", "name email role");

    if (!card) return res.status(404).json({ message: "Card not found" });

    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCard = async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!card)
      return res
        .status(404)
        .json({ message: "Card not found or unauthorized" });

    res.json({ message: "Card updated", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!card)
      return res
        .status(404)
        .json({ message: "Card not found or unauthorized" });

    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCardsAdmin = async (req, res) => {
  try {
    const cards = await Card.find().populate("userId", "name email");
    res.json(cards);
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
  getAllCardsAdmin,
};
