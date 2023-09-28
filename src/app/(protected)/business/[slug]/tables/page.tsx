import prisma from "@/lib/PrismaClient";
import React from "react";
import ManageTables from "../_components/ManageTables";

export default async function ManageTablesPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: { tables: true },
  });

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-3xl text-slate-800 font-semibold my-2">
        Manage Tables:{" "}
      </h1>
      <ManageTables restaurant={restaurant} />
    </div>
  );
}
