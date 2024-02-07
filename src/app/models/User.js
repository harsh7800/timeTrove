import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: [true, "Name is Mandatory"] },
    email: {
      type: String,
      require: [true, "email is Mandatory"],
      unique: true,
    },
    password: { type: String, require: [true, "Please Enter Passowrd"] },
    role: { type: String, default: "user", require: true },
  },
  { timestamps: true }
);

// mongoose.models = {};

export default mongoose.models.User || mongoose.model("User", UserSchema);
// export default mongoose.model("User", UserSchema);
