import prisma from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

interface MenuParams {
  params: {
    slug: string;
    id: string;
  };
}

export async function DELETE(req: NextRequest, { params }: MenuParams) {
  // const id = parseInt(params.id);

  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const { slug, id } = params;

  const itemId = parseInt(id);

  const restuarant = await prisma.restaurant.findUnique({ where: { slug } });

  const item = await prisma.item.findUnique({ where: { id: itemId } });

  if (!restuarant) {
    return NextResponse.json(
      { error: "Restuarnt not found!!" },
      { status: 400 }
    );
  }
  if (!item) {
    return NextResponse.json(
      { error: "Item not found in the menu!!" },
      { status: 400 }
    );
  }

  const deltedItem = await prisma.item.delete({ where: { id: itemId } });

  if (!deltedItem) {
    return NextResponse.json(
      { error: "Failed to remove the menu item!!" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Item removed from the menu!!" },
    { status: 200 }
  );
}
