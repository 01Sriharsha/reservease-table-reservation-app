import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/?login=true", req.nextUrl));
  }

  const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jwtVerify(token, SECRET);
  } catch (error) {
    return NextResponse.redirect(new URL("/?expired=true", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/api/restaurant/[slug]/manage/(.*)",
    "/api/restaurant/[slug]/review/(.*)",
    "/user/(.*)",
    "/business/(.*)",
    "/admin/(.*)",
  ],
};
