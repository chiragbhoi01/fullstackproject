// src/routes/admin.routes.ts
import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

export default router;
