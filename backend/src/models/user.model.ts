import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Interface representing a user document in MongoDB
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: "user" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User schema definition
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Hash password before saving user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next();
  }
});

// Method to compare candidate password with hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the user model
export const User = mongoose.model<IUser>("User", userSchema);
