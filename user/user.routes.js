import express from "express";
import { register, login, logout, getMe } from "./user.controller.js";
import { protect } from "./auth.middleware.js";

const router = express.Router();

router.post("/register", register); // sets cookie
router.post("/login", login);       // sets cookie
router.post("/logout", logout);     // clears cookie
router.get("/me", protect, getMe);  // needs cookie

export default router;