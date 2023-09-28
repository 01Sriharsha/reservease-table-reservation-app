import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/PrismaClient";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!token) {
    console.log("token not found");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = await extractPayloadFromJWT(token, SECRET);

  if (payload === null) {
    return NextResponse.json(
      { error: "UnAuthorized Request" },
      { status: 401 }
    );
  }

  let user, admin;

  if (!payload?.email) {
    return NextResponse.json(
      { error: "UnAuthorized Request" },
      { status: 401 }
    );
  } else {
    const email = payload.email as string;
    user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        city: true,
        role: true,
        image: true,
      },
    });

    admin = await prisma.admin.findUnique({
      where: { email },
      select: { email: true, role: true },
    });
  }

  if (!user && !admin) {
    return NextResponse.json({ error: "User not found!!" }, { status: 401 });
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: { owner: { first_name: user?.first_name } },
    select: { slug: true },
  });

  const userData = {
    ...user,
    role: user?.role,
    restaurant_slug: restaurant?.slug,
  };

  const adminData = {
    email: admin?.email,
    role: admin?.role,
  };

  return NextResponse.json(user ? { ...userData } : { ...adminData }, {
    status: 200,
  });
}

async function extractPayloadFromJWT(token: string, key: Uint8Array) {
  try {
    // Verify and decode the JWT
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error: any) {
    // Handle any errors, such as an invalid or expired token
    console.error("JWT Verification Error:", error.message);
    return null;
  }
}
