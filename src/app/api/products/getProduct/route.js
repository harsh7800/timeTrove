import connectDb from "@/lib/mongoose";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("productFor");
  const category = searchParams.get("category");
  await connectDb();
  try {
    let query = {};

    // Check if a specific gender is provided in the query
    if (gender) {
      query.productFor = gender;
    }

    // Check if a specific category is provided in the query
    if (category) {
      query.category = category;
    }

    // Fetch products based on the combined query
    const products = await Product.find(query);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}
