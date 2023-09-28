import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import GenerateJwtToken from "@/utils/generateJwtToken";
import { SignUpData } from "../../../../../types";
import prisma from "@/lib/PrismaClient";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const body: SignUpData = await req.json();

  const existingUser = await prisma.user.findFirst({
    where: { email: body?.email },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        error: "User already exists with provided email!!",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: { ...body, password: hashedPassword },
  });

  const jwt_payload = {
    email: user.email,
    role: user.role,
  };

  const token = await GenerateJwtToken(jwt_payload);

  const serialized = serialize("jwt", token, { maxAge: 60 * 10, path: "/" });

  return NextResponse.json(
    { ...user },
    { status: 201, headers: { "Set-Cookie": serialized } }
  );
}
