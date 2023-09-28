import prisma from "@/lib/PrismaClient";
import React from "react";
import RenderCuisines from "../_components/RenderCuisines";
import Renderlocations from "../_components/RenderLocations";

export default async function ManageLocationPage() {
  const locations = await prisma.location.findMany();

  return (
    <div className="w-full">
      <h1 className="text-3xl text-slate-800 font-semibold my-3 px-2">
        Manage Locations
      </h1>
      <Renderlocations locations={locations} />
    </div>
  );
}
