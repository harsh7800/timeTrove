import User from "@/app/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    //======= check if method is post =========
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
            success: true,
          },
          { status: 200 }
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
      console.log(error);
      // res.status(400).json({ success: "false", message: "Bad Request" });
    }
  } catch (error) {
    console.log(error);
    // res.status(400).json({
    //   success: "false",
    //   message: "Something went wrong Please try again",
    // });
  }
}
