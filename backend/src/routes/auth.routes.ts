import express, { Request, Response } from "express";
import { register, login, profile } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

interface AuthRequest extends Request {
  user?: any; // Or better, define your user type/ interface here
}

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

export default router;
