import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "staff";
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            toLocaleLowerCase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["staff", "admin"],
            default: "staff"

        }

    }, { timestamps: true })

export const User = mongoose.model("User", userSchema)