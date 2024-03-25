import Order from "@/app/models/Order";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  console.log(params);
  // let email = params.email;
  let email = "test@gmail.com";
  console.log(email);
  await connectDb();
  try {
    const order = await Order.find({ email, status: "Paid" }).lean();
    console.log(order);
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          orders: [],
          message: "Email parameter is missing",
        },
        { status: 400 }
      );
    }
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
    console.log(error);
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
