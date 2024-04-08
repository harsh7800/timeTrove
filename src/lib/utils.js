import { clsx } from "clsx";
// import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");

import { twMerge } from "tailwind-merge";
// import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import Cookies from "js-cookie";
import { useStore } from "@/app/store/zustandStore";
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function verifyJWT(token, secretKey) {
  const decoded = jwt.verify(token, secretKey);
  // Optionally set the decoded data in a cookie

  Cookies.set("UserDetails", decoded, { expires: 2 });

  return { success: true, data: decoded };
}

export async function CreateUser(name, email, picture) {
  const login = useStore((state) => state.login);
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
    login(data);
  } catch (error) {
    console.log(error);
  }
}

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setissuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export function decrypt(input) {
  return new Promise((resolve, reject) => {
    jwtVerify(input, key, { algorithms: ["HS256"] })
      .then(({ payload }) => {
        resolve(payload);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function Login(formData) {
  //Verify User and Get user
  const user = { email: formData.get("email"), name: formData.get("username") };

  //Create a Session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });
}

export async function Logout() {
  //Destroy the session
  cookies().set("session", "", { expires, httpOnly: true });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await FcDataEncryption(session);
}

export async function updateSession(NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
}
