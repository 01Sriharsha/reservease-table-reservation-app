import prisma from "@/lib/PrismaClient";
import validateObject from "@/utils/validateObject";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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

  const body = (await req.json()) as {
    decline_message: string;
    isDeclined: boolean;
  };

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} cannot be empty!!` },
      { status: 400 }
    );
  }

  const { decline_message, isDeclined } = body;

  const id = parseInt(params.id);

  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    return NextResponse.json({ error: `Booking not found!!` }, { status: 400 });
  }

  const alreadyDeclined = await prisma.booking.findFirst({
    where: { isDeclined : true },
  });

  if (alreadyDeclined) {
    return NextResponse.json(
      { error: `Booking already declined!!` },
      { status: 400 }
    );
  }

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: { decline_message, isDeclined },
  });

  return NextResponse.json(
    { message: `Booking declined successfully!!` },
    { status: 200 }
  );
}
