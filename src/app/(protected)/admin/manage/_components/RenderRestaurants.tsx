"use client";

import { Restaurant, Review } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PublishRestaurant from "./PublishRestaurant";
import Link from "next/link";
import displayTime from "@/utils/DisplayTime";
import Stars from "@/components/Stars";
import { AiOutlineSearch } from "react-icons/ai";

interface RenderRestaurantsProps {
  restaurants: ({
    location: { name: string };
    cuisine: { name: string };
    reviews: Review[];
    bookings: {}[];
    tables: { seats: number }[];
    owner: {
      first_name: string;
      last_name: string;
      email: string;
    };
  } & Restaurant)[];
}

export default function RenderRestaurants({
  restaurants: AllRestaurants,
}: RenderRestaurantsProps) {
  const [restaurants, setRestaurants] = useState(AllRestaurants);

  const [input, setInput] = useState("");

  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    const newArr = AllRestaurants.filter(
      (res) =>
        res.rrn.toLowerCase().includes(input) ||
        res.name.toLowerCase().includes(input) ||
        res.location.name.toLowerCase().includes(input)
    );
    setRestaurants(input ? newArr : AllRestaurants);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <>
      <div className="realtive w-full md:w-[50%] flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="search by RRN,name,city.."
          className="p-2 w-full border border-neutral-400 hover:border-black focus:outline-none rounded-md"
        />
        <AiOutlineSearch
          size="1.7rem"
          className="text-slate-600 -translate-x-10"
        />
      </div>
      {restaurants.length === 0 ? (
        <div className="text-2xl text-slate-700 font-bold mt-10 grid place-items-center">
          No Restaurants!!
        </div>
      ) : (
        <div className="w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="rounded-md border-neutral-500 shadow-xl p-4 capitalize"
            >
              <p className="grid grid-cols-6 my-2">
                <span className="col-span-2 font-medium">Name : </span>
                <span className="col-span-4">{restaurant.name}</span>
              </p>
              <p className="grid grid-cols-6 my-2">
                <span className="col-span-2 font-medium">Slug : </span>
                <Link
                  href={`/restaurant/${restaurant.slug}`}
                  className="text-red-400 underline col-span-4 lowercase truncate"
                >
                  {restaurant.slug}
                </Link>
              </p>
              <p className="grid grid-cols-6 my-2">
                <span className="col-span-2 font-medium">RRN : </span>
                <span className="col-span-4">{restaurant.rrn}</span>
              </p>
              <p className="grid grid-cols-6 my-2">
                <span className="col-span-2 font-medium">Rating : </span>
                <span className="col-span-4 mt-1">
                  <Stars reviews={restaurant.reviews} />
                </span>
              </p>
              {/* collpasable */}
              <div
                className={`transition-all duration-200 ${
                  collapse ? "h-0 overflow-hidden" : "h-auto"
                }`}
              >
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Cuisine : </span>
                  <span className="col-span-4">{restaurant.cuisine.name}</span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">
                    Cuisine Style :{" "}
                  </span>
                  <span className="col-span-4">{restaurant.cuisineStyle}</span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Phone : </span>
                  <span className="col-span-4">{restaurant.phone}</span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Address : </span>
                  <span className="col-span-4">{restaurant.address}</span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Location : </span>
                  <span className="col-span-4">{restaurant.location.name}</span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Open Time : </span>
                  <span className="col-span-4">
                    {displayTime(restaurant.open_time)}
                  </span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Close Time : </span>
                  <span className="col-span-4">
                    {displayTime(restaurant.close_time)}
                  </span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">
                    Total Tables :{" "}
                  </span>
                  <span className="col-span-4">{restaurant.tables.length}</span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Total Seats : </span>
                  <span className="col-span-4">
                    {restaurant.tables.reduce((sum, arr) => sum + arr.seats, 0)}
                  </span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">
                    Total Bookings :{" "}
                  </span>
                  <span className="col-span-4">
                    {restaurant.bookings.length}
                  </span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Owner name : </span>
                  <span className="col-span-4 capitalize">
                    {restaurant.owner.first_name +
                      " " +
                      restaurant.owner.last_name}
                  </span>
                </p>
                <p className="grid grid-cols-6 my-2">
                  <span className="col-span-2 font-medium">Owner email : </span>
                  <Link
                    href={`mailto:${restaurant.owner.email}`}
                    className="col-span-4 text-red-300 underline lowercase"
                  >
                    {restaurant.owner.email}
                  </Link>
                </p>
                <PublishRestaurant
                  published={restaurant.publish}
                  slug={restaurant.slug}
                />
              </div>
              <div className="w-full pt-2 mt-2 flex justify-end border-t border-t-black">
                <button
                  className="px-4 py-2 bg-slate-500 text-white rounded-md"
                  onClick={() => setCollapse(!collapse)}
                >
                  {collapse ? "show more" : "collapse"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
