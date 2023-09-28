import displayTime from "@/utils/DisplayTime";
import { Restaurant } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

export default function Header({
  restaurant,
  searchParams,
}: {
  restaurant: Restaurant;
  searchParams: { date: string; time: string; partySize: string };
}) {
  const { date, time, partySize } = searchParams;

  return (
    <>
      <h3 className="text-2xl font-medium text-gray-700">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        You're almost done
      </h3>
      <div className="flex gap-6 my-4 items-center flex-col md:flex-row">
        <Image
          src={restaurant.images[0]}
          alt="image"
          height={1000}
          width={2000}
          className="w-24 h-24 rounded-md"
        />
        <div className="">
          <h2 className="text-2xl md:text-3xl text-center md:text-start text-gray-700 font-semibold capitalize">
            {restaurant.name}
          </h2>
          <div className="flex xs:flex-col flex-row justify-between items-center my-2 gap-4 font-medium text-gray-800 text-md md:text-lg">
            <p>{format(new Date(date), "ccc, LLL d")}</p>
            <p>{displayTime(time)}</p>
            <p>
              {partySize} {parseInt(partySize) > 1 ? "people" : "person"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
