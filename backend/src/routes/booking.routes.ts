import express from "express";
import { createBooking, getBookings } from "../controllers/booking.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();
router.post("/", protect, createBooking);
router.get("/", protect, getBookings);


export default router;
