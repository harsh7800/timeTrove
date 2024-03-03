import Address from "@/app/models/Address";
import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, data } = await request.json();
  await connectDb();
  try {
    const user = await User.findOne({ email });

    if (user) {
      // console.log(data);
      // Save the updated user document
      user.billingAddress.push(data);
      const res = await user.save();

      return NextResponse.json(
        {
          message: "Address Added Successfully",
          billingAddress: user.billingAddress,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Error Occurred Try logging In Again",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 400 }
    );
  }
}
