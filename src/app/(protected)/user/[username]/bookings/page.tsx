import RestaurantCard from "@/app/search/components/RestaurantCard";
import prisma from "@/lib/PrismaClient";
import Link from "next/link";
import React from "react";

export default async function MyBookingsPage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.split("%40")[1];

  const bookings = await prisma.booking.findMany({
    where: { User: { first_name: username } },
    include: {
      restaurant: { include: { cuisine: true, location: true, reviews: true } },
    },
  });

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  console.log(bookings);

  if (!bookings) {
    return (
      <div className="h-full w-full grid place-items-center">
        <h3 className="text-2xl font-bold text-slate-600">
          Failed to load bookings
        </h3>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="text-center p-4 border border-b-neutral-400">
        <h1 className="text-3xl font-bold text-slate-800">Your Bookings</h1>
        <p className="mt-2">Manage your bookings here</p>
      </div>
      {bookings.length === 0 ? (
        <div className="w-full grid place-items-center mt-10">
          <h3 className="text-2xl font-bold text-slate-600">No Bookings...</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="w-full rounded-md shadow-xl border border-neutral-300 flex flex-col"
            >
              <div className="flex flex-col gap-2 px-3 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg text-slate-700 font-semibold">
                    Reference No: #{booking.reference_number}
                  </h3>
                  {booking.booking_time.toISOString() >
                    new Date().toISOString() && !booking.isDeclined ? (
                    <span className=" text-green-500">[ Active ]</span>
                  ) : (
                    <span className=" text-red-500 mb-1">
                      [ {booking.isDeclined ? "Declined" : "Expired"} ]
                    </span>
                  )}
                </div>
                <p className="flex items-center gap-3">
                  <span className="font-semibold">Scheduled Date: </span>
                  <span className="text-slate-700">
                    {formatDate(booking.booking_time)}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold">Number of people: </span>
                  <span className="text-slate-700">
                    {booking.number_of_people}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold">Occassion: </span>
                  <span className="text-slate-700">{booking.occasion}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold">Request: </span>
                  <span className="text-slate-700">
                    {booking.request || "none"}
                  </span>
                </p>
                {booking.isDeclined && (
                  <p className="flex flex-col gap-1">
                    <span className="font-semibold">Decline Reason: </span>
                    <span className="text-slate-700">
                      {booking.decline_message || "none"}
                    </span>
                  </p>
                )}
              </div>
              <Link
                href={`/restaurant/${booking.restaurant.slug}`}
                className="w-full"
              >
                <RestaurantCard restaurant={booking.restaurant} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
