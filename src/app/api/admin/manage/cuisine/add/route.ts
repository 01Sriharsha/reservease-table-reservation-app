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
      { error: "Cuisine name cannot be empty!!" },
      { status: 400 }
    );
  }

  const existingCuisine = await prisma.cuisine.findFirst({ where: { name } });

  if (existingCuisine) {
    return NextResponse.json(
      { error: "Cuisine with same name already exists!!" },
      { status: 400 }
    );
  }

  const cuisine = await prisma.cuisine.create({ data: { name : name.toLowerCase() } });
  if (!cuisine) {
    return NextResponse.json(
      { error: "failed to add cuisine!!" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "Cuisine added successfully!!", cuisine },
    { status: 201 }
  );
}
