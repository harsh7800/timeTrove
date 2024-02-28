import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, data } = await request.json();
  await connectDb();
  try {
    const user = await User.findOne({ email });
    if (user) {
      const newData = data;
      if (user.billingAddress) {
        // Check if data with the same landmark and pincode already exists
        const existingAddressIndex = user.billingAddress.findIndex(
          (address) =>
            address.landmark === newData.landmark &&
            address.pincode === newData.pincode
        );

        if (existingAddressIndex !== -1) {
          // Update the existing data with the new data
          user.billingAddress[existingAddressIndex] = newData;
        } else {
          // If not exists, push the new data
          user.billingAddress.push(newData);
        }
      } else {
        // Use set method to dynamically create the billingAddress field
        user.set({ billingAddress: [data] });
      }

      // Save the updated user document
      await user.save();
      console.log(user.billingAddress);
      return NextResponse.json(
        {
          message: "Address Added Successfully",
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
    console.log(error);
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 400 }
    );
  }
}
