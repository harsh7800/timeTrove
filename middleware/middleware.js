import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  //: string | URL | undefined
  const tokenValue = request.cookies.get("token"); // for auth token check
  async function isAuthCheck() {
    try {
      const api = await fetch(
        `${process.env.BASE_URL}/auth/verifyToken?token=${tokenValue?.value}`
      );
      const data = await api.json();
      if (data.message !== "Verified successfully") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      // console.log(error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return isAuthCheck();
}

export const config = {
  matcher: "/authentication",
  // matcher: "/dashboard/:path*"
};
