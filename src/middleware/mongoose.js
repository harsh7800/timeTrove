import mongoose from "mongoose";

export async function connectDb(handler) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("error connecting to DB", error);
  }
}

export default connectDb;
