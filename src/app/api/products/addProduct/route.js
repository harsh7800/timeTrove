import connectDb from "@/lib/mongoose";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDb();
  try {
    const data = await request.json();
    let checkProduct = await Product.findOne({
      title: data.title,
    });
    if (!checkProduct) {
      await Product.create(data);
      return NextResponse.json(
        {
          data,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Product already exixts",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 404 }
    );
  }
}
