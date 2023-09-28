import prisma from "@/lib/PrismaClient";
import { Table } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  "2seat": string;
  "4seat": string;
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

  const body: RequestBody = await req.json();

  const twoSeater = parseInt(body["2seat"]);
  const fourSeater = parseInt(body["4seat"]);

  if (twoSeater === 0 || fourSeater === 0) {
    return NextResponse.json(
      { error: "Enter valid table seat number!!" },
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

  const tables: Table[] = [];

  for (let i = 0; i < twoSeater; i++) {
    const table = await prisma.table.create({
      data: { seats: 2, restaurant_id: restaurant.id },
    });
    tables.push(table);
  }

  for (let i = 0; i < fourSeater; i++) {
    const table = await prisma.table.create({
      data: { seats: 4, restaurant_id: restaurant.id },
    });
    tables.push(table);
  }

  return NextResponse.json(
    { message: "Tables added successfully", tables },
    { status: 201 }
  );
}
