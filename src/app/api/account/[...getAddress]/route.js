import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  //   let email = "test@gmail.com";
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  console.log(email);
  await connectDb();
  try {
    const user = await User.findOne({ email });
    if (user) {
      const newData = data;
      if (user.billingAddress) {
        // Check if objID is provided
        if (newData.objID) {
          // Update the existing data with the new data based on objID
          const existingAddressIndex = user.billingAddress.findIndex(
            (address) => address.objID === newData.objID
          );

          if (existingAddressIndex !== -1) {
            user.billingAddress[existingAddressIndex] = newData;
          } else {
            // Handle the case where objID is provided but not found
            throw new Error("Invalid objID provided for update");
          }
        } else {
          // If objID is not provided, push the new data
          user.billingAddress.push({
            ...newData,
            objID: new ObjectId(), // Assuming you are using MongoDB and can generate ObjectID
          });
        }
      } else {
        // Use set method to dynamically create the billingAddress field
        user.set({ billingAddress: [{ ...newData, objID: new ObjectId() }] });
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
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error Occurred",
      },
      { status: 500 }
    );
  }
}
