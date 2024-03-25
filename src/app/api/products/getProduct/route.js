import connectDb from "@/lib/mongoose";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("productFor");
  const category = searchParams.get("category");
  await connectDb();
  console.log();
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
    const products = await Product.find(query).lean();
    let items = {};

    for (let item of products) {
      const key = item.title;
      if (key in items) {
        if (item.availableQty > 0) {
          if (!items[key].color.includes(item.color)) {
            items[key].color.push(item.color);
          }
          if (!items[key].size.includes(item.size)) {
            items[key].size.push(item.size);
          }
        }
      } else {
        if (item.availableQty > 0) {
          items[key] = {
            ...item,
            color: [item.color],
            size: [item.size],
          };
        }
      }
    }

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(error, { status: 404 });
  }
}
