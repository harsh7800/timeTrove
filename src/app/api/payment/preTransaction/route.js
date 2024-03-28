import Order from "@/app/models/Order";
import connectDb from "@/lib/mongoose";
const RazorPay = require("razorpay");
import shortid from "shortid";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  let { subTotal, email, cart, userData } = await request.json();
  await connectDb();
  let sumtotal = 0;
  for (let item in cart) {
    sumtotal += cart[item].price * cart[item].qty;

    let parts = item.split("-");
    let originalItemCode = parts.slice(0, -2).join("-");

    let product = await Product.findOne({
      slug: originalItemCode,
      size: cart[item].size,
      color: cart[item].color,
    }).lean();
    if (product.availableQty < cart[item].qty) {
      return NextResponse.json(
        {
          success: false,
          error: `we current have only ${product.availableQty} and you are ordering ${cart[item].qty},please reduce the quantity and try again`,
        },
        { status: 404 }
      );
    }
    if (product.price != cart[item].price) {
      return NextResponse.json(
        {
          success: false,
          error: `we current have only ${product.availableQty} and you are ordering ${cart[item].qty},please reduce the quantity and try again`,
        },
        { status: 404 }
      );
    }
  }
  if (sumtotal != subTotal) {
    console.log(sumtotal, subTotal);
    return NextResponse.json(
      {
        success: false,
        error: `Error Calculating The Total Price To Pay Please Try Again`,
      },
      { status: 404 }
    );
  }

  // Initialize razorpay object
  const razorpay = new RazorPay({
    key_id: process.env.NEXT_RAZORPAY_KEY,
    key_secret: process.env.NEXT_RAZORPAY_SECRECT_KEY,
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  const currency = "INR";
  const options = {
    amount: parseInt(subTotal) * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);

    let existingOrder = await Order.findOne({
      orderId: response.id,
      status: "Pending",
    });
    if (existingOrder) {
      console.log(1);
      console.log(response);
    } else {
      let order = await Order.create({
        email: email,
        phone: userData.phoneNum,
        orderId: response.id,
        paymentInfo: { card: {} },
        products: cart,
        address: userData,
        amount: subTotal,
        status: response.status,
      });

      return NextResponse.json({
        id: response.id,
        currency: response.currency,
        response: response,
        amount: response.amount,
        success: true,
      });
    }
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
