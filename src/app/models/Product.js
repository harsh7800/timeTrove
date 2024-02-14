import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    productFor: { type: String, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: [String], required: true },
    color: { type: [String], required: true },
    img: { type: String, required: true },
    availableQty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
