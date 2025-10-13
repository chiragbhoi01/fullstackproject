import express from "express";
import { addReview, getProductReviews } from "../controllers/review.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, addReview);
router.get("/:id", getProductReviews);

export default router;
