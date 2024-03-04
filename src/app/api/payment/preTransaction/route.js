import Order from "@/app/models/Order";
import connectDb from "@/lib/mongoose";
const RazorPay = require("razorpay");
import shortid from "shortid";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  let { subTotal, cart } = await request.json();
  let sumtotal;
  for (let item in cart) {
    sumtotal += cart[item].price * cart[item].qty;
    let product = await Product.findOne({ slug: item });
    console.log(product.availableQty);
    console.log(cart[item].qty);
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
    return NextResponse.json(
      {
        success: false,
        error: `we current have only ${product.availableQty} and you are ordering ${cart[item].qty},please reduce the quantity and try again`,
      },
      { status: 404 }
    );
  }

  // Initialize razorpay object
  const razorpay = new RazorPay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRECT_KEY,
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  const amount = subTotal;
  const currency = "INR";
  const options = {
    amount: subTotal,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);

    let order = new Order({
      email: JSON.parse(req.body).userInfo.email,
      phone: JSON.parse(req.body).userInfo.phone,
      orderId: response.id,
      paymentInfo: { card: {} },
      products: JSON.parse(req.body).cart,
      address: JSON.parse(req.body).userInfo.address,
      amount: JSON.parse(req.body).subtotal,
      status: response.status,
    });

    await order.save();
    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      success: true,
    });
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
