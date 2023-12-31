import prisma from "@/lib/PrismaClient";
import React, { Suspense } from "react";
import RenderCuisines from "../_components/RenderCuisines";

export default async function ManageCuisinePage() {
  const cuisines = await prisma.cuisine.findMany();

  return (
    <div className="w-full">
      <h1 className="text-3xl text-slate-800 font-semibold my-3 px-2">
        Manage Cuisines
      </h1>
      <Suspense fallback={<h2>Fallback</h2>}>
        <RenderCuisines cuisines={cuisines} />
      </Suspense>
    </div>
  );
}
