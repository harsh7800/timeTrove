import Order from "@/app/models/Order";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  let email = params.email;
  await connectDb();
  try {
    const order = await Order.find({ email }).lean();
    if (order) {
      return NextResponse.json(
        {
          success: true,
          orders: order,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          orders: [],
          message: "user not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        orders: [],
        message: "Something Went Wrong",
      },
      { status: 400 }
    );
  }
}
