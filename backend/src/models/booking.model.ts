import mongoose, { Schema } from "mongoose";
export interface IBooking extends Document {
    customerName: string;
    customerPhone: string;
    product: mongoose.Types.ObjectId;
    fromDate: Date;
    toDate: Date;
    status: "booked" | "returned" | "cancelled";
}

const bookingSchema = new mongoose.Schema<IBooking>(
    {
        customerName: {
            type: String,
            required: true
        },
        customerPhone: {
            type: String,
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }, toDate: { type: Date, required: true },
        status: { type: String, enum: ["booked", "returned", "cancelled"], default: "booked" },

    }, { timestamps: true })    