import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const id = parseInt(params.id);

  const existingLocation = await prisma.location.findUnique({ where: { id } });

  if (!existingLocation) {
    return NextResponse.json(
      { error: "Location doesn't exists!!" },
      { status: 400 }
    );
  }

  const location = await prisma.location.delete({ where: { id } });
  if (!location) {
    return NextResponse.json(
      { error: "failed to remove location!!" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "Location removed successfully!!" },
    { status: 200 }
  );
}
