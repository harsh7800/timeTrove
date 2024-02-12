import connectDb from "@/middleware/mongoose";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDb();
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams.entries());
  try {
    let products;

    // Check if there are queries in the URL
    if (searchParams.toString().length === 0) {
      // No queries, return all products
      products = await Product.find({});
    } else {
      // Queries present, convert searchParams to an object and filter products based on queries
      const query = Object.fromEntries(searchParams.entries());
      products = await Product.find(query);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}
