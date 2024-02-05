import User from "@/app/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from "crypto-js";

export async function POST(request, ressponse) {
  try {
    //======= check if method is post =========
    if (req.method == "POST") {
      try {
        const { name, email, password } = req.body;
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          process.env.AES_SECRET_KEY
        ).toString();

        //======== create new user =======
        const u = new User({
          name,
          email,
          password: encryptedPassword,
        });

        //======= save the User Details if account desosnt exist =======
        if (u) {
          await u.save();
          res.status(200).json({
            success: "true",
            message: "Account Created Successfully",
            name,
            email,
          });
        } else {
          //======= error if account already exist =======

          res.status(404).json({
            success: "false",
            message: "Account alreasy exist Please Login In",
            name,
            email,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: "false", message: "Bad Request" });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: "Something went wrong Please try again",
    });
  }
}
