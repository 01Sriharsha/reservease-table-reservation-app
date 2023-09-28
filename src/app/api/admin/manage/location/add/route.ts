import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const body: { name: string } = await req.json();

  const { name } = body;
  if (!name) {
    return NextResponse.json(
      { error: "Location name cannot be empty!!" },
      { status: 400 }
    );
  }

  const existingLocation = await prisma.location.findFirst({ where: { name } });

  if (existingLocation) {
    return NextResponse.json(
      { error: "Location with same name already exists!!" },
      { status: 400 }
    );
  }

  const location = await prisma.location.create({ data: { name : name.toLowerCase() } });
  if (!location) {
    return NextResponse.json(
      { error: "failed to add location!!" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "Location added successfully!!", location },
    { status: 201 }
  );
}
