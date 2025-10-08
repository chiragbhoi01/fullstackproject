import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDatabse from "./db/connectDatabase";
import "./models/user.model";
import "./models/product.model";
import "./models/booking.model";


dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;

connectDatabse()
    .then(() => {
        app.get("/", (req: Request, res: Response) => res.send("Server Running"));
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    });