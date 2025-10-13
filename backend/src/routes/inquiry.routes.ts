import express from "express";
import { sendInquiry } from "../controllers/inquiry.controller";

const router = express.Router();
router.post("/",sendInquiry)
export default router