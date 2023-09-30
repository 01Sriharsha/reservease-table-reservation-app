"use client";

import { Booking, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import BookingCard from "./BookingCard";

interface RenderReservationsProps {
  bookings: (Booking & {
    User: User | null;
  })[];
  slug: string;
}

export default function RenderReservations({
  bookings: AllBookings,
  slug,
}: RenderReservationsProps) {
  const [bookings, setBookings] = useState(AllBookings);

  const [refno, setRefno] = useState("");

  useEffect(() => {
    const newArr = bookings.filter((b) =>
      b.reference_number.toLowerCase().includes(refno)
    );
    setBookings(refno ? newArr : AllBookings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refno]);

  return (
    <div className="w-full">
      <div className="realtive w-full md:w-[40%] flex items-center">
        <input
          type="text"
          value={refno}
          onChange={(e) => setRefno(e.target.value)}
          placeholder="search by reference no.."
          className="p-2 w-full border border-neutral-400 hover:border-black focus:outline-none rounded-md"
        />
        <AiOutlineSearch
          size="1.7rem"
          className="text-slate-600 -translate-x-10"
        />
      </div>

      {bookings.length === 0 ? (
        <h1 className="text-center text-2xl text-slate-800 font-bold mt-10">
          No Bookings!!
        </h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="w-full rounded-md shadow-xl border border-neutral-300 flex flex-col p-3"
            >
              <BookingCard booking={booking} slug={slug} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
