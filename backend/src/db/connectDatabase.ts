import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDatabse = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URI missing in .env");
        }
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo db connect")
    } catch (error) {
        console.log("mongo connection fail", error)
        process.exit(1);

    }
}

export default connectDatabse;