"use client";

import { Booking, User } from "@prisma/client";
import React from "react";
import BookingDeclineModal from "./BookingDeclineModal";
import useAuth from "@/hooks/useAuth";

interface BookingCardProps {
  booking: Booking & {
    User: User | null;
  };
  slug?: string;
}

export default function BookingCard({ booking, slug }: BookingCardProps) {
  const { data } = useAuth();
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-slate-700 font-semibold">
          Reference No: #{booking.reference_number}
        </h3>
        {booking.booking_time.toISOString() > new Date().toISOString() &&
        !booking.isDeclined ? (
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
        <span className="text-slate-700">{booking.number_of_people}</span>
      </p>
      <p className="flex items-center gap-3">
        <span className="font-semibold">Occassion: </span>
        <span className="text-slate-700">{booking.occasion}</span>
      </p>
      <p className="flex items-center gap-3">
        <span className="font-semibold">Request: </span>
        <span className="text-slate-700">{booking.request || "none"}</span>
      </p>
      {booking.isDeclined && (
        <p className="flex flex-col gap-1">
          <span className="font-semibold">Decline Reason: </span>
          <span className="text-slate-700">
            {booking.decline_message || "none"}
          </span>
        </p>
      )}
      {data?.role==="OWNER" && (
        <BookingDeclineModal
          refNo={booking.reference_number}
          slug={slug || ""}
          bookingId={booking.id}
          isDeclined={booking.isDeclined}
        />
      )}
    </div>
  );
}
