import connectDb from "@/middleware/mongoose";
import User from "@/app/models/User";
import CryptoJS from "crypto-js";
import { Jwt } from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      try {
        let user = await User.findOne({
          email: JSON.parse(req.body).email,
        });

        if (user) {
          let bytes = CryptoJS.AES.decrypt(
            user.password,
            process.env.AES_SECRET_KEY,
            {
              expiredIn: "2d",
            }
          );

          let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

          if (
            req.body.password == decryptedData &&
            req.body.email == user.email
          ) {
            let token = Jwt.sign(
              { email: user.email, name: user.name },
              process.env.JWT_SECRET_kEY
            );

            res.status(200).json({
              success: "true",
              token: token,
              email: user.email,
              role: user.role,
            });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(404).json({
          success: "false",
          message: "Sorry No User Found With Given Credentials",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: "false", message: "Something Went Wrong, Try Again" });
  }
};
