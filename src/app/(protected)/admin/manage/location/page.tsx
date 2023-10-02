import prisma from "@/lib/PrismaClient";
import React, { Suspense } from "react";
import Renderlocations from "../_components/RenderLocations";

export default async function ManageLocationPage() {
  const locations = await prisma.location.findMany();

  return (
    <div className="w-full">
      <h1 className="text-3xl text-slate-800 font-semibold my-3 px-2">
        Manage Locations
      </h1>
      <Suspense fallback={<h2>Fallback</h2>}>
        <Renderlocations locations={locations} />
      </Suspense>
    </div>
  );
}
