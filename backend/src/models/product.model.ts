import mongoose, { Schema } from "mongoose";
import { isPromise } from "util/types";
export interface IProduct extends Document {
    name: string;
    category: "bridal" | "groom" | "party";
    price: number;
    size: string;
    color: string;
    description?: string;
    imageUrl?: string;
    available: boolean;
}
const productSchema = new mongoose.Schema<IProduct>(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["bridal", "groom", "party"],
            required: true
        },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        description: { type: String },
        imageUrl: { type: String },
        available: { type: Boolean, default: true }
    }, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)