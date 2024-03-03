import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(reuest) {
  const { email, addressId } = await reuest.json();
  await connectDb();
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $pull: { billingAddress: { _id: addressId } } },
      { new: true }
    );
    if (user) {
      return NextResponse.json(
        {
          message: "Address Deleted Successfully",
          billingAddress: user.billingAddress,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User not found or address not updated",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
