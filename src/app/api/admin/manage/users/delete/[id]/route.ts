import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json({ error: "unauthorized request", status: 401 });
  }

  const { id } = params;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return NextResponse.json({ error: "User not found!!", status: 400 });
  }

  const deletedUser = await prisma.user.delete({ where: { id } });

  if (!deletedUser) {
    return NextResponse.json({ error: "Failed to remove user!!", status: 400 });
  }

  return NextResponse.json({
    message: "User removed successfully!!",
    status: 200,
  });
}
