import Order from "@/app/models/Order";
import connectDb from "@/lib/mongoose";
const RazorPay = require("razorpay");
import shortid from "shortid";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  let { order_id } = await request.json();
  await connectDb();

  try {
    await Order.findOneAndDelete({ orderId: order_id, status: "created" });
    return NextResponse.json(
      {
        message: "Payment Cancelled",
        success: false,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: err,
      },
      { status: 400 }
    );
  }
}
