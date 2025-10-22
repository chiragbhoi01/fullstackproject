import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabse from "./db/connectDatabase";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import bookingRoutes from "./routes/booking.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import inquiryRoutes from "./routes/inquiry.routes";
import contactRoutes from "./routes/contact.route";



import "./models/user.model";
import "./models/product.model";
import "./models/booking.model";

dotenv.config({ path: "./env" });

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabse();
    app.get("/", (req: Request, res: Response) => res.send("Server Running"));
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/wishlist", wishlistRoutes);
    app.use("/api/inquiries", inquiryRoutes);
    app.use("/api/contact", contactRoutes);


  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
