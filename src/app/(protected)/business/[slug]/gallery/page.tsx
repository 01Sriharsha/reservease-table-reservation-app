import prisma from "@/lib/PrismaClient";
import React from "react";
import GalleryForm from "../_components/GalleryForm";

export default async function GalleryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { images: true, name: true },
  });

  if (!restaurant) {
    return (
      <div className="h-[60vh] w-full grid place-items-center">
        <h2 className="text=2xl text-slate-700 font-bold my-2">
          Failed to load images!
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto">
      <h1 className="text-3xl text-slate-800 font-bold capitalize my-2">
        {restaurant.name + "'s"} Gallery:
      </h1>
      <GalleryForm images={restaurant?.images} slug={slug} />
    </div>
  );
}
