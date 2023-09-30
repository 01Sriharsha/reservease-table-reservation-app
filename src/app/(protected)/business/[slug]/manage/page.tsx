import React from "react";
import RestaurantDetailsForm from "../_components/RestaurantDetailsForm";
import prisma from "@/lib/PrismaClient";

interface Params {
  params: {
    slug: string;
  };
}

export default async function ManagePage({ params }: Params) {
  const { slug } = params;

  const restaurantPromise = prisma.restaurant.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
      description: true,
      open_time: true,
      close_time: true,
      location: { select: { name: true } },
      cuisine: { select: { name: true } },
      main_image: true,
      address: true,
      phone: true,
      publish : true,
      price: true,
      cuisineStyle : true
    },
  });

  const cuisinesPromise = prisma.cuisine.findMany();
  const locationsPromise = prisma.location.findMany();

  const [restaurant, cuisines, locations] = await Promise.all([
    restaurantPromise,
    cuisinesPromise,
    locationsPromise,
  ]);

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
    <RestaurantDetailsForm
      restaurant={restaurant}
      locations={locations}
      cuisines={cuisines}
    />
  );
}
