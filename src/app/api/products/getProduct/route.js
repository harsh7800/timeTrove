import connectDb from "@/middleware/mongoose";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("productFor");
  const category = searchParams.get("category");
  await connectDb();
  try {
    let products;
    // Check if a specific category is provided in the query
    // Filter products based on the specified category
    // products = await Product.find({ Category: "Footwear" });
    // No specific category provided, return all products
    if (gender || category) {
      products = await Product.find({ category: category, productFor: gender });
    } else {
      products = await Product.find({});
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}
