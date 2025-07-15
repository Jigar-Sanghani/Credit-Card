const { Router } = require("express");
const {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
} = require("../controller/card_controller");

const cardRouter = Router();

cardRouter.post("/create/", createCard);
cardRouter.get("/", getAllCards);
cardRouter.get("/:id", getCardById);
cardRouter.put("/update/:id", updateCard);
cardRouter.delete("/delete/:id", deleteCard);

module.exports = cardRouter;
