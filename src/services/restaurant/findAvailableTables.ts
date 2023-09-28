import prisma from "@/lib/PrismaClient";
import { calculateSearchTimes } from "@/utils/calculateSearchTimes";
import { Table } from "@prisma/client";

export async function findAvailableTables(
  date: string,
  time: string,
  tables: Table[]
) {
  const searchTimes = calculateSearchTimes(time);

  if (!searchTimes) return;

  //retrieve bookings withtin the searchtimes
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${date}T${searchTimes[0]}`),
        lte: new Date(`${date}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  /*
    Todo : Create custom obj which represents the booked time with the corresponding booked table id
      "bookingTablesObj": {
         "2023-05-17T19:00:00.000Z": { "1": true }
      }
    */
  const bookingTablesObj: { [key: string]: { [key: number]: boolean } } = {};

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return { ...obj, [table.table_id]: true };
      }, {});
  });

  const searchTimeWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${date}T${searchTime}`),
      time: searchTime,
      tables: tables,
    };
  });

  searchTimeWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  return searchTimeWithTables;
}
