import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface PassData {
  oldPassword: string;
  newPassword: string;
  email: string;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }
  const body: PassData = await req.json();

  const { newPassword, oldPassword, email } = body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found!!" }, { status: 400 });
  }

  const existingPassword = await bcrypt.compare(
    oldPassword,
    existingUser.password
  );

  if (!existingPassword) {
    return NextResponse.json(
      { error: "Old Password doesn't match!!Try again" },
      { status: 400 }
    );
  }

  const isSamePassword = await bcrypt.compare(
    newPassword,
    existingUser.password
  );

  if (isSamePassword) {
    return NextResponse.json(
      { error: "New Password can't be same as old password!!" },
      { status: 400 }
    );
  }

  const encryptedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email },
    data: { password: encryptedPassword },
    select: { id: true, password: true },
  });

  return NextResponse.json({ message: "Success!!" }, { status: 201 });
}
