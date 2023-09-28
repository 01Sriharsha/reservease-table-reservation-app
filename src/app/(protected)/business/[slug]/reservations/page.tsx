import prisma from "@/lib/PrismaClient";
import React from "react";
import RenderReservations from "../_components/RenderReservations";

export default async function ManageReservationsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const bookings = await prisma.booking.findMany({
    where: { restaurant: { slug } },
    include: { User: true },
  });

  return (
    <div className="w-full h-full px-4">
      <h1 className="text-3xl text-slate-800 font-semibold my-4">
        Reservations:{" "}
      </h1>
      <RenderReservations bookings={bookings} slug={slug} />
    </div>
  );
}
