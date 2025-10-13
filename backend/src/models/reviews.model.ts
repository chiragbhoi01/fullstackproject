import mongoose, { Schema } from "mongoose";

export interface IReview extends Document {
    product: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
}
const reviewSchema = new mongoose.Schema<IReview>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema)