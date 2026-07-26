import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./user/user.routes.js";
import cardRoutes from "./card/card.routes.js";

dotenv.config();

const app = express();

// credentials:true + exact origin are REQUIRED for cookies to work
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());   // read JSON bodies
app.use(cookieParser());   // read cookies into req.cookies

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Blog API is running 🚀" });
});

app.use("/api/users", userRoutes);  // /api/users/register, /login, /logout, /me
app.use("/api/cards", cardRoutes);  // /api/cards ...

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));