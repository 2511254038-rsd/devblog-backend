import express from "express";
import {
  getCards, getCard, getMyCards, createCard, updateCard, deleteCard,
} from "./card.controller.js";
import { protect } from "../user/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getCards);
router.get("/mine", protect, getMyCards); // must be above "/:id"
router.get("/:id", getCard);

// PROTECTED (cookie sent automatically)
router.post("/", protect, createCard);
router.put("/:id", protect, updateCard);
router.delete("/:id", protect, deleteCard);

export default router;