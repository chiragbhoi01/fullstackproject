import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { addToWishlist, getWishlist } from "../controllers/wishlist.controller";

const router = express.Router();

router.post("/", protect, addToWishlist);
router.get("/", protect, getWishlist);

export default router;
