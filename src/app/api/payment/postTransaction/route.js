import Order from "@/app/models/Order";
import connectDb from "@/lib/mongoose";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";
const RazorPay = require("razorpay");
const crypto = require("crypto");

export async function PATCH(req) {
  const prefix = "TRACK";
  const uniqueIdentifier = Math.floor(Math.random() * 1000000);
  const trackId = `${prefix}-${uniqueIdentifier}`;
  try {
    let order;
    const { response } = await req.json();
    await connectDb();

    let generatedSignature = crypto
      .createHmac("SHA256", process.env.RAZORPAY_SECRECT_KEY)
      .update(response.razorpay_order_id + "|" + response.razorpay_payment_id)
      .digest("hex");
    let isSignatureValid = generatedSignature == response.razorpay_signature;

    if (isSignatureValid) {
      var instance = new RazorPay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRECT_KEY,
      });
      // let authorised = await instance.payments.edit(
      //   response.razorpay_payment_id,
      //   {
      //     notes: {
      //       key1: "payment_success",
      //     },
      //   }
      // );
      let authorised = await instance.payments.edit(
        response.razorpay_payment_id,
        {
          notes: {
            key1: "payment_success",
          },
        }
      );

      if (authorised.status == "captured") {
        order = await Order.findOneAndUpdate(
          { orderId: response.razorpay_order_id },
          { status: "Paid", paymentInfo: authorised, trackingId: trackId },
          { upsert: true, new: true }
        );
        let products = order.products;

        for (let slug in products) {
          let parts = slug.split("-");
          let originalItemCode = parts.slice(0, -2).join("-");
          let substraction = await Product.findOneAndUpdate(
            { slug: originalItemCode },
            { $inc: { availableQty: -parseInt(products[slug].qty) } }
          );
        }
        return NextResponse.json(
          {
            success: true,
            message: "payment successful",
          },
          { status: 201 }
        );
      } else {
        await Order.findOneAndUpdate(
          { orderId: response.razorpay_order_id },
          { status: "Pending", paymentInfo: {} }
        );
        return NextResponse.json(
          { success: false, message: "payment failed" },
          { status: 404 }
        );
      }
      // }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went Wrong please try again",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went Wrong please try again",
      },
      { status: 500 }
    );
  }
}
