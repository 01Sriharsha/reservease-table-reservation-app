import React from "react";
import MenuDetailsForm from "../_components/MenuDetailsForm";
import prisma from "@/lib/PrismaClient";

export default async function EditMenu({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { name: true, slug: true, items: true },
  });

  if (!restaurant) {
    return (
      <div className="flex justify-center h-full">
        <h1 className="text-2xl text-slate-800 font-bold">
          Restaurant Not Found!!
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto p-4">
      <MenuDetailsForm restaurant={restaurant} />
    </div>
  );
}
