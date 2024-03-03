import mongoose from "mongoose";
import { AddressSchema } from "./Address";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Name is Mandatory"] },
    email: {
      type: String,
      required: [true, "email is Mandatory"],
      unique: true,
    },
    password: { type: String },
    role: { type: String, default: "user", required: true },
    image: { type: String, default: "" },
    registrationMethod: { type: String, default: "" },
    billingAddress: [AddressSchema],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
