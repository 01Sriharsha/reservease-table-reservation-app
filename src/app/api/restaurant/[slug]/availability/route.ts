import prisma from "@/lib/PrismaClient";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(req.url);
  const slug = params.slug;
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const partySize = searchParams.get("partySize");

  if (!slug || !date || !time || !partySize)
    return NextResponse.json(
      { error: "Inadequate data provided!!" },
      { status: 400 }
    );

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant)
    return NextResponse.json(
      { error: "Restaurant not found!!" },
      { status: 400 }
    );

  const searchTimeWithTables = await findAvailableTables(
    date,
    time,
    restaurant.tables
  );

  if (!searchTimeWithTables)
    return NextResponse.json(
      { error: "Failed to fetch tables!!" },
      { status: 401 }
    );

  const availabilities = searchTimeWithTables
    .map((t) => {
      const sumOfSeats = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: t.time,
        available: sumOfSeats >= parseInt(partySize),
      };
    })
    //get availablity within restaurant open and close timimgs
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${date}T${availability.time}`) >=
        new Date(`${date}T${restaurant.open_time}`);

      const timeIsAfterClosingHour =
        new Date(`${date}T${availability.time}`) <=
        new Date(`${date}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsAfterClosingHour;
    });

  return NextResponse.json({ availabilities }, { status: 200 });
}
