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

  const existingCuisine = await prisma.cuisine.findUnique({ where: { id } });

  if (!existingCuisine) {
    return NextResponse.json(
      { error: "Cuisine doesn't exists!!" },
      { status: 400 }
    );
  }

  const cuisine = await prisma.cuisine.delete({ where: { id } });
  if (!cuisine) {
    return NextResponse.json(
      { error: "failed to remove cuisine!!" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "Cuisine removed successfully!!" },
    { status: 200 }
  );
}
