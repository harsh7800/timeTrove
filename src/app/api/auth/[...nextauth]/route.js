import connectDb from "@/lib/mongoose";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/User";
import { CreateUser } from "@/lib/utils";
const jwt = require("jsonwebtoken");
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      let { email, name, picture } = profile;
      try {
        let data;
        await connectDb();
        const userExist = await User.findOne({
          email: profile.email.toLowerCase(),
        });
        if (!userExist) {
          const newUser = await User.create({
            username: name,
            email: email.toLowerCase(),
            image: picture,
          });
        }
        let token = jwt.sign({ email, name }, process.env.JWT_SECRET_KEY);
        data = { email, name, picture, token };
        return data;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
});

export { handler as GET, handler as POST };
