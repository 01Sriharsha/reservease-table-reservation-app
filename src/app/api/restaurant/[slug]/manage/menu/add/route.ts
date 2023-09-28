import prisma from "@/lib/PrismaClient";
import validateObject from "@/utils/validateObject";
import { NextRequest, NextResponse } from "next/server";

interface MenuData {
  item: string;
  description: string;
  price: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const { slug } = params;
  const body: MenuData = await req.json();

  const { item: name, description, price } = body;

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} cannot be empty!!` },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found!!" },
      { status: 400 }
    );
  }

  const menu = await prisma.item.create({
    data: {
      name: name,
      price: price,
      description: description,
      restaurant_id: restaurant.id,
    },
  });

  if (!menu) {
    return NextResponse.json(
      { error: "Failed to add item to the menu!!" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Item added to menu successfully!!", ...menu },
    { status: 201 }
  );
}
