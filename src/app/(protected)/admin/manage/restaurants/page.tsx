import prisma from "@/lib/PrismaClient";
import React, { Suspense } from "react";
import RenderRestaurants from "../_components/RenderRestaurants";

export default async function ManageRestaurants() {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      reviews: true,
      owner: { select: { first_name: true, last_name: true, email: true } },
      cuisine: { select: { name: true } },
      location: { select: { name: true } },
      bookings: { select: { _count: true } },
      tables: { select: { seats: true } },
    },
  });

  return (
    <div className="w-full overflow-y-auto">
      <h1 className="my-3 text-slate-800 font-semibold text-3xl px-1">
        Manage restaurants:{" "}
      </h1>
      <Suspense fallback={<h2>Fallback</h2>}>
        <RenderRestaurants restaurants={restaurants} />
      </Suspense>
    </div>
  );
}
