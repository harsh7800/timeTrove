import mongoose from "mongoose";

export const AddressSchema = new mongoose.Schema(
  {
    addressName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    state: { type: String, required: true },
    phoneNum: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String, required: true },
    pincode: { type: String, required: true },
    addressType: { type: String, required: true },
  },
  { timestamps: true }
);
