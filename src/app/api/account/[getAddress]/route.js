import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const email = params.getAddress;
  await connectDb();

  try {
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          message: "Address Fetched Successfully",
          billingAddress: user.billingAddress,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error Occurred",
      },
      { status: 500 }
    );
  }
}
