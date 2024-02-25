import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  await connectDb();
  const { username, email } = await request.json();
  const token = request.headers.get("token");
  const updateEmailOrUsername = searchParams.get("emailOrUsername");
  const updatePassword = searchParams.get("password");
  try {
    const userExist = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExist) {
      if (updateEmailOrUsername) {
        try {
          let newData = await User.findOneAndUpdate(
            { $or: [{ email: email }, { username: username }] },
            {
              $set: {
                email: email,
                username: username,
                // other fields you want to update
              },
            },
            { new: true, useFindAndModify: false }
          );

          if (!newData) {
            console.log("No matching document found.");
            // Handle the case where no document was found with the given conditions.
          } else {
            console.log("Document updated successfully:", newData);
            // Handle success, newData contains the updated document.
          }
        } catch (error) {
          console.error("Error updating document:", error);
          // Handle the error, log it, or throw it if needed.
        }
        return NextResponse.json(
          {
            message: "Account Updated Successfully",
            username: username,
            email: email,
          },
          { status: 201 }
        );
      } else if (updatePassword) {
        console.log(2);
        let user = await User.findOne({ email });
        let bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.AES_SECRET_KEY
        );
        let decryptedpass = bytes.toString(CryptoJS.enc.Utf8);
        if (oldPassword === decryptedpass) {
          User.updateOne({
            password: newPassword,
          });
          return NextResponse.json(
            {
              message: "Account Updated Successfully",
              username: username,
              email: email,
            },
            { status: 201 }
          );
        }
      }
    } else
      return NextResponse.json(
        {
          message: "Account Does'nt Exist with given credentials",
          success: false,
        },
        { status: 404 }
      );
  } catch (error) {
    console.log(error);
  }
}
