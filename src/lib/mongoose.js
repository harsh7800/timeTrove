import mongoose from "mongoose";

export async function connectDb(handler) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // try {
    //   await mongoose.connect(process.env.MONGO_URI, {
    //     dbName: "time-trove"
    //   });
  } catch (error) {
    throw new Error("error connecting to DB", error);
    console.log("error connecting to DB", error);
  }
}

export default connectDb;
