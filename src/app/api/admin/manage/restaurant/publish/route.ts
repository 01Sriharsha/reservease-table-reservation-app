import prisma from "@/lib/PrismaClient";
import validateObject from "@/utils/validateObject";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const body: { publish: boolean; slug: string } = await req.json();

  const { publish, slug } = body;

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} is not found!!` },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return NextResponse.json(
      { error: `restaurant not found!!` },
      { status: 400 }
    );
  }

  const updated = await prisma.restaurant.update({
    where: { slug },
    data: { publish },
    select: { publish: true },
  });

  return NextResponse.json(
    {
      message: updated.publish
        ? "Restaurant published successfully!!"
        : "Restaurant unpublished!!",
    },
    { status: 200 }
  );
}
