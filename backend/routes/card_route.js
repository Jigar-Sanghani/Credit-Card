const { Router } = require("express");
const {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getAllCardsAdmin,
} = require("../controller/card_controller");
const { isAdmin, verifyToken } = require("../middlewares/auth");

const cardRouter = Router();

cardRouter.get("/user", verifyToken, getAllCards);
cardRouter.get("/:id", verifyToken, getCardById);
cardRouter.post("/create", verifyToken, createCard);
cardRouter.put("/update/:id", verifyToken, updateCard);
cardRouter.delete("/delete/:id", verifyToken, deleteCard);
cardRouter.get("/admin/all", verifyToken, isAdmin, getAllCardsAdmin);

module.exports = cardRouter;
