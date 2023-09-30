import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";

export interface FilterProp {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: {
    city?: string | undefined;
    cuisine?: string | undefined;
    price?: PRICE | undefined;
  };
}

export default function Filter({
  locations,
  cuisines,
  searchParams,
}: FilterProp) {
  const priceArr = [
    { label: "₹₹", value: PRICE.CHEAP },
    { label: "₹₹₹", value: PRICE.REGULAR },
    { label: "₹₹₹₹", value: PRICE.EXPENSIVE },
  ];

  return (
    <div className="px-4 bg-white">
      <div>
        <h3 className="font-semibold text-gray-500 text-lg">Region</h3>
        <div className="my-2 ml-4 capitalize flex flex-col md:h-[40vh] md:overflow-y-scroll">
          {locations.map((location) => (
            <Link
              href={{
                pathname: `/search`,
                query: { ...searchParams, city: location.name },
              }}
              key={location.id}
              className={`my-2 ${
                searchParams.city === location.name
                  ? "text-red-500 font-medium"
                  : "text-black"
              }`}
            >
              {location.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="my-3">
        <h3 className="font-semibold text-gray-500 text-lg">Cuisine</h3>
        <div className="my-2 ml-4 capitalize flex flex-col md:h-[40vh] md:overflow-y-scroll">
          {cuisines.map((cuisine) => (
            <Link
              href={{
                pathname: `/search`,
                query: { ...searchParams, cuisine: cuisine.name },
              }}
              key={cuisine.id}
              className={`my-2 ${
                searchParams.cuisine === cuisine.name
                  ? "text-red-500 font-medium"
                  : "text-black"
              }`}
            >
              {cuisine.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="my-3">
        <h3 className="font-semibold text-gray-500 text-lg">Price</h3>
        <div
          className="flex items-center gap-1 [&_a:hover]:border [&_a:hover]:border-red-500 
        [&_a:hover]:text-red-500 my-2 text-gray-600"
        >
          {priceArr.map((price) => (
            <Link
              key={price.label}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price.value,
                },
              }}
              className={`py-1 px-4 border ${
                searchParams.price === price.value
                  ? "bg-red-500 text-white"
                  : "border-gray-400"
              } border-gray-400`}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
