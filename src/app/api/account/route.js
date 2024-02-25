import User from "@/app/models/User";
import connectDb from "@/lib/mongoose";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const token = request.headers.get("token");
  await connectDb();

  const { email, updatedEmail, updatedUsername, password, newPassword } =
    await request.json();

  const updateEmailOrUsername = JSON.parse(searchParams.get("emailOrUsername"));
  const updatePassword = JSON.parse(searchParams.get("password"));

  try {
    if (updateEmailOrUsername) {
      let decodeJwt = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (email == decodeJwt.email) {
        let newData = await User.findOneAndUpdate(
          { email },
          {
            $set: {
              email: updatedEmail,
              username: updatedUsername,
              // other fields you want to update
            },
          },
          { new: true, useFindAndModify: true }
        );

        return NextResponse.json(
          {
            message: "Account Updated Successfully",
            username: updatedUsername,
            email: updatedEmail,
          },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          {
            message: "User Not Found.",
            success: false,
          },
          { status: 404 }
        );
      }
    } else if (updatePassword) {
      let user = await User.findOneAndUpdate({ email });
      let bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.AES_SECRET_KEY
      );
      let decryptedpass = bytes.toString(CryptoJS.enc.Utf8);

      if (password === decryptedpass) {
        // Encrypt the new password before updating
        let encryptedNewPassword = CryptoJS.AES.encrypt(
          newPassword,
          process.env.AES_SECRET_KEY
        ).toString();

        // Update the password using await
        await User.updateOne({ email }, { password: encryptedNewPassword });

        return NextResponse.json(
          {
            message: "Account Updated Successfully",
            username: user.username,
            email: user.email,
          },
          { status: 201 }
        );
      } else {
        // Handle case where provided password doesn't match the stored password
        return NextResponse.json(
          {
            message: "Incorrect Old Password",
            success: false,
          },
          { status: 401 } // Unauthorized status code
        );
      }
      // Update password logic
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      {
        message: "Error updating document",
        success: false,
      },
      { status: 500 }
    );
  }
}
