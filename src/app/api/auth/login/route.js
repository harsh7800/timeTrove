import connectDb from "@/middleware/mongoose";
import User from "@/app/models/User";
import CryptoJS from "crypto-js";
const jwt = require("jsonwebtoken");
import { NextResponse, userAgent } from "next/server";

export async function POST(request) {
  await connectDb();
  try {
    const { email, password } = await request.json();
    // Searching the User based on details given
    let user = await User.findOne({ email });

    if (user && user.email === email.trim()) {
      // Decrypting Password
      let bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.AES_SECRET_KEY
      );

      let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (password === decryptedData) {
        let email = user.email;
        let username = user.username;
        let token = jwt.sign({ email, username }, process.env.JWT_SECRET_KEY);

        return NextResponse.json(
          {
            message: "Logged Successfully",
            token: token,
            success: true,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            message: "Incorrect Password",
            success: false,
          },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "Sorry, No User Found With Given Email",
          success: false,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
