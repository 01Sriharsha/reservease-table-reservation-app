import Search from "@/components/Search";
import { Location, PRICE, Review } from "@prisma/client";
import React, { Suspense } from "react";
import RestaurantCard from "./components/RestaurantCard";
import Link from "next/link";
import prisma from "@/lib/PrismaClient";
import { ClipLoader } from "react-spinners";
import { Metadata } from "next";
import Filter from "./components/Filter";
import SearchSidebar from "./components/SearchSidebar";

export interface SearchRestaurantCard {
  id: number;
  name: string;
  price: PRICE;
  main_image: string;
  slug: string;
  reviews: Review[];
  publish: boolean;
}

export interface SerachParamsType {
  city: string | undefined;
  cuisine: string | undefined;
  price: PRICE | undefined;
}

const fetchRestaurantsByParams = async ({
  city,
  cuisine,
  price,
}: SerachParamsType) => {
  const select = {
    id: true,
    name: true,
    price: true,
    main_image: true,
    slug: true,
    reviews: true,
    publish: true,
  };

  if (!city) return await prisma.restaurant.findMany({ select: select });

  const restaurant = await prisma.restaurant.findMany({
    where: {
      AND: [
        { location: { name: { equals: city.toLowerCase() } } },
        { cuisine: { name: { equals: cuisine?.toLowerCase() } } },
        { price: { equals: price } },
      ],
    },
    select: select,
  });

  return restaurant;
};

//generate Metadata
export const generateMetadata = ({
  searchParams,
}: {
  searchParams: SerachParamsType;
}): Metadata => {
  return {
    title: searchParams?.city || "search" + " restaurants",
    description: `Showing restaurants from ${searchParams?.city}`,
  };
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SerachParamsType;
}) {
  const restaurantsPromise = fetchRestaurantsByParams(searchParams);

  const locationsPromise = prisma.location.findMany();

  const cuisinesPromise = prisma.cuisine.findMany();

  const [restaurants, locations, cuisines] = await Promise.all([
    restaurantsPromise,
    locationsPromise,
    cuisinesPromise,
  ]);

  return (
    <>
      <header className="h-24 w-full bg-gradient-to-r from-[#0f1f47] to-[#5f6984] flex justify-center">
        <Suspense fallback={<ClipLoader size={"1.3rem"} color="black" />}>
          <Search locations={locations} />
        </Suspense>
      </header>
      <main>
        <div className="flex flex-col md:flex-row flex-wrap w-full md:w-10/12 mx-auto md:my-4 md:px-2 relative">
          <div className="block md:hidden relative w-full">
            <SearchSidebar
              locations={locations}
              cuisines={cuisines}
              searchParams={searchParams}
            />
          </div>
          <div className="w-full md:w-[30%] hidden md:block">
            <Filter
              locations={locations}
              cuisines={cuisines}
              searchParams={searchParams}
            />
          </div>
          <div className="w-full md:w-[70%]">
            {restaurants === null || restaurants.length === 0 ? (
              <div className="h-full mt-10 text-2xl font-bold text-slate-700 capitalize grid place-items-center">
                No restuarants available!!
              </div>
            ) : (
              restaurants
                .filter((restaurant) => restaurant.publish)
                .map((restaurant) => (
                  <>
                    <Link
                      href={`/restaurant/${restaurant.slug}`}
                      key={restaurant.id}
                    >
                      <RestaurantCard restaurant={restaurant} />
                    </Link>
                    <hr className="text-gray-700 font-extrabold" />
                  </>
                ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
