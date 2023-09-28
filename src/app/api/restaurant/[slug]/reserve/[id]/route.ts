import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import displayTime from "@/utils/DisplayTime";
import { generateReferenceNo } from "@/utils/generateReferenceNo";
import format from "date-fns/format";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: `Unauthorized request!!` },
      { status: 401 }
    );
  }

  const { slug, id } = params;

  const userId = parseInt(id);

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const partySize = searchParams.get("partySize") || "";

  const body: { occassion: string; request: string } = await req.json();

  const { occassion, request } = body;

  //request is optional
  if (!occassion) {
    return NextResponse.json(
      { error: `occassion cannot be empty!!` },
      { status: 400 }
    );
  }

  if (!date || !time || !partySize) {
    return NextResponse.json(
      { error: `Inadequate Data provided!!` },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant)
    return NextResponse.json(
      { error: `Restaurant not found!!` },
      { status: 400 }
    );

  if (
    new Date(`${date}T${time}`) <
      new Date(`${date}T${restaurant.open_time.substring(1, 5)}`) ||
    new Date(`${date}T${time}`) >
      new Date(`${date}T${restaurant.close_time.substring(1, 5)}`)
  ) {
    return NextResponse.json(
      { error: "Restaurant may not open at that time!!" },
      { status: 400 }
    );
  }

  const searchTimeWithTables = await findAvailableTables(
    date,
    time,
    restaurant.tables
  );

  if (!searchTimeWithTables) {
    return NextResponse.json(
      { error: "Failed to fetch tables!!" },
      { status: 400 }
    );
  }

  //Finding available tables at the specific time provided
  const availableTables = searchTimeWithTables.find(
    (table) =>
      table.date.toISOString() ===
      new Date(`${date}T${time}:00.000Z`).toISOString()
  );

  if (!availableTables) {
    return NextResponse.json(
      { error: "No Availability!!, Cannot Book the table" },
      { status: 400 }
    );
  }

  /* 
    Todo: Modifying available tables to get customized object that displays , 
    *'seats (2 or 4)' in the key and array of available 'table_id' as the value 
  */
  const tablesCount: {
    "2seats": number[];
    "4seats": number[];
  } = { "2seats": [], "4seats": [] };

  availableTables.tables.forEach((table) => {
    if (table.seats === 2) {
      tablesCount["2seats"].push(table.id);
    } else {
      tablesCount["4seats"].push(table.id);
    }
  });

  /* 
    Todo: Logic to determine how many seater table should allocate to respective partySize
    * 4 seater should not be allocated to partySize less than 4 and viceversa for 2 seater
  */

  const tablesToBook: number[] = [];

  let size = parseInt(partySize);

  while (size > 0) {
    if (size >= 3) {
      if (tablesCount["4seats"].length !== 0) {
        tablesToBook.push(tablesCount["4seats"][0]); //allocates the 1st 4 seater available
        tablesCount["4seats"].shift(); //removes the allocated table from the array
        size = size - 4; //subtract already allocated size from the provided partySize
      } else {
        tablesToBook.push(tablesCount["2seats"][0]); //allocates the 1st 2 seater available
        tablesCount["2seats"].shift(); //removes the allocated table from the array
        size = size - 2;
      }
    } else {
      if (tablesCount["2seats"].length !== 0) {
        tablesToBook.push(tablesCount["2seats"][0]);
        tablesCount["2seats"].shift();
        size = size - 2;
      } else {
        tablesToBook.push(tablesCount["4seats"][0]);
        tablesCount["4seats"].shift();
        size = size - 4;
      }
    }
  }

  const refNo = await generateUniqueRefNo();

  const bookingTime = new Date(`${date}T${time}:00.000Z`);
  //converting UTC to IST (-5:30hrs)
  bookingTime.setHours(
    bookingTime.getHours() - 5,
    bookingTime.getMinutes() - 30,
    0,
    0
  );

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(bookingTime.toISOString()),
      reference_number: refNo,
      restaurant_id: restaurant.id,
      occasion: occassion,
      request: request || "",
      userId,
    },
  });

  //Linking allocated tables to the booking id
  const bookingsOnTableData = tablesToBook.map((table_id) => {
    return { table_id, booking_id: booking.id };
  });

  await prisma.bookingsOnTable.createMany({ data: bookingsOnTableData });

  return NextResponse.json(
    { message: "Reservation successfull!!" },
    { status: 201 }
  );
}

async function generateUniqueRefNo() {
  let refno = generateReferenceNo();

  let unique = false;

  while (!unique) {
    const booking = await prisma.booking.findFirst({
      where: { reference_number: refno },
    });

    if (booking) {
      refno = generateReferenceNo();
    } else {
      unique = true;
      break;
    }
  }

  return refno;
}
