import bcrypt from "bcrypt";
import GenerateJwtToken from "@/utils/generateJwtToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  let existingUser = null;

  let admin = null;

  if (email) {
    existingUser = await prisma.user.findUnique({ where: { email } });

    admin = await prisma.admin.findUnique({ where: { email } });
  } else {
    return NextResponse.json(
      { error: "Invalid Data Provided!!" },
      { status: 401 }
    );
  }

  if (!existingUser && !admin) {
    return NextResponse.json({ error: "User not found!!" }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    admin ? admin.password : existingUser?.password || ""
  );

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password!!" }, { status: 401 });
  }

  const jwt_payload = {
    email: existingUser?.email || admin?.email,
    role: existingUser?.role || admin?.role,
  };

  const token = await GenerateJwtToken(jwt_payload);

  const restaurant = await prisma.restaurant.findFirst({
    where: { owner: { first_name: existingUser?.first_name } },
    select: { slug: true },
  });

  const user = { ...existingUser,  restaurant_slug: restaurant?.slug };

  const serialized = serialize("jwt", token, {
    httpOnly: true,
    path: "/",
    maxAge: 3600,
  });

  return NextResponse.json(admin ? { ...admin } : { ...user }, {
    headers: { "Set-Cookie": serialized },
  });
}
