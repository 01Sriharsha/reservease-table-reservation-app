import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/?login=true", req.nextUrl));
  }

  const serialized = serialize("jwt", "", {
    path: "/",
    maxAge: -1,
    httpOnly: true,
  });

  return NextResponse.json(
    { message: "You have been logged out!!" },
    {
      status: 200,
      headers: { "Set-Cookie": serialized },
    }
  );
}
