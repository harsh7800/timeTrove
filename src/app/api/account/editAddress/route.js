import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, data, id } = await request.json();
  await connectDb();

  try {
    //find user using email and address ID
    const user = await User.findOne({
      email: email,
      "billingAddress._id": id,
    });

    if (user) {
      //[updating directly using mongo DB causing conflicts need to figure that out]

      //get the address Index
      const addressIndex = user.billingAddress.findIndex(
        (addr) => addr._id.toString() === id
      );

      //updating the particular addredd with new address data
      user.billingAddress[addressIndex] = data;

      //saving the changes
      await user.save();

      return NextResponse.json(
        {
          message: "Address Updated Successfully",
          billingAddress: user.billingAddress,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "User not found or address not updated",
      },
      { status: 404 }
    );
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
