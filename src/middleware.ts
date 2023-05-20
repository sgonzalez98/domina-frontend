import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("token");
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname.includes("/login")) {
    try {
      await jwtVerify(jwt.value, secret);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      return NextResponse.next();
    }
  }

  try {
    await jwtVerify(jwt.value, secret);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
