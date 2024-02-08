import connectDb from "@/middleware/mongoose";
import User from "@/app/models/User";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function POST(request) {
  await connectDb();
  try {
    const { username, email, password } = await request.json();
    //checking if the user exists
    const userExist = await User.findOne({ $or: [{ email }] });
    if (!userExist) {
      //hashing the Password
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.AES_SECRET_KEY
      ).toString();

      //sign the jwt token
      let token = jwt.sign({ email, username }, process.env.JWT_SECRET_KEY);
      //======== create new user =======

      await User.create({
        username: username,
        email: email,
        password: encryptedPassword,
      });

      return NextResponse.json(
        {
          message: "Account Created Successfully",
          username: username,
          email: email,
          token: token,
          success: true,
        },
        { status: 201 }
      );
    } else {
      //======= error if account already exist =======
      return NextResponse.json(
        {
          message: "Account Already Exists",
          success: false,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error:", error); // Log the error first for debugging purposes

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message, // Include error details in the response
        success: false,
      },
      { status: 500 }
    );
  }
}
